import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { user_calculator } from '../api/user_api'
export default function Calculator() {
    const [AGE, setAge] = React.useState(11)
    const [BB, setBB] = React.useState(8)
    const [TB, setTB] = React.useState(69)
    const [JK, setJK] = React.useState('L')
    const calculator = () => {
        user_calculator({
            age:Number(AGE),
            bb:Number(BB),
            tb:Number(TB),
            jk:JK
        }).then((result) => {
            if(result.status == 200){
                alert(result.data.status)
            }else{
                alert(result.error)
            }
        }).catch(err => {
            alert(err)
        })
    }

  return (
    <View style={{marginTop:50}}>
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
        <TouchableOpacity style={{alignSelf:'center'}} onPress={calculator}>
            <Text>Measurment</Text>
          </TouchableOpacity>
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