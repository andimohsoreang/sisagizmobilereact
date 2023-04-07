import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { user_login } from "./user_api";
export default function Login() {
  const [username, getUsername] = React.useState("");
  const [password, getPassword] = React.useState("");
  const login = () => {
    user_login({
      email: username,
      password: password,
    })
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          alert(result.status);
        } else {
          alert(result.status);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View style={{ marginTop: 50 }}>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={getUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={getPassword}
        value={password}
      />
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: (12, 12, 50, 12),
    borderWidth: 1,
    padding: 10,
  },
});
