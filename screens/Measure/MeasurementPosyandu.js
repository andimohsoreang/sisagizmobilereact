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
import { _store_data, _retrieve_data } from "../../backend/handler/storage_handler";
import { get_posyandu } from "../../backend/api/all_api";
import { post_measurment } from "../../backend/api/all_api";

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
  const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const [date, setDate] = React.useState(`${year}-${month}-${day}`)
    const [uuid, setuuid] = React.useState('')
    const [age, setAge] = React.useState(3)
    const [bb, setBB] = React.useState(2.9)
    const [tb, setTB] = React.useState(70)
    const [method, setMethod] = React.useState('Terlentang')
    const [vitamin, setVitamin] = React.useState('ya')
    const [lila, setLila] = React.useState(4)
    const [lika, setLika] = React.useState(4)
    const [doSubmit, setDoSubmit] = React.useState(false)
    const [dataBayi, setDataBayi] = React.useState([])


    React.useEffect(() => {
      const fetchData = async () => {
          const data_user = await _retrieve_data('data');
          const POSYANDU = await get_posyandu(data_user.jwt.token, {});
          const data = await _retrieve_data('bayi');
          const newDataBayi = data.result.filter((value) => value.posyandu === POSYANDU.data.data[1 - (data_user.user.posyanduId)].nama);
          setDataBayi(newDataBayi);
      }
      fetchData();
  }, []);
  const Submit = async () => {
    try {
      const data = await _retrieve_data('data');
      console.log(uuid);
      const result = await post_measurment(data.jwt.token, {
        uuid: uuid,
        date: date,
        age: Number(age),
        bb: Number(bb),
        tb: Number(tb),
        method: method,
        vitamin: vitamin,
        lila: Number(lila),
        lika: Number(lika),
      });
      if (result.status === 201) {
        props.navigation.navigate('MeasureRes')
      } else {
        alert(result.message);
        props.navigation.navigate('MeasureRes')
      }
    } catch (err) {
      alert(err);
    }
  }

  
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
          Pilih Anak
        </Text>
        <SelectDropdown 
                defaultButtonText='Pilih Bayi'
                data={dataBayi.map((value) => {return value.name})}
                onSelect={(selectedItem, index) => {
                    setuuid(dataBayi[index].uuid)
                    setDoSubmit(true)
                }}
            />
      </View>
      <View>
        {doSubmit? (
          <View style={styles.menuContainer}>
          <ScrollView>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Tanggal Pengukuran</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInput} 
                  placeholder="Tanggal Pengukuran"
                  value={date}
                  editable={false}
                />
              </View>
            </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Umur</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur}
                 keyboardType='numeric'
                 placeholder='Umur'
                 onChangeText={setAge}
                 value={String(age)} />
                <Text>Bulan</Text>
              </View>
            </View>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Berat Badan</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur}
                keyboardType='numeric'
                placeholder='Berat Badan'
                onChangeText={setBB}
                value={String(bb)} />
                <Text>Kg</Text>
              </View>
            </View>
          </View>
            <View style={styles.umur}>
              <Text style={styles.textTitle}>Tinggi Badan</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput style={styles.textInputUmur}
                keyboardType='numeric'
                placeholder='Tinggi Badan'
                onChangeText={setTB}
                value={String(tb)} />
                <Text>Cm</Text>
              </View>
            </View>
            <View>
              <View style={styles.umur}>
                <Text style={styles.textTitle}>Lila</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput style={styles.textInputUmur} 
                  placeholder='Lingkar Lengan'
                  onChangeText={setLila}
                  value={String(lila)}/>
                  <Text>Cm</Text>
                </View>
              </View>
              <View style={styles.umur}>
                <Text style={styles.textTitle}>LiKa</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput style={styles.textInputUmur}
                  placeholder='Lingkar Kaki'
                  onChangeText={setLika}
                  value={String(lika)} />
                  <Text>Cm</Text>
                </View>
              </View>
              <View style={styles.umur}>
                <Text style={styles.textTitle}>Cara Ukur</Text>
                <View style={{ flexDirection: "row" }}>
                <SelectDropdown 
                  defaultValue={'Terlentang'}
                  data={['Terlentang', 'Berdiri']}
                  onSelect={(selectedItem, index) => {
                      setMethod(selectedItem)
                  }}
              />
                </View>
              </View>
              <View style={styles.umur}>
                <Text style={styles.textTitle}>Vitamin A</Text>
                <View style={{ flexDirection: "row" }}>
                <SelectDropdown 
                  defaultValue={'Ya'}
                  data={['Ya', 'Tidak']}
                  onSelect={(selectedItem, index) => {
                      setVitamin(selectedItem)
                  }}
              />
                </View>
              </View>
            </View>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={Submit}>
              <View style={styles.btn}>
                <Text style={{ fontFamily: "PopBold", color: "black" }}>
                  Hitung
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        ):
        (
          <Text></Text>
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
