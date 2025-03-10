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
  const [formData, setFormData] = useState({
    duration: '',
    type: '',
    level: '',
    exercises: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [weekday, setWeekday] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.log('No userId found in AsyncStorage');
        }

        const currentDate = new Date();
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        setDate(currentDate.toLocaleDateString(undefined, options));
        setWeekday(currentDate.toLocaleDateString(undefined, { weekday: 'long' }));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  async function handleSaveRoutine() {
    const { duration, type, level, exercises } = formData;

    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please log in.');
      return;
    }

    if (!duration || !type || !level || !exercises || exercises.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const routineData = {
      userId: userId,
      duration: duration,
      type: type,
      level: level,
      date: date,
      weekday: weekday,
      exercises: exercises,
    };

    console.log('Data being sent:', routineData);
    setIsLoading(true);

    axios
      .post('http://localhost:8000/save-routine', routineData)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Submitted', 'Routine saved successfully!');
        setFormData({
          duration: '',
          type: '',
          level: '',
          exercises: '',
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to save routine. Please try again.');
        setIsLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routine Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Cardio, Strength)"
        value={formData.type}
        onChangeText={(text) => handleChange('type', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (e.g., 30 min)"
        value={formData.duration}
        onChangeText={(text) => handleChange('duration', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Exercises (e.g., Pushups, Squats)"
        value={formData.exercises}
        onChangeText={(text) => handleChange('exercises', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Level (e.g., Beginner, Intermediate)"
        value={formData.level}
        onChangeText={(text) => handleChange('level', text)}
      />
      <Text>Date: {date}</Text>
      <Text>Day: {weekday}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSaveRoutine}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <WorkoutHistoryTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'darkmagenta',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});