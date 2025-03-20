import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, Image, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

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
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://github.com/user-attachments/assets/73e4ed6e-0dcf-404c-86f7-181313b25c81' }}
        style={styles.video}
        resizeMode="cover"
        muted
        repeat
      />
      <Image
        source={require('@/assets/images/lg.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 0.6)']}
        style={styles.overlay}
        locations={[0.3, 1]}
      />


      <View style={styles.bottomCard}>

        <View style={styles.middleCard}>

          <View style={styles.topCard}>

            <Text style={styles.joinText}>Login</Text>
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
              style={styles.signInButton}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  video: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',

  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    position: 'absolute',
    width: '50%',
    alignSelf: 'center',
    bottom: '30%',
  },

  bottomCard: {
    position: 'absolute',
    height: 380,
    backgroundColor: 'rgba(252,252,252, 0.35)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    bottom: 0,
    alignSelf: 'center',
    width: '100%',

  },
  middleCard: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(252,252,252, 0.55)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    top: 25,
    alignSelf: 'center',
    width: '100%',
    height: 350,
  },
  topCard: {
    position: 'absolute',
    bottom: -30,
    backgroundColor: 'rgba(252,252,252, 0.95)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    padding: 40,
    alignItems: 'center',

    // marginLeft: -20,
  },
  input: {
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
  signInButton: {
    backgroundColor: '#F9004C',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  joinText: {
    color: '#292929',
    fontSize: 16,
    marginTop: 5,
    paddingBottom: 15,
    textAlign: 'center',
  },
});