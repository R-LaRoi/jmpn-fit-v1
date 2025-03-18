import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Dimensions, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

export default function RegisterUser() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleName(inputName: string) {
    setUserName(inputName);
  }

  function handleEmail(inputEmail: string) {
    setEmail(inputEmail);
  }

  function handlePassword(inputPassword: string) {
    setPassword(inputPassword);
  }

  function handleRegisterUser() {
    const userData = {
      username: userName,
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:8000/register', userData)
      .then((response) => {
        Alert.alert('Success', 'User registered successfully!');
        router.replace('./loginForm');
      })
      .catch((error) => {
        Alert.alert('Error', 'Registration failed.');
      });

    setIsLoading(true);
  }

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

      {/* Bottom card (largest) */}
      <View style={styles.bottomCard}>
        {/* Middle card */}
        <View style={styles.middleCard}>
          {/* Top card (form container) */}
          <View style={styles.topCard}>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
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
              <TouchableOpacity style={styles.signInButton} onPress={handleRegisterUser}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              {isLoading && <ActivityIndicator size="large" color="white" />}
              <TouchableOpacity onPress={() => router.replace('./loginForm')}>
                <Text style={styles.joinText}>Already have an account? Sign in.</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinText: {
    color: '#292929',
    fontSize: 16,
    textAlign: 'center',
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
    height: 340,
  },
  topCard: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: 'rgba(252,252,252, 0.95)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    padding: 40,


  },
});