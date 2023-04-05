import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font'

export default function Login() {
  
  const[fontsLoaded] = useFonts({
    PopBold: require("../../assets/fonts/Poppins-Bold.ttf")
  })

  if (!fontsLoaded) return null

  return (

  <View style={{flex: 1}}>
    <Text>Login</Text>
  </View>
  )
}
const styles = StyleSheet.create({



})