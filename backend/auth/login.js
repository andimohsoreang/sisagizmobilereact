
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { user_accumulation_report, user_login } from '../api/all_api'
import { _store_data, _retrieve_data } from '../handler/storage_handler'
import { AsyncStorage } from 'AsyncStorage'
const Login = async (username, password) => {
    try {
      let result = await user_login({
        email: username,
        password: password
      });
  
      return result;
    } catch (err) {
      throw err;
    }
  };
  
  export {Login};