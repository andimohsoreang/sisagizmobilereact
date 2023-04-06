import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { user_calculator } from './user_api'
export default function Measurment() {
    const [age, setAge] = React.useState(0)
    const [bb, setBB] = React.useState(0)
    const [TB, setTB] = React.useState(0)
    const [JK, setJK] = React.useState('')
    const calculator = () => {
        user_calculator({
            age:0,
            bb:0,
            tb:0,
            jk:0
        }).then((result) => {
            console.log(result);
            if(result.status == 200){
                alert(result.data.status)
            }else{
                alert(result.status)
            }
        }).catch(err => {
            alert(err)
        })
    }



  return (
    <View>
      <Text>measurment</Text>
    </View>
  )
}

const styles = StyleSheet.create({})