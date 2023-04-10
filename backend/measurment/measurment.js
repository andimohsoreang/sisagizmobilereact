import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { _retrieve_data } from '../handler/storage_handler'
import { post_measurment } from '../api/all_api'

export default function Measurment() {
    const [uuid, setuuid] = React.useState('')
    const [date, setDate] = React.useState('')
    const [age, setAge] = React.useState(3)
    const [bb, setBB] = React.useState(2.9)
    const [tb, setTB] = React.useState(70)
    const [method, setMethod] = React.useState('telentang')
    const [vitamin, setVitamin] = React.useState('ya')
    const [lila, setLila] = React.useState(4)
    const [lika, setLika] = React.useState(4)

    const Submit = () => {
        _retrieve_data('data').then((data) => post_measurment( data.jwt.token ,{
            uuid: '90d61849-a44f-4950-ac6f-3d8c5b99361c',
            date: '2020-01-02',
            age: Number(age),
            bb: Number(bb),
            tb: Number(tb),
            method: method,
            vitamin: vitamin,
            lila: Number(lila),
            lika: Number(lika)
        }).then((result) => {
            if(result.status == 200){
                alert(result.status.message)
            }else{
                alert(result.message)
            }
        }).catch(err => {
            alert(err)
        })
        
        )
    }

  return (
    <View>
      
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
        <TextInput 
            style={styles.input}
            placeholder='Metode'
            onChangeText={setMethod}
            value={method}
        />
        <TextInput 
            style={styles.input}
            placeholder='Vitamin'
            onChangeText={setVitamin}
            value={vitamin}
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