import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import LoginForm from "./loginForm";
import CreateAccount from "./components/RegisterUser";
import { globalStyles } from "./globalStyles";

export default function Index() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={styles.container}>
      {showLogin ? <LoginForm /> : <CreateAccount />}

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => setShowLogin(!showLogin)}
      >
        <Text style={globalStyles.buttonText}>
          {showLogin ? "Create Account" : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },



});