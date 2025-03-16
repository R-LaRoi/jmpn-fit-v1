import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import LoginForm from "./loginForm";
import CreateAccount from "./RegisterUser";
import '../app/global.css'

export default function Index() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={styles.container}>
      {showLogin ? <LoginForm /> : <CreateAccount />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: '100%',
    // borderColor: 'black',

  },



});