import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnBoarding from './screens/OnBoarding/OnBoarding';
import Article from './screens/Article/Article';
import HomeScreen from './screens/Home/HomeScreen';
import { Feather } from "@expo/vector-icons";
import MeasurementPage from './screens/Measure/MeasurementPage'

export default function App() {


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
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
        component={HomeScreen}
      />
      <Tab.Screen
        name="Measurements"
        component={MeasurementPage}
        options={{
          tabBarIcon: (props) => (
            <Feather name="aperture" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Article"
        component={Article}
        options={{
          tabBarIcon: (props) => (
            <Feather name="book" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Article}
        options={{
          tabBarIcon: (props) => (
            <Feather name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeSCreen"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="onBoarding"
          component={OnBoarding}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={MyTabs}
        />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}