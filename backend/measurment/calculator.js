import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { user_calculator } from '../api/all_api'
export default function Calculator() {
    const [AGE, setAge] = React.useState(11)
    const [BB, setBB] = React.useState(8)
    const [TB, setTB] = React.useState(69)
    const [JK, setJK] = React.useState('L')
    const [submit, setSubmit] = React.useState(false)

    const Submit = () => {
        setSubmit(!submit)
        console.log(submit);
    }

    const calculator = () => {
        user_calculator({
            age:Number(AGE),
            bb:Number(BB),
            tb:Number(TB),
            jk:JK
        }).then((result) => {
            if(result.status == 200){
                console.log(result.data.data);
                alert(result.data.status)
            }else{
                alert(result.error)
            }
        }).catch(err => {
            alert(err)
        })
    }

    const Display_Hasil = () => {
        const [hasil, setHasil] = React.useState(false)
        const [hasilData, setHasilData] = React.useState({})
        React.useEffect(() => {
            user_calculator({
                age:Number(AGE),
                bb:Number(BB),
                tb:Number(TB),
                jk:JK
            }).then((result) => {
                if(result.status == 200){
                    console.log(result.data.data);
                    setHasilData(result.data.data)
                    setHasil(true)
                }else{
                    console.log('gagal');
                }
            }).catch((err) => {
                alert(err)
            })
        }, [])
        return(
            <View>
                {hasil? 
                (
                    <View>
                        <View>
                            <Text>Hasil</Text>
                        </View>
                        <View>
                            <Text>Umur : {AGE}</Text>
                        </View>
                        <View>
                            <Text>Berat Badan : {BB}</Text>
                        </View>
                        <View>
                            <Text>Tinggi Badan : {TB}</Text>
                        </View> 
                        <View>
                            <Text>Status Gizi BB/U : {hasilData.bbu.data.status}</Text>
                        </View>
                        <View>
                            <Text>Status Gizi TB/U : {hasilData.tbu.data.status}</Text>
                        </View>
                        <View>
                            <Text>Status Gizi BB/TB : {hasilData.bbtb.data.status}</Text>
                        </View>

                        <View>
                            <Text>Rekomendasi</Text>
                        </View>
                        <View>
                            <Text>Status Gizi BB/U : {hasilData.bbu.data.rekom}</Text>
                        </View>
                        <View>
                            <Text>Status Gizi TB/U : {hasilData.tbu.data.rekom}</Text>
                        </View>
                        <View>
                            <Text>Status Gizi BB/TB : {hasilData.bbtb.data.rekom}</Text>
                        </View>
                    </View>   

                ) 
                : 
                (
                    <ActivityIndicator />
                )}
            </View>
        )
    }

  return (
    <View style={{marginTop:50}}>
        
        {submit? (
            <Display_Hasil />
        ): 
        (
            <View>
            <TextInput 
            style={styles.input}
            keyboardType='numeric'
            placeholder='Umur'
            onChangeText={setAge}
            value={String(AGE)}

        />
        <TextInput 
            style={styles.input}
            keyboardType='numeric'
            placeholder='Berat Badan'
            onChangeText={setBB}
            value={String(BB)}

        />
        <TextInput 
            style={styles.input}
            keyboardType='numeric'
            placeholder='Tinggi Badan'
            onChangeText={setTB}
            value={String(TB)}

        />
        <TextInput 
            style={styles.input}
            placeholder='Jenis Kelamin'
            onChangeText={setJK}
            value={JK}
        />
        <TouchableOpacity style={{alignSelf:'center'}} onPress={Submit}>
            <Text>Measurment</Text>
          </TouchableOpacity>
        </View>
        )
        }
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