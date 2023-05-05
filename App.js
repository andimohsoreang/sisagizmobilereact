import 'react-native-gesture-handler';

import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnBoarding from './screens/OnBoarding/OnBoarding';
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
import MyTabs from './MyTabs';
import Article from './backend/article/article';
import DetailArticle from './screens/Article/DetailArticle';
import Graph from './backend/growth/graph';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [data, setData] = React.useState(null)
  const [isChange, setChange] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    const data_user = await _retrieve_data('data');
    if (data_user != null) {
      setData(data_user)
    } else {
      setData(null)
    }
  }

  React.useEffect(() => {
    setRefreshing(true);
    fetchData()
      .finally(() => setRefreshing(false));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="onBoarding"
          component={OnBoarding} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MeasurementPage"
          component={MeasurementPage} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MeasurementPosyandu"
          component={MeasurementPosyandu} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={MyTabs} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CalcRes"
          component={CalcRes} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MeasureRes"
          component={MeasureRes} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreenUser} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailArticle"
          component={DetailArticle} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Graph"
          component={Graph} />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}