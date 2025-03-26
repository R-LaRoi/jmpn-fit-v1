import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Navbar from './nav';
import { activeUser } from '../components/username';
interface Routine {
  _id?: string;
  weekday: string;
  type: string;
  level: string;
  duration?: string;
  date?: string;
  exercises?: string[];
}

export default function MonthRoutinesDetails() {
  const { routines: routinesString } = useLocalSearchParams();
  const routines: Routine[] = JSON.parse(routinesString as string);
  const { username } = activeUser();

  console.log("Routines Array:", routines); // Add this line

  function renderRoutineCard({ item }: { item: Routine }) {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.weekdayText}>{item.date}</Text>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text style={styles.levelText}>Level: {item.level}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar username={username} />
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Monthly Routines</Text>
      <FlatList
        data={routines}
        renderItem={renderRoutineCard}
        keyExtractor={(item) => (item && item._id ? item._id.toString() : Math.random().toString())} // Add conditional check
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
  weekdayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f9004c',
    marginBottom: 8,
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
  levelText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});