import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, useRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnBoarding from './screens/OnBoarding/OnBoarding';
import Article from './screens/Article/Article';
import HomeScreen from './screens/Home/HomeScreen';
import { Feather } from "@expo/vector-icons";
import MeasurementPage from './screens/Measure/MeasurementPage'
import Splash from './screens/Splash/Splash'
import Calculator from './backend/measurment/calculator';
import MeasurementPosyandu from './screens/Measure/MeasurementPosyandu';
import CalcRes from './screens/Measure/res/CalcRes'
import MeasureRes from './screens/Measure/res/MeasureRes'
import PetugasLogin from './screens/PetugasLogin'
import LoginScreenUser from './screens/Login';
import Profile from './screens/Measure/res/Profile';
import { _retrieve_data } from './backend/handler/storage_handler';
import { RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Route } from '@react-navigation/native';

export default function MyTabs(props) {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const [data, setData] = React.useState(null)
    const [isChange, setChange] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const isFocused = useIsFocused()
    const route = useRoute()

    const fetchData = async () => {
        const data_user = await _retrieve_data('data');
        if (data_user != null) {
          setData(data_user)
        } else {
          setData(null)
        }
      }

      React.useEffect(() => {
        if(isFocused){
            fetchData()
        }
      }, [route]);

    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabels: false,
          headerShown: false,
        }}
        >
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Feather name="home" size={24} color="black" />
            ),
          }}
          name="Home"
          component={HomeScreen} />
        <Tab.Screen
          name="Pengukuran"
          component={data != null ? (MeasurementPosyandu) : (LoginScreenUser)}
          options={{
            tabBarIcon: (props) => (
              <Feather name="aperture" size={24} color="black" />
            ),
          }} />
        <Tab.Screen
          name="Article"
          component={Article}
          options={{
            tabBarIcon: (props) => (
              <Feather name="book" size={24} color="black" />
            ),
          }} />
        {data != null ?
          (
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: (props) => (
                  <Feather name="user" size={24} color="black" />
                ),
              }} />
          )
          :
          (
            <Tab.Screen
              name="Login"
              component={LoginScreenUser}
              options={{
                tabBarIcon: (props) => (
                  <Feather name="user" size={24} color="black" />
                ),
              }} />
          )}
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})
  