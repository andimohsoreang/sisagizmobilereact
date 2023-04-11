import {useFonts} from 'expo-font'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Login } from '../backend/auth/login'
import { _store_data, _retrieve_data } from '../backend/handler/storage_handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native'
import { get_all_bayi } from '../backend/api/all_api'



export default function LoginScreenUser(props) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [hide, setHide] = React.useState(true)
  const [isData, setIsData] = React.useState(true)

  const hide_password = () => {
    setHide(!hide)
  }

  const login_check = async () => {
    setIsData(false)
    try {
      let result = await Login(username, password);
      if (result.status === 200) {
        _store_data('data', result.data);
        get_all_bayi(result.data.jwt.token,
          {}).then((result) => {
            if(result.status == 200){
              _store_data('bayi', result.data)
              props.navigation.navigate('MeasurementPosyandu')
            }else{
              console.log(result.message);
            }
          }).catch(err => {
            alert(err)
          })
        alert(result.data.message);
        setIsData(true)
      } else {
        alert(result.message);
        setIsData(true)
      }
    } catch (err) {
      alert(err);
    }
  };

    const [fontsLoaded] = useFonts({
        PopBold : require('../assets/fonts/Poppins-Bold.ttf'),
        PopLug : require('../assets/fonts/Poppins-Light.ttf')
    })

    if (!fontsLoaded)  return null   

    return (
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text style={styles.header}>Halo</Text>
          <Text style={styles.Silahkan}>Silahkan Login Ya!</Text>
          <Text style={styles.lightheader}>
            Silahkan login untuk melihat hasil pengukuran bayi yang telah
            dilakukan posyandu!
          </Text>
          <Text style={styles.note}>
            Silahkan Masukan Username dan Password yang diberikan pihak posyandu{" "}
          </Text>
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput style={styles.textInput1} placeholder="Password"
            secureTextEntry={hide}
            inlineImageLeft= 'search_icon'
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.hide} onPress={hide_password}>
          {hide ? (
            <Entypo name="eye-with-line" size={24} color="black" />
          ):
          (
            <Entypo name="eye" size={24} color="black" />
          )
          }
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={login_check}>
            <View style={styles.btn}>
                <Text style={styles.loginbtn}>Login</Text>
            </View>
            {isData?
            (
              <Text></Text>
            )
            :
            (
              <ActivityIndicator style={{marginTop:25}}/>
            )}
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  hide: {
    marginTop: -32,
    marginLeft: 320
  },  
  container: {
    flexDirection: "column",
  },
  view1: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: (0, 0, 0, 0),
    marginTop: 140,
    marginLeft: 20,
    fontFamily: "PopBold",
    fontSize: 24,
  },
  Silahkan: {
    marginTop: -10,
    fontFamily: "PopBold",
    fontSize: 24,
    marginLeft: 20,
  },
  lightheader: {
    marginLeft: 20,
    marginRight: 10,
    color: "#6F6F6F",
    fontFamily: "PopLug",
    fontSize: 13,
    marginTop: -8,
  },
  note: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10,
    color: "#6F6F6F",
    fontFamily: "PopLug",
    fontSize: 10,
    color: "#FF9C00",
  },
  textInput: {
    backgroundColor: "#FFF9F0",
    marginTop: 30,
    height: 44,
    marginLeft: 20,
    width: 340,
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
  },
  textInput1: {
    backgroundColor: "#FFF9F0",
    marginTop: 18,
    height: 44,
    marginLeft: 20,
    width: 340,
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
  },
  btn: { 
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    width: 340,
    backgroundColor: "#FF9C00",
    borderRadius: 13,
    marginTop: 40,
    marginLeft: 20,
  },
  loginbtn: {
    color: "#FFF",
    fontFamily: "PopBold",
    fontSize: 18,
  },
});