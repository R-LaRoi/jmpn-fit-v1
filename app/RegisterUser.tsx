import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import axios from 'axios';


export default function RegisterUser() {

  console.log("Register user component rendered");

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyName, setVerifyName] = useState(false);
  const [verifyEmail, setverifyEmail] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  function handleName(inputName: string) {
    setUserName(inputName);
    setVerifyName(false);
    if (inputName.length > 1) {
      setVerifyName(true);
    }

  }

  function handleEmail(inputEmail: string) {

    setEmail(inputEmail);
    setverifyEmail(false);
    if (/\S+@\S+\.\S+/.test(inputEmail)) {
      setverifyEmail(true);
    }
  }

  function handlePassword(inputPassword: string) {

    setPassword(inputPassword);
    setVerifyPassword(false);
    if (inputPassword.length > 7) {
      setVerifyPassword(true);
    }
  }

  function handleRegisterUser() {
    console.log('handle register user');
    // if (!verifyName || !verifyEmail || !verifyPassword) {
    //   Alert.alert('Error', 'Please fill in all required fields.');
    //   return;
    // }
    const userData = {
      username: userName,
      email: email,
      password: password,
    }

    axios.post('http://localhost:8000/register', userData)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'User registered successfully!');
        router.replace('./loginForm');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Registration failed.');
      })




    setIsLoading(true);




  }
  return (
    <KeyboardAwareScrollView>
      <View>
        <Text
        >Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder=" Name"
          value={userName}
          onChangeText={handleName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePassword}
        />

        <TouchableOpacity onPress={handleRegisterUser}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'darkmagenta',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',

  },
});