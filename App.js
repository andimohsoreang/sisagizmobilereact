import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './backend/auth/login'
import Calculator from './backend/measurment/calculator'
import Accumulation_report from './backend/report/accumulation_report'
export default function App() {
  return (
    <View>
      <View>
        <Login />
      </View>
      <View>
        <Calculator />
      </View>
      <View>
        <Accumulation_report />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})