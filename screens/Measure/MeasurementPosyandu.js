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

// Move the useFonts hook outside of the component function
const fontConfig = {
  PopBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  PopLug: require("../../assets/fonts/Poppins-Light.ttf"),
  PopMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
  PopRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
  PopSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
};

export default function MeasurementPosyandu(props) {
  // Call the useFonts hook outside of the component function
  const [fontsLoaded] = useFonts(fontConfig);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
          Pilih Anak
        </Text>
        <Text style={{ fontFamily: "PopRegular", fontSize: 12, marginTop: 10 }}>
          DROPDOWN ANAK
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <ScrollView>
          <View style={styles.umur}>
            <Text style={styles.textTitle}>Tanggal Pengukuran</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput style={styles.textInput} />
            </View>
          </View>
        <View style={{flexDirection:'row'}}>
          <View style={styles.umur}>
            <Text style={styles.textTitle}>Umur</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput style={styles.textInputUmur} />
              <Text>Bulan</Text>
            </View>
          </View>
          <View style={styles.umur}>
            <Text style={styles.textTitle}>Berat Badan</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput style={styles.textInputUmur} />
              <Text>Kg</Text>
            </View>
          </View>
        </View>
          <View style={styles.umur}>
            <Text style={styles.textTitle}>Tinggi Badan</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput style={styles.textInputUmur} />
              <Text>Cm</Text>
            </View>
          </View>
          <View>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Lila</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur} />
                <Text>Cm</Text>
              </View>
            </View>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>LiKa</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur} />
                <Text>Cm</Text>
              </View>
            </View>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Cara Ukur</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur} />
              </View>
            </View>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Vitamin A</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur} />
              </View>
            </View>
          </View>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={()=> {
            props.navigation.navigate('MeasureRes')
          }}>
            <View style={styles.btn}>
              <Text style={{ fontFamily: "PopBold", color: "black" }}>
                Hitung
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    height: '70%',
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  umur: {
    marginLeft: 20,
    marginTop: 30,
    marginBottom: -10,
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
    width: "95%",
    fontFamily: "PopSemiBold",
  },
  textSatuan: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "PopRegular",
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
  textInputUmur: {
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "black",
    height: 50,
    width: "40%",
    fontFamily: "PopSemiBold",
  },
});
