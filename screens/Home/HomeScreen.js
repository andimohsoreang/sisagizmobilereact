import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native'
import { useFonts } from 'expo-font';
import { Feather } from "@expo/vector-icons";
import Measurment from '../../backend/measurment/measurment';
import { _get_all_keys_data, _remove_data, _retrieve_data, _store_data } from '../../backend/handler/storage_handler';
import React from 'react';
import { get_all_bayi, get_posyandu, user_measurmet } from '../../backend/api/all_api';
import { NavigationContainer } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


function HomeScreen(props) {
  const [fontsLoaded] = useFonts({
    PopBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PopLug: require("../../assets/fonts/Poppins-Light.ttf"),
    PopMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PopRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PopSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });
  const [User, setUser] = React.useState(null)
  const [Riwayat, setRiwayat] = React.useState(null)
  React.useEffect(() => {
    const fetchData = async () => {
      const dt = await _retrieve_data('data')
      const posyandu = await get_posyandu(dt.jwt.token, {})
      const admin_posyandu = posyandu.data.data[1 - dt.user.posyanduId]
      let uuidBayi = []
      const lsBayi = await get_all_bayi(dt.jwt.token, {})
      if(lsBayi != null){
        await _store_data('bayi', lsBayi.data)
      }
      const Riwayat = await user_measurmet(dt.jwt.token, {})
      let R = []
      if(dt != null){
        dt.user.role == 'masyarakat'? 
          console.log('disini')
         : 
          lsBayi.data.result.map((value, index) => {
            if (value.posyandu == admin_posyandu.nama) {
              uuidBayi.push(value.uuid)
            }
          });
      }
      if (Riwayat != null) {
        Riwayat.data.data.map((value, index) => {
          if (uuidBayi.indexOf(value.Toddler.uuid) !== -1) {
            R.push(value)
          }
        })
        setRiwayat(prevRiwayat => {
          const slicedRiwayat = R.slice(-4);
          const reversedRiwayat = slicedRiwayat.reverse();
          return reversedRiwayat;
        });
      }

      setUser(dt)
    }
    fetchData();
  }, []);

  if (!fontsLoaded) return null;
  const Submit = async () => {
    const dt = await _retrieve_data('data')
    if (dt != null) {
      props.navigation.navigate('MeasurementPosyandu')
    } else {
      props.navigation.navigate("Login");
    }
  }



  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{ fontFamily: "PopBold", fontSize: 20, paddingBottom: 10 }}
        >
          Sisagiz
        </Text>
        <Text style={{ fontFamily: "PopMedium", fontSize: 15 }}>
          Selamat Datang
        </Text>
        <Text style={{ fontFamily: "PopBold", fontSize: 14 }}>
          {User != null ? (
            User.user.name
          ) : (<Text></Text>)}
        </Text>
      </View>
      <View style={styles.banner}></View>
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.menuText}>Menu</Text>
          <View style={{ pading: 10 }}>
            <View style={styles.containerMenu}>
              <TouchableOpacity style={styles.menu1} onPress={Submit}>
                <Text>Menu 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu2} onPress={() => {
                props.navigation.navigate("MeasurementPage");
              }} >
                <Text>Menu 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu3}>
                <Text>Menu 1</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitle1}>Ukur dan Timbang</Text>
              <Text style={styles.menuTitle2}>Hitung Status Gizi</Text>
              <Text style={styles.menuTitle3}>Artikel</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.riwayatText}>Riwayat</Text>
          <ScrollView horizontal style={{ height: 100 }}>
            <View>

              {Riwayat != null ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                  {Riwayat.map((value, index) => (
                    <View style={styles.boxRiwayat}>
                      <Text style={styles.riwayatUmur}>{value.current_age} Bulan</Text>
                      <Feather
                        name="trending-up"
                        size={18}
                        color="green"
                        style={{ position: "absolute", left: 80, top: 10 }}
                      />
                      <Text style={styles.riwayatNama}>{value.Toddler.name}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFCE81" },
  header: { paddingTop: 60, paddingLeft: 20 },
  banner: {
    position: "absolute",
    width: 320,
    height: 140,
    backgroundColor: "#FFEDD0",
    top: 180,
    right: 37,
    zIndex: 1,
    borderRadius: 10,
  },
  menuContainer: {
    marginTop: 100,
    borderRadius: 30,
    height: "70%",
    width: "100%",
    backgroundColor: "white",
  },
  containerMenu: { flexDirection: "row", justifyContent: "space-evenly" },
  menuText: {
    fontFamily: "PopBold",
    fontSize: 20,
    marginTop: 100,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  menu1: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9768AC",
    borderRadius: 9,
  },

  menu2: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7C77D",
    borderRadius: 9,
  },

  menu3: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF986F",
    borderRadius: 9,
  },
  menuTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  menuTitle1: {
    width: 80,
    fontFamily: "PopBold",
    fontSize: 11,
    textAlign: "center",
  },
  menuTitle2: {
    width: 80,
    fontFamily: "PopBold",
    fontSize: 11,
    textAlign: "center",
  },
  menuTitle3: {
    width: 80,
    fontFamily: "PopBold",
    fontSize: 11,
    textAlign: "center",
  },
  riwayatText: {
    fontFamily: "PopBold",
    fontSize: 18,
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  boxRiwayat: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    elevation: 10,
    marginLeft: 10
  },
  riwayatUmur: {
    fontFamily: "PopRegular",
    fontSize: 13,
    color: "#7A7A7A",
  },
  riwayatNama: {
    fontFamily: "PopBold",
    fontSize: 12,
    color: "black",
  }
});

export default  HomeScreen 
