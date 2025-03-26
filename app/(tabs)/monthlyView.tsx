import { View, Text } from "react-native";
import AvatarTabs from "../components/avatarTabs";
import Navbar from "../components/nav";
import { activeUser } from '../components/username';
import ShowMonthlyRoutines from "../components/showMonthly";

export default function MonthlyView() {
  const { username } = activeUser();

  return (
    <View>
      <Navbar username={username} />
      <AvatarTabs />
      <ShowMonthlyRoutines />
    </View>
  );
}