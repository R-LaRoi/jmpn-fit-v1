import { View, Text } from "react-native";
import MonthlyView from "../(tabs)/monthlyView";
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
export default function WeeklyView() {


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
      <Text>Weekly View</Text>
      <div> name</div>
      <ul><li>sun</li><li>mon</li><li></li></ul>
    </View>
  );
}