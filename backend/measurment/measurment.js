import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { _retrieve_data } from '../handler/storage_handler'
import { post_measurment, user_measurmentBy_uuid } from '../api/all_api'
import SelectDropdown from 'react-native-select-dropdown'

export default function Measurment() {
    const [uuid, setuuid] = React.useState('')
    const [date, setDate] = React.useState('')
    const [age, setAge] = React.useState(3)
    const [bb, setBB] = React.useState(2.9)
    const [tb, setTB] = React.useState(70)
    const [method, setMethod] = React.useState('Terlentang')
    const [vitamin, setVitamin] = React.useState('ya')
    const [lila, setLila] = React.useState(4)
    const [lika, setLika] = React.useState(4)
    const [dataBayi, setDataBayi] = React.useState([])
    const [doSubmit, setDoSubmit] = React.useState(false)
    const SetData = () => {
        const dt = []
        _retrieve_data('bayi').then((data) => {
            data.result.map((value) => {
                if(value.posyandu == 'Rajawali II'){
                    dt.push(value)
                }
            })
            setDataBayi(dt)
        })
    }
    SetData()

    const Submit = () => {
        setDoSubmit(true)
        console.log('Disini');
        _retrieve_data('data').then((data) => {
            post_measurment( data.jwt.token ,{
            uuid: uuid,
            date: '2023-05-06',
            age: Number(age),
            bb: Number(bb),
            tb: Number(tb),
            method: method,
            vitamin: vitamin,
            lila: Number(lila),
            lika: Number(lika)
        }).then((result) => {
            if(result.status == 200){
                console.log(result);
                user_measurmentBy_uuid(data.jwt.token, {
                    uuid:uuid
                }).then((result) => {
                    if(result.status == 200){
                        alert(result.data.message)
                        setDoSubmit(true)

                    }else{
                        alert(result.message)
                    }
                }).catch(err => {
                    alert(err.message)
                })
            }else{
                alert(result.message)
            }
        }).catch(err => {
            alert(err)
        })
    })
    }
  return (
    <View>      
        <View>
            <SelectDropdown 
                defaultButtonText='Pilih Bayi'
                data={dataBayi.map((value) => {return value.name})}
                onSelect={(selectedItem, index) => {
                    setuuid(dataBayi[index].uuid)
                    setDoSubmit(false)
                }}
            />
        </View>
        {uuid.length > 0? (
            <View>
                {doSubmit? 
                (
                    <Text>INI</Text>
                ): 
                (
                    <View>
                    <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Umur'
                    onChangeText={setAge}
                    value={String(age)}

                />
                <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Berat Badan'
                    onChangeText={setBB}
                    value={String(bb)}

                />
                <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Tinggi Badan'
                    onChangeText={setTB}
                    value={String(tb)}

                />
                <SelectDropdown 
                defaultValue={'Terlentang'}
                data={['Terlentang', 'Berdiri']}
                onSelect={(selectedItem, index) => {
                    setMethod(selectedItem)
                }}
            />
                <SelectDropdown 
                defaultValue={'Ya'}
                data={['Ya', 'Tidak']}
                onSelect={(selectedItem, index) => {
                    setVitamin(selectedItem)
                }}
            />
                <TextInput 
                    style={styles.input}
                    placeholder='Lingkar Lengan'
                    onChangeText={setLila}
                    value={String(lila)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Lingkar Kaki'
                    onChangeText={setLika}
                    value={String(lika)}
                />
                <TouchableOpacity style={{alignSelf:'center'}} onPress={Submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                </View>
                )}
            </View>
        ) : (
            <Text>Pilih Bayi Terlebih Dahulu</Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
    height:40,
    margin:(12 ,12, 50, 12),
    borderWidth:1,
    padding:10,
},

})