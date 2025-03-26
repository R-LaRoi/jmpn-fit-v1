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
      <Image
        source={require('@/assets/images/jmpn.jpg')}
        style={styles.logo}
        resizeMode="cover"
      />
      <View style={styles.formContainer}>
        <Text style={styles.registerTitle}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={userName}
          onChangeText={handleName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry
          value={password}
          onChangeText={handlePassword}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterUser}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="white" />}
        <TouchableOpacity onPress={() => router.replace('./loginForm')}>
          <Text style={styles.loginText}>Already have an account? Sign in.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2d2b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 75,
    borderWidth: 3,

    borderColor: 'gray',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'white',
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#F9004C',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'whitesmoke',
    fontSize: 16,
    marginTop: 20,
  },
});