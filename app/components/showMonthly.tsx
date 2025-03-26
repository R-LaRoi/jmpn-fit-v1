import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';



interface Routine {
  _id: string;
  weekday: string;
  type: string;
  level: string;
  duration?: string;
  date?: string;
  exercises?: string[];
}

interface MonthRoutine {
  month: number;
  year: number;
  routines: Routine[];
}

export default function ShowMonthlyRoutines() {
  const [monthlyRoutines, setMonthlyRoutines] = useState<MonthRoutine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    fetchMonthlyRoutines();
  }, []);

  async function fetchMonthlyRoutines() {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8000/monthly-routines/${userId}`);
      setMonthlyRoutines(response.data.monthlyRoutines);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching monthly routines:', err);
      setError('Failed to load monthly routines');
      setLoading(false);
    }
  }

  function renderMonthCard({ item }: { item: MonthRoutine }) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          router.replace({
            pathname: '/components/monthlyDetails',
            params: { routines: JSON.stringify(item.routines) },
          });
        }}
      >
        <Text style={styles.monthText}>{monthNames[item.month - 1]} {item.year}</Text>
        <Text style={styles.routineCount}>{item.routines.length} Routines</Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Loading monthly routines...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Monthly Routines</Text>
      <FlatList
        data={monthlyRoutines}
        renderItem={renderMonthCard}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9004c',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#f9004c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9004c',
    marginBottom: 8,
    textAlign: 'center',
  },
  routineCount: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
});