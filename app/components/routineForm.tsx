import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WeeklyView from '../(tabs)/weeklyView';
import MonthlyView from '../(tabs)/monthlyView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');
  const [weekday, setWeekday] = useState('');
  const [exercises, setExercises] = useState('');
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };
    fetchUserId();
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setDate(currentDate.toLocaleDateString(undefined, options));
    setWeekday(currentDate.toLocaleDateString(undefined, { weekday: 'long' }));
  }, []);

  const handleSubmit = async () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter a routine name.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please log in.');
      return;
    }

    const routineData = {
      userId: userId,
      routineName: inputText,
      duration: duration,
      type: type,
      level: level,
      date: date,
      weekday: weekday,
      exercises: exercises,
    };

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual MongoDB API endpoint
      const response = await axios.post('YOUR_API_ENDPOINT', routineData);
      Alert.alert('Submitted', 'Routine saved successfully!');
      setInputText('');
      setDuration('');
      setType('');
      setLevel('');
      setExercises('');
    } catch (error) {
      console.error('Error submitting routine:', error);
      Alert.alert('Error', 'Failed to save routine. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routine Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Routine Name"
        value={inputText}
        onChangeText={setInputText}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (e.g., 30 min)"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Cardio, Strength)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Level (e.g., Beginner, Intermediate)"
        value={level}
        onChangeText={setLevel}
      />
      <TextInput
        style={styles.input}
        placeholder="Exercises (e.g., Pushups, Squats)"
        value={exercises}
        onChangeText={setExercises}
      />
      <Text>Date: {date}</Text>
      <Text>Day: {weekday}</Text>

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
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
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