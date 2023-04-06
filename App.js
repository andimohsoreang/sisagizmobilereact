import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './backend/login'
import Measurment from './backend/measurment'
export default function App() {
  return (
    <View>
      <View>
        <Login />
      </View>
      <View>
        <Measurment />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})