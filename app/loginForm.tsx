import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles } from './globalStyles';
import { router } from 'expo-router';

export default function loginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation (you should add more robust validation)
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Simulate login logic (replace with your actual authentication)
    console.log('Logging in with:', email, password);
    // Here you would typically make an API call to your backend
    // For example:
    // fetch('your-backend-api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     // Navigate to the next screen or perform other actions
    //     Alert.alert('Success', 'Login successful!');
    //   } else {
    //     Alert.alert('Error', data.message || 'Login failed.');
    //   }
    // })
    // .catch(error => {
    //   console.error('Login error:', error);
    //   Alert.alert('Error', 'An error occurred during login.');
    // });

    // Simulate success for now.
    Alert.alert('Success', 'Simulated Login successful!');
    router.replace('./dailyView');

  };

  return (
    <View >
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

