import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from './Style';
import { useFonts } from 'expo-font';



export default function OnBoarding(props) {

  
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
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1611957082175-f86766b052ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
        style={styles.image}
      />
      <View style={styles.container2}>
        <Text style={styles.textHeader}>Halo Semuanya 😍</Text>
        <Text style={styles.textInfo}>
          {" "}
          Selamat datang pada Sistem Infromasi Status Gizi Anak
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.btn} onPress={()=> {
          props.navigation.navigate('Home')
        }} >
          <Text style={{color:'white', fontFamily:'PopBold'}}>Mulai Pakai Aplikasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

