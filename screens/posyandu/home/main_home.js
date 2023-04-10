
import React from 'react';
import useFonts from 'expo-font'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import styleFonts from '../../fonts';

export default function MainHomePosyandu() {

  return (
    <View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            height: 200,
            backgroundColor: "#FFCE81",
          }}>
          <Text style={styles.profil}>
            Halo
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    profil: {
      fontSize: 20,
      color: "white",
      fontFamily: 'PopBold'
    },
})