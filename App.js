import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './backend/auth/login';
import Calculator from './backend/measurment/calculator';
import Accumulation_report from './backend/report/accumulation_report';
import LoginScreen from './screens/Login';
export default function App() {


  return (
    <View>
      <LoginScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
