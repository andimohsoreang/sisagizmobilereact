import Calculator from '../../../backend/measurment/calculator';
import Graph from '../../../backend/growth/graph';
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { _remove_data, _retrieve_data } from "../../../backend/handler/storage_handler";

const fontConfig = {
  PopBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  PopLug: require("../../../assets/fonts/Poppins-Light.ttf"),
  PopMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  PopRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  PopSemiBold: require("../../../assets/fonts/Poppins-SemiBold.ttf"),
};

export default function Profile(props) {

  const [dt, setDt] = React.useState(null)
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    const fethcData = async () => {
      const data_user = await _retrieve_data('data');
      if (data_user != null) {
        setDt(data_user)
      }else{
        setDt(null)
      }
    }
    fethcData();
  }, []);
  const Submit = async () =>
  {
    const berhasil = await _remove_data('data')
    if(berhasil){
      
      props.navigation.navigate('Home')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
          Profile
        </Text>
        {dt != null ? (<Text style={{ fontFamily: "PopBold", fontSize: 15, marginTop: 10 }}>
          {dt.user.name}
        </Text>) : (<ActivityIndicator />)}
      </View>
      <View>
        {dt != null ? (
          <View>
            <View style={styles.menuContainer}>
              <View style={styles.umur}>
                <Text style={styles.textTitle}>Email</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textSatuan}>{dt.user.email}</Text>
                </View>
                <View></View>
              </View>
              <View style={styles.beratBadan}>
                <Text style={styles.textTitle}>Berat Badan</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textSatuan}>sajso Kg</Text>
                </View>
              </View>
              <View style={styles.tinggiBadan}>
                <Text style={styles.textTitle}>Tinggi Basojaojs</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textSatuan}>aijsoiajCm</Text>
                </View>
              </View>
              <TouchableOpacity onPress={Submit}>
                <View style={styles.btn}>
                  <Text style={{ fontFamily: "PopBold", color: "black" }}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ActivityIndicator />
        )}
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
    height: "90%",
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
    marginTop: 250,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFCE81",
    justifyContent: "center",
  },
});