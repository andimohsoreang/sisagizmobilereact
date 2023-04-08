import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { user_accumulation_report } from '../api/all_api'
export default function Accumulation_report() {
    const [MM, setMM] = React.useState(0)
    const [YYYY, setYYYYY] = React.useState(0)
    const accumulation_report = () => {
        user_accumulation_report({
            mm:Number(MM),
            yyyy:Number(YYYY)
        }).then((result) => {
            if(result.status == 200){
                alert(result.data.status)
            }else{
                console.log(result);
                alert(result.message)
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
              placeholder='mm'
              onChangeText={setMM}
              value={String(MM)}
          />
          <TextInput
              style={styles.input}
              keyboardType='numeric'
              placeholder='yyyy'
              onChangeText={setYYYYY}
              value={String(YYYY)}
          />
          <TouchableOpacity style={{alignSelf:'center'}} onPress={accumulation_report}>
            <Text>accumulation_report</Text> 
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