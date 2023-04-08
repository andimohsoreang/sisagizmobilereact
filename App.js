import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './backend/auth/login'
import Calculator from './backend/measurment/calculator'
import Accumulation_report from './backend/report/accumulation_report'
import Article from './backend/article/article'
export default function App() {


  return (
    <ScrollView>
      <View>
        <Login />
      </View>
      <View>
        <Calculator />
      </View>
      <View>
        <Accumulation_report /> 
      </View>
      <View>
        <Article />
      </View>
    </ScrollView>
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
