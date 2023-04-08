import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginScreenPetugas() {
  const [fontsLoaded] = useFonts({
    PopBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PopLug: require("../assets/fonts/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flexDirection: "column" }}>
      <View>
        <Text style={styles.header}>Halo Petugas</Text>
        <Text style={styles.Silahkan}>Silahkan Login Ya!</Text>
        <Text style={styles.lightheader}>
          Silahkan login untuk melakukan pengukuran dan pemantauan status gizi anak
        </Text>
      </View>
      <View>
        <TextInput style={styles.textInput} placeholder="Username" />
        <TextInput style={styles.textInput1} placeholder="Password" />
      </View>
      <TouchableOpacity>
        <View style={styles.btn}>
          <Text style={styles.loginbtn}>Login </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
    marginTop: -1,
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
