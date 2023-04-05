import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './source/screens/Login'
import { useFonts } from 'expo-font'

export default function App() {


  return (
    <View>
      <Login />
    </View>
  );
}
