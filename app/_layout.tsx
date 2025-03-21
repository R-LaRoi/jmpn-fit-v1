import { Stack } from "expo-router";
import UserProvider from './components/username';
export default function RootLayout() {


  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Weekly" />
        <Stack.Screen name="Monthly" />
      </Stack>
    </UserProvider>

  )
}
