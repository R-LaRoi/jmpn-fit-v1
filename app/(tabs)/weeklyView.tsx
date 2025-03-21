import { View, Text } from "react-native";
import React from 'react';
import AvatarTabs from "../components/avatarTabs";
import Navbar from "../components/nav";
import { activeUser } from '../components/username';
import ShowRoutines from "../components/showRoutines";
export default function WeeklyView() {
  const { username } = activeUser();

  return (
    <View>
      <Navbar username={username} />
      <AvatarTabs />
      <ShowRoutines />
    </View>
  );
}