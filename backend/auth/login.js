import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { user_login } from '../api/all_api'
import { _store_data, _retrieve_data } from '../handler/storage_handler'
import { AsyncStorage } from 'AsyncStorage'
export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [token, setToken] = React.useState('')


  const login = () => {
    user_login({
        email:username,
        password:password
    }).then((result) => {
        if(result.status == 200 ) {
            _store_data('data', result.data)
            _retrieve_data('data').then((data) => console.log({data}))
            alert(result.data.message)
        }else{
            alert(result.message)
        }
    }).catch(err => {
        alert(err)
    })
  }

  return(
      <View style={{marginTop:50}}>
          <TextInput
              style={styles.input}
              placeholder='username'
              onChangeText={setUsername}
              value={username}
          />
          <TextInput
              style={styles.input}
              placeholder='password'
              onChangeText={setPassword}
              value={password}
          />
          <TouchableOpacity style={{alignSelf:'center'}} onPress={login}>
            <Text>Login</Text>
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