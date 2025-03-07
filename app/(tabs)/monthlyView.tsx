import { View, Text } from "react-native";
import WeeklyView from '../(tabs)/weeklyView';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


export default function MonthlyView() {

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

      <Text>Monthly View</Text>
      <div> name</div>
      <ul>
        <li>mar</li>
        <li>feb</li>
        <li>jan</li>
      </ul>
    </View>
  );
}