import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeeklyView from "./(tabs)/weeklyView";
WeeklyView
import MonthlyView from "./(tabs)/monthlyView";
import RoutineForm from "./components/routineForm";
import Logout from "./components/logoutButton";
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


  function WorkoutHistoryTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Weekly" component={WeeklyView} />
        <Tab.Screen name="Monthly" component={MonthlyView} />

      </Tab.Navigator>
    );
  }


  return (

    <View>
      <Logout />
      <Text>{username}</Text>
      <Text>what did you do today?</Text>
      <RoutineForm />

    </View>
  )
}



