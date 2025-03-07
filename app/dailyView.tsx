
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WeeklyView from "./(tabs)/weeklyView";
WeeklyView
import MonthlyView from "./(tabs)/monthlyView";
import RoutineForm from "./components/routineForm";
import Logout from "./components/logoutButton";
const Tab = createMaterialTopTabNavigator();

export default function DailyView() {


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
      <Text>user name</Text>
      <Text>what did you do today?</Text>
      <RoutineForm />

    </View>
  )
}