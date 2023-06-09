import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { useFonts } from 'expo-font';
import { Feather } from "@expo/vector-icons";
import Measurment from '../../backend/measurment/measurment';
import { _get_all_keys_data, _remove_data, _retrieve_data, _store_data } from '../../backend/handler/storage_handler';
import React from 'react';
import { get_all_bayi, get_posyandu, user_measurmet } from '../../backend/api/all_api';
import { NavigationContainer } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import homeSvg from '../../assets/homeSvg.svg'
import Logo from './Logo';

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
  const isFocused = useIsFocused()
  const navigationState = useNavigationState(state => state);
  const currentTabIndex = navigationState.index;

  React.useEffect(() => {
    const fetchData = async () => {
      const dt = await _retrieve_data('data')
      if (dt != null) {
        let uuidBayi = []
        const lsBayi = await get_all_bayi(dt.jwt.token, {})
        if (lsBayi != null) {
          await _store_data('bayi', lsBayi.data)
        }
        const Riwayat = await user_measurmet(dt.jwt.token, {})
        let R = []
        if (dt != null) {
          dt.user.role == 'masyarakat' ?
            lsBayi.data.result.map((value, index) => {
              if (value.Parent.uuid == dt.user.parent_uuid) {
                uuidBayi.push(value.uuid)
              }
            })
            :
            lsBayi.data.result.map((value, index) => {
              if (value.Posyandu.uuid == dt.user.posyandu_uuid) {
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
      } else {
        setUser(null)
        setRiwayat(null)
      }
    }
    fetchData();
  }, [currentTabIndex]);

  if (!fontsLoaded) return null;
  const Submit = async () => {
    const dt = await _retrieve_data('data')
    if (dt != null) {
      if (dt.user.role !== 'masyarakat') {
        props.navigation.navigate('MeasurementPosyandu')
      } else {
        props.navigation.navigate('Graph')
      }
    } else {
      props.navigation.navigate("Login");
    }
  }

  const click = async (value) => {
    await _store_data('pengukuran', {
      uuid: value.Toddler.uuid,
      date: value.date
    }).then((result) => {
      props.navigation.navigate('MeasureRes')
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <Text style={{ fontFamily: "PopMedium", fontSize: 15 }}>
          Selamat Datang
        </Text>
        <Text style={{ fontFamily: "PopBold", fontSize: 14 }}>
          {User != null ? (
            User.user.name
          ) : (<Text></Text>)}
        </Text>
      </View>

      <View style={styles.banner}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'PopBold', margin: '5%', marginLeft: 40, fontSize: 15, color: '#7C5211' }}>
            {User != null ? (
              User.user.role != 'masyarakat' ? (
                <Text>
                  Bantu Cek Status Gizi.{'\n'}
                  Masyarakat Yuk!.{'\n\n'}
                </Text>
              ) : (
                <Text>
                  Cek Status Gizi.{'\n'}
                  Anak Anda Sekarang!.{'\n\n'}
                </Text>

              )
            ) : (
              <Text>
                Cek Status Gizi.{'\n'}
                Anak Anda Sekarang!.{'\n\n'}
              </Text>
            )}
            <TouchableOpacity
              style={{ backgroundColor: '#FFCE81', width: 150, borderRadius: 20 }}
              onPress={() => {
                if (User != null) {
                  props.navigation.navigate(User.user.role != 'masyarakat' ? 'MeasurementPosyandu' : 'Graph');
                } else {
                  props.navigation.navigate("Login");
                }
              }}>
              <Text style={{ textAlign: 'center', fontFamily: 'PopBold', fontSize: 15, margin: '5%', color: '#603802' }}>Cek Yuk</Text>
            </TouchableOpacity>
          </Text>

          <Image source={require('../../assets/home.png')} style={{ alignSelf: 'flex-end' }} />
        </View>

      </View>
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.menuText}>Menu</Text>
          <View style={{ pading: 10 }}>
            <View style={styles.containerMenu}>
              {User != null ?
                (
                  <TouchableOpacity style={styles.menu1} onPress={Submit}>
                    <FontAwesome name="bar-chart" size={35} color="white" />
                  </TouchableOpacity>

                ) :
                (
                  <TouchableOpacity style={styles.menu1} onPress={Submit}>
                    <FontAwesome name="bar-chart" size={35} color="white" />
                  </TouchableOpacity>
                )
              }
              <TouchableOpacity style={styles.menu2} onPress={() => {
                props.navigation.navigate("MeasurementPage");
              }} >
                <FontAwesome name="edit" size={35} color="white" />
              </TouchableOpacity>
              {User != null ? (

                <TouchableOpacity style={styles.menu3} onPress={() => {
                  props.navigation.navigate(User.user.role != 'masyarakat' ? 'Graph' : 'Article');
                }}>
                  <FontAwesome name="book" size={35} color="white" />
                </TouchableOpacity>
              ) :
                (
                  <TouchableOpacity style={styles.menu3} onPress={() => {
                    props.navigation.navigate('Article');
                  }}>
                    <FontAwesome name="book" size={35} color="white" />
                  </TouchableOpacity>
                )}

            </View>
            <View style={styles.menuTitle}>
              {User != null ?
                (

                  <Text style={styles.menuTitle1}>
                    {User.user.role !== 'masyarakat' ? 'Ukur dan Timbang' : 'Cek Status Gizi'}
                  </Text>
                ) :
                (
                  <Text style={styles.menuTitle1}>Cek Status Gizi</Text>

                )


              }

              <Text style={styles.menuTitle2}>Hitung Status Gizi</Text>
              {User != null ? (

                <Text style={styles.menuTitle3}>{User.user.role !== 'masyarakat' ? 'Cek Status Gizi' : 'Artikel'}</Text>
              ) : (
                <Text style={styles.menuTitle3}>{'Artikel'}</Text>

              )}
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.riwayatText}>Riwayat</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: 100, }}>
            <View>
              {Riwayat != null ? (
                <View style={{ flexDirection: "row"}}>
                  {Riwayat.map((value, index) => (
                    <TouchableOpacity  onPress={() => click(value)}>
                      <View style={styles.boxRiwayat}>
                        <Text style={styles.riwayatUmur}>{value.date}</Text>
                        <Feather
                          name={value.predict_result == 0? ('trending-up') : ('trending-down')}
                          size={18}
                          color= {value.predict_result == 0? ('green') : ('red')}
                          style={{ position: "absolute", left: 110, top: 10 }}
                        />
                        <Text style={styles.riwayatNama}>{value.Toddler.name}</Text>
                      </View>
                    </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: "#FFCE81"},
  header: { paddingLeft: 20, top: -300 },
  banner: {
    position: "absolute",
    width: 340,
    height: 140,
    backgroundColor: "#FFEDD0",
    top: 230,
    right: 37,
    zIndex: 1,
    borderRadius: 10,
    marginRight: -10
  },
  menuContainer: {
    marginTop: -180,
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
    borderWidth: 0.5,
    borderColor: 'purple',
    width: 150,
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
  },
});

export default HomeScreen
