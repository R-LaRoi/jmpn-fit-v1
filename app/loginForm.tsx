import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { tailwind } from 'nativewind';

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
    <>
      <Video
        source={{ uri: 'https://github.com/user-attachments/assets/73e4ed6e-0dcf-404c-86f7-181313b25c81' }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        resizeMode="cover"
        muted
        repeat
      />
      <Image
        source={require('@/assets/images/lg.png')}
        style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 2 }}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height, zIndex: 1 }}
        locations={[0.3, 1]}
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height, zIndex: 1 }}
        locations={[0.2, 1]}
      />
      <View style={tailwind('absolute bottom-12 w-full px-5 z-20')}>
        <TextInput
          style={tailwind('bg-white bg-opacity-90 rounded-full p-4 mb-4 text-lg')}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={tailwind('bg-white bg-opacity-90 rounded-full p-4 mb-4 text-lg')}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={tailwind('bg-gray-900 py-4 rounded-full items-center mb-4')}
          onPress={loginUser}
        >
          <Text style={tailwind('text-white text-lg font-bold')}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind('self-center mt-2 mb-4')}
          onPress={() => router.replace('./RegisterUser')}
        >
          <Text style={tailwind('text-white text-sm text-center font-bold')}>Ready to JMPN? Join Now.</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}