// DailyView.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeeklyView from "./(tabs)/weeklyView";
import MonthlyView from "./(tabs)/monthlyView";
import RoutineForm from "./components/routineForm";
import Navbar from "./components/nav";

const Tab = createMaterialTopTabNavigator();

export default function DailyView() {
  const [username, setUsername] = useState("guest");

  useEffect(() => {
    async function fetchUsername() {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Error retrieving username:", error);
      }
    }

    fetchUsername();
  }, []);

  // function WorkoutHistoryTabs() {
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen name="Weekly" component={WeeklyView} />
  //       <Tab.Screen name="Monthly" component={MonthlyView} />
  //     </Tab.Navigator>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Navbar username={username} />
      <Text style={styles.heading}>Consistency is Key</Text>
      <RoutineForm />
      {/* <WorkoutHistoryTabs /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#1b1b1b',
  },
});