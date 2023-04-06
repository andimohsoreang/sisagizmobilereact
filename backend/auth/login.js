import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { user_login } from '../api/all_api'
import { _store_data, _retrieve_data } from '../handler/storage_handler'
export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [msg, setMsg] = React.useState('')
  const login = () => {
    user_login({
        email:username,
        password:password
    }).then((result) => {
        if(result.status == 200 ) {
            const value = JSON.stringify(result.data)
            _store_data('data', value)
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