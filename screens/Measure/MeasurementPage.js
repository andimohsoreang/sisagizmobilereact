import React from "react";
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
import SelectDropdown from "react-native-select-dropdown";
import { _store_data } from "../../backend/handler/storage_handler";

// Move the useFonts hook outside of the component function
const fontConfig = {
  PopBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  PopLug: require("../../assets/fonts/Poppins-Light.ttf"),
  PopMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
  PopRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
  PopSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
};

export default function MeasurementPage(props) {
  const [AGE, setAge] = React.useState(0)
    const [BB, setBB] = React.useState(0)
    const [TB, setTB] = React.useState(0)
    const [JK, setJK] = React.useState('L')

  // Call the useFonts hook outside of the component function
  const [fontsLoaded] = useFonts(fontConfig);
  
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
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.textInput}
            keyboardType='numeric'
            placeholder='Umur'
            onChangeText={setAge}
            value={String(AGE)} />
            <Text style={styles.textSatuan}>Bulan</Text>
          </View>
          <View></View>
        </View>


        <View style={styles.beratBadan}>
          <Text style={styles.textTitle}>Berat Badan</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.textInput}
            keyboardType='numeric'
            placeholder='Berat Badan'
            onChangeText={setBB}
            value={String(BB)} />
            <Text style={styles.textSatuan}>Kg</Text>
          </View>
        </View>

        
        <View style={styles.tinggiBadan}>
          <Text style={styles.textTitle}>Tinggi Badan</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.textInput} 
              keyboardType='numeric'
              placeholder='Tinggi Badan'
              onChangeText={setTB}
              value={String(TB)}
            />
            <Text style={styles.textSatuan}>Cm</Text>
          </View>
        </View>


        <View style={styles.tinggiBadan}>
          <Text style={styles.textTitle}>Jenis Kelamin</Text>
          <View style={{ flexDirection: "row" }}>
          <SelectDropdown 
                defaultValueByIndex={0}
                data={['Laki-laki', 'Perempuan']}
                onSelect={(selectedItem, index) => {
                    setJK(index == 0? ('L') : ('P'))
                }}
            />
          </View>
        </View>


        <TouchableOpacity onPress={()=>{
          _store_data('calc', {
            age: AGE,
            tb : TB,
            bb: BB,
            jk: JK
          })
          props.navigation.navigate("CalcRes")
        }}>
          <View style={styles.btn}>
            <Text style={{ fontFamily: "PopBold", color: "black" }}>
              Hitung
            </Text>
          </View>
        </TouchableOpacity>
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
    width: "70%",
    fontFamily: "PopSemiBold",
  },
  textSatuan: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "PopRegular",
  },
  beratBadan: {
    margin: 20,
  },
  tinggiBadan: {
    margin: 20,
    marginTop: 1,
  },
  btn: {
    alignSelf: "center",
    width: "50%",
    height: 50,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFCE81",
    justifyContent: "center",
  },
});
