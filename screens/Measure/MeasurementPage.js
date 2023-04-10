import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    PopBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PopLug: require("../../assets/fonts/Poppins-Light.ttf"),
    PopMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PopRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PopSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
          Kalkulator Stunting
        </Text>
        <Text style={{ fontFamily: "PopRegular", fontSize: 12, marginTop: 10 }}>
          Kalkulator Stunting ini digunakan untuk melakukan pengukuran sementara
          terhadap status gizi anak anda
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.umur}>
            <Text style={styles.textTitle}>Umur</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={styles.textInput} />
            <Text style={{alignSelf:'center', marginLeft:10}}>Bulan</Text>
          </View>
          <View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFCE81" },
  header: { paddingTop: 60, paddingLeft: 20 },

  menuContainer: {
    marginTop: 20,
    borderRadius: 30,
    height: "80%",
    width: "100%",
    backgroundColor: "white",
  },
  umur: {
    marginLeft: 20,
    marginTop: 40,
  },
  textTitle: {
    fontFamily: "PopSemiBold",
    fontSize: 14,
    color: "black",
  },
  textInput: {
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "black",
    height: 50,
    width: "30%",
    fontFamily: "PopSemiBold",
  },
});
