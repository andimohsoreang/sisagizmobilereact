import { ActivityIndicator, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { _retrieve_data } from '../handler/storage_handler'

export default function Log_Measurment() {
    const [dt, setDt] = React.useState({})
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const [date, setDate] = React.useState(`${year}-${month}-${day}`)
    const [isLoaded, setIsLoaded] = React.useState(false); // menambahkan variabel isLoaded
    const [refreshing, setRefreshing] = React.useState(false); // menambahkan variabel refreshing

    useEffect(() => {
        const setHasil = async () => {
            try {
                const UUID = await _retrieve_data('UUID')
                await _retrieve_data('measurment').then((data) => {
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].Toddler.uuid === UUID) {
                            if (data.data[i].date === date) {
                                setDt(data.data[i])
                                setIsLoaded(true); // mengubah variabel isLoaded menjadi true setelah data tersedia
                                setRefreshing(false); // mengubah variabel refreshing menjadi false setelah data tersedia
                            }
                        }
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
        setHasil()
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); // mengubah variabel refreshing menjadi true ketika user melakukan pull-to-refresh
        setIsLoaded(false); // mengubah variabel isLoaded menjadi false ketika user melakukan pull-to-refresh
        setDt({}); // mengosongkan data ketika user melakukan pull-to-refresh
        const setHasil = async () => {
            try {
                const UUID = await _retrieve_data('UUID')
                await _retrieve_data('measurment').then((data) => {
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].Toddler.uuid === UUID) {
                            if (data.data[i].date === date) {
                                setDt(data.data[i])
                                setIsLoaded(true); // mengubah variabel isLoaded menjadi true setelah data tersedia
                                setRefreshing(false); // mengubah variabel refreshing menjadi false setelah data tersedia
                            }
                        }
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
        setHasil()
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {!isLoaded ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <View>
                    <Text>Detail Pengukuran</Text>
                    <Text>Tanggal Pengukuran : {dt.date}</Text>
                    <Text>Umur : {dt.current_age}</Text>
                    <Text>Berat Badan : {dt.bb}</Text>
                    <Text>Tinggi Badan : {dt.tb}</Text>
                    <Text>Status Gizi BB/U : {dt.bbu}</Text>
                    <Text>Status Gizi TB/U : {dt.tbu}</Text>
                    <Text>Status Gizi BB/TB : {dt.gizi_bb_tb}</Text>
                    <Text>vitamin : {dt.vitamin}</Text>

                    <Text>Prediksi Klasifikasi</Text>
                    <Text>Hasil : {dt.predict_result ? ('Stunting') : ('Normal')}</Text>
                    <Text>Potensi Stunting : {dt.predict_accuracy * 100}%</Text>

                    <Text>Rekomendasi</Text>
                    <Text>Berat Badan (BB/U) : {dt.rekombbu}</Text>
                    <Text>Tinggi Badan (TB/U) : {dt.rekomtbu}</Text>
                </View>
            )
        }
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
