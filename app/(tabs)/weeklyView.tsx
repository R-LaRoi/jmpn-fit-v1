import { View, Text } from "react-native";
import React from 'react';
import AvatarTabs from "../components/avatarTabs";
import Navbar from "../components/nav";
import { activeUser } from '../components/username';
export default function WeeklyView() {
  const { username } = activeUser();

  return (
    <View>
      <Navbar username={username} />
      <AvatarTabs />
      <Text>Weekly View</Text>
      <div> name</div>
      <ul><li>sun</li><li>mon</li><li></li></ul>
    </View>
  );
}