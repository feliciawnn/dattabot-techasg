import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Login from './screens/Login'
import Home from './screens/Home'
import PokemonLibrary from './screens/PokemonLibrary';
import RandomPokemon from './screens/RandomPokemon';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator();

export default function AuthNavigator() {
    console.log(Stack)
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Library') {
              iconName = focused ? 'list' : 'list-outline';
            } 
            else if (route.name === 'Get Random') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            else if(route.name === 'Profile'){
              iconName = focused ? 'person-circle' : 'person-circle-outline'
            }
            else if(route.name ==="Home"){
              iconName = focused ?  'home' : 'home-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={26} color={'#A36672'} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
        />
        <Tab.Screen name="Library" component={PokemonLibrary} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Get Random" component={RandomPokemon} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}