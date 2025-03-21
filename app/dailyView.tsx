
import React from "react";
import { View, StyleSheet, } from "react-native";
import RoutineForm from "./components/routineForm";
import Navbar from "./components/nav";
import AvatarTabs from "./components/avatarTabs";
import { activeUser } from './components/username';


export default function DailyView() {
  const { username } = activeUser();
  return (
    <View style={styles.container}>
      <Navbar username={username} />
      <AvatarTabs />
      <RoutineForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },


  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',

  },
  logo: {

    width: 86,
    height: 86,
    borderRadius: 70,
    marginHorizontal: 9,
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'gray',

  },

});