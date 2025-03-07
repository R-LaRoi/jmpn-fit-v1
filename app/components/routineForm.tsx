import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WeeklyView from '../(tabs)/weeklyView';
import MonthlyView from '../(tabs)/monthlyView';

const Tab = createMaterialTopTabNavigator();

function WorkoutHistoryTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Weekly" component={WeeklyView} />
      <Tab.Screen name="Monthly" component={MonthlyView} />
    </Tab.Navigator>
  );
}

export default function RoutineForm() {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter some text.');
      return;
    }
    Alert.alert('Submitted', `You entered: ${inputText}`);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routine Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text..."
        value={inputText}
        onChangeText={setInputText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <WorkoutHistoryTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});