import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Dimensions, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');

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
    <View style={styles.contentContainer}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        style={styles.gradient}
        locations={[0.4, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        style={styles.gradient2}
        locations={[0.7, 1]}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.headingText}>Create Account</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleRegisterUser}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="white" />}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  image: {
    width: '60%',
    // height: '100%',
    position: 'absolute',
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
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  headingText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black'
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
});