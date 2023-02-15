import React, { useEffect} from 'react';
import {useNavigation} from '@react-navigation/native'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';


export default function Login() {
  const [inputUser, setInputUser] = React.useState('')
  const [inputPass, setInputPass] = React.useState('')
  
  const navigation = useNavigation()

  function loginUser(){
    // Sanitize input
    setInputUser(inputUser.toLowerCase())
    setInputPass(inputPass.toLowerCase())

    // Alert.alert('Button with adjusted color pressedsd')
    fetch('https://dummyjson.com/users/search?q='+inputUser)
    .then((res) => res.json())
    .then((json) => {
      // Check password
      var userPass = json['users'][0]['password']
      userPass === inputPass ? (Alert.alert("CORRECT PASS")) : (Alert.alert("PASS WRONG!!"))
    })
  }

  useEffect(() => {
    fetch('https://dummyjson.com/users/')
    .then(res => res.json())
    // .then(json => console.log(json));
  }, [])

  return (
    // Change background to gradient blue
    <View style={styles.container}>
      <View style={styles.modalContainer}>
      <Text style={[styles.textCenter, styles.boldText]}>WELCOME BACK</Text>
      <Text style={styles.textCenter}>Sign In To Your Account</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputText}
          onChangeText={(e) => {setInputUser(e)}} 
          placeholder={"Username"}
        />

        <TextInput 
          style={styles.inputText}
          onChangeText={(e) => {setInputPass(e)}}
          secureTextEntry = {true} 
          placeholder={"Password"}
        />

        <Button
          title="Log In"
          style={styles.loginBtn}
          onPress={() => loginUser()}
        />
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667db6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderRadius: 16,
    backgroundColor: "#fff"
  },
  inputContainer: {
    margin: 24,
  },
  textCenter: {
    textAlign: 'center',
    marginHorizontal: 48, // find a way to make it based on the edge of the screen
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 24,
  },
  inputText: {
    borderWidth: 1,
    marginVertical: 8,
    padding: 12,
    borderColor: '#d3d3d3',
    borderRadius: 8,
  },
  loginBtn: {
    backgroundColor: 'purple',
  },
});
