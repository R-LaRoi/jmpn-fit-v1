import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function loginForm() {
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
    <>
      <Video
        source={{ uri: 'https://github.com/user-attachments/assets/73e4ed6e-0dcf-404c-86f7-181313b25c81' }}
        style={styles.video}
        resizeMode="cover"
        muted
        repeat
      />
      <Image
        source={require('@/assets/images/lg.png')}
        style={styles.image2}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={styles.gradient}
        locations={[0.3, 1]}
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={styles.gradient2}
        locations={[0.2, 1]}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.joinNowLink}
          onPress={() => router.replace('./RegisterUser')}
        >
          <Text style={styles.joinNowText}>Ready to JMPN? Join Now.</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',


  },
  image2: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    zIndex: 1,
  },
  gradient2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    zIndex: 1,
  },
  formContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#292929',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinNowLink: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  joinNowText: {
    color: 'whitesmoke',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});