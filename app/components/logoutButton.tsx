import { View, Text, Alert } from "react-native";

import { router } from "expo-router";
export default function LogoutButton() {

  function logout() {
    console.log('logging out')

    Alert.alert('Success', 'Logout successful!');
    router.replace('../loginForm')
  }


  return (
    <View>
      <Text onPress={logout}>Logout</Text>
    </View>
  );
}