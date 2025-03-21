import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


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

  async function handleChange(name: string, value: string) {
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

    // Convert exercises string to array of strings
    const exercisesArray = exercises.split('\n').map(exercise => exercise.trim());

    const routineData = {
      userId: userId,
      duration: duration,
      type: type,
      level: level,
      date: date,
      weekday: weekday,
      exercises: exercisesArray,
    };

    console.log('Data being sent:', routineData);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/save-routine',
        routineData
      );
      console.log(response.data);
      Alert.alert('Submitted', 'Routine saved successfully!');
      setFormData({
        duration: '',
        type: '',
        level: '',
        exercises: '',
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save routine. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.pageContainer}>

      <View style={styles.card}>
        <Text style={styles.day}>{weekday}</Text>
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
          placeholder="Exercises (e.g., Pushups, Squats)\n(Enter each exercise on a new line)"
          multiline={true}
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


      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveRoutine}>
        <Text style={styles.buttonText}>SAVE Workout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    borderBottomColor: '#f9004c',

    padding: 20,

  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 25,
    marginBottom: 20,
    borderTopColor: '#f9004c',
    borderTopWidth: 10,
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
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
    color: '#292929',
  },
  button: {
    backgroundColor: '#F9004C',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 15,
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  day: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    position: 'absolute',
    width: 135,
    height: 135,
    borderRadius: 70,


  },
});