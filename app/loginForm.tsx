import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';


const { width, height } = Dimensions.get('window');

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginUser() {
    const userData = { email, password };

    axios.post('http://localhost:8000/login-user', userData).then(res => {
      if (res.data.status === 'ok') {
        Alert.alert('Logged In Successfully');
        AsyncStorage.setItem('token', res.data.data);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        AsyncStorage.setItem('userType', res.data.userType);
        AsyncStorage.setItem('username', res.data.username);
        AsyncStorage.setItem('userId', res.data.userId);
        router.replace('./dailyView');
      }
    });
  }

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.loginContainer}>
      <Video
        source={{ uri: 'https://github.com/user-attachments/assets/73e4ed6e-0dcf-404c-86f7-181313b25c81' }}
        style={styles.video}
        resizeMode="cover"
        muted
        repeat
      />
      <Image
        source={require('@/assets/images/lg.png')}
        style={styles.bgImg}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={[styles.gradient, { zIndex: 1 }]}
        locations={[0.3, 1]}
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={[styles.gradient, { zIndex: 2 }]}
        locations={[0.2, 1]}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={loginUser}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => router.replace('./RegisterUser')}
        >
          <Text style={styles.joinText}>Ready to JMPN? Join Now.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  video: {
    width: width, height: height, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,

  },
  joinText: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
  },
  gradient2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
  },
  bgImg: {
    zIndex: 5,
    justifyContent: 'center',
    width: '80%',
    display: 'flex',
    alignSelf: 'center',


  },
  contentContainer: {
    flex: 1,

    justifyContent: 'flex-end',
    zIndex: 5

  },
  headingText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    zIndex: 5,
    padding: 30,
    justifyContent: 'center',
    marginTop: -60,
    width: '90%',

  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
  button: {
    backgroundColor: '#292929',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});