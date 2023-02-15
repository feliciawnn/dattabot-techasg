import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Login from './screens/Login'
import Home from './screens/Home'
import PokemonLibrary from './screens/PokemonLibrary';

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
    console.log(Stack)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Library" component={PokemonLibrary} />
        <Stack.Screen name="Home" screen="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}