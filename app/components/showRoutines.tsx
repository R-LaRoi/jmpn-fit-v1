
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ScrollView, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Routine {
  _id: string;
  weekday: string;
  type: string;
  level: string;
  duration?: string;
  date?: string;
  exercises?: string[];
}

export default function ShowRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchWeeklyRoutines();
  }, []);

  async function fetchWeeklyRoutines() {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8000/weekly-routines/${userId}`);
      setRoutines(response.data.routines);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching routines:', err);
      setError('Failed to load your routines');
      setLoading(false);
    }
  };

  async function fetchRoutineDetails(routineId: string) {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8000/routine/${userId}/${routineId}`);
      setSelectedRoutine(response.data.routine);
      setModalVisible(true);
    } catch (err) {
      console.error('Error fetching routine details:', err);
      setError('Failed to load routine details');
    }
  };


  function openModal(routineId: string) {
    console.log('Card pressed, routineId:', routineId);
    fetchRoutineDetails(routineId);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedRoutine(null);
  }

  function renderRoutineCard({ item }: { item: Routine }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => openModal(item._id)}
      >
        <Text style={styles.weekdayText}>{item.weekday}</Text>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text style={styles.levelText}>Level: {item.level}</Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Loading your routines...</Text>
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
      <Text style={styles.title}>Consistency is key</Text>
      {routines.length > 0 ? (
        <FlatList
          data={routines}
          renderItem={renderRoutineCard}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.noRoutinesText}>
            No routines found. Create your first workout routine!
          </Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {selectedRoutine && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalTitle}>{selectedRoutine.weekday} Workout</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}><Text style={styles.bold}>Type:</Text> {selectedRoutine.type}</Text>
                  <Text style={styles.infoText}><Text style={styles.bold}>Level:</Text> {selectedRoutine.level}</Text>
                  {selectedRoutine.duration && (
                    <Text style={styles.infoText}><Text style={styles.bold}>Duration:</Text> {selectedRoutine.duration}</Text>
                  )}
                  {selectedRoutine.date && (
                    <Text style={styles.infoText}><Text style={styles.bold}>Date:</Text> {selectedRoutine.date}</Text>
                  )}
                </View>

                {selectedRoutine.exercises && selectedRoutine.exercises.length > 0 && (
                  <>
                    <Text style={styles.exercisesTitle}>Exercises:</Text>
                    {selectedRoutine.exercises.map((exercise, index) => (
                      <View key={index} style={styles.exerciseItem}>
                        <Text style={styles.exerciseText}>{exercise}</Text>
                      </View>
                    ))}
                  </>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
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
  noRoutinesText: {
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 22,
    width: '85%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 22,
    color: '#666',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'whitesmoke',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderTopColor: '#f9004c',
    borderTopWidth: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#292929',
  },
  bold: {
    fontWeight: 'bold',
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  exerciseItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  exerciseText: {
    fontSize: 16,
    color: '#333',
  },
});