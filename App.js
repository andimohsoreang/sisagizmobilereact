import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './backend/auth/login'
import Calculator from './backend/measurment/calculator'
import Accumulation_report from './backend/report/accumulation_report'
import Article from './backend/article/article'
import PetugasLogin from './screens/PetugasLogin'
import MainHomePosyandu from './screens/posyandu/home/main_home';
import LoginScreenPetugas from './screens/PetugasLogin'
import LoginScreenUser from './screens/Login'
import Measurment from './backend/measurment/measurment'
export default function App() {


  return (
    <ScrollView>
      <View>
        <LoginScreenUser />

      </View>
      <View>
        <Measurment />
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
