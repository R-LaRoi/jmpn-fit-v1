import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles } from './globalStyles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function loginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginUser() {

    console.log(email, password);
    const userData = {
      email: email,
      password,
    };

    console.log('Logging in with:', email, password);
    axios.post('http://localhost:8000/login-user', userData).then(res => {
      console.log(res.data);
      if (res.data.status == 'ok') {
        Alert.alert('Logged In Successfull');
        AsyncStorage.setItem('token', res.data.data);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        AsyncStorage.setItem('userType', res.data.userType)
        router.replace('./dailyView');


      }
    });
  }
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'data');

  }
  useEffect(() => {
    getData();
    console.log("logged in");
  }, [])


  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <TextInput

        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput

        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={globalStyles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
          ----Or Continue as----
        </Text>
      </View>
      <View >


        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('./RegisterUser')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity

          onPress={() => alert('Coming Soon')}>

        </TouchableOpacity>
        <Text>Google</Text>
      </View>

    </View>




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
    padding: 10,
  },
});