import { View, Text } from "react-native";
import AvatarTabs from "../components/avatarTabs";
import Navbar from "../components/nav";
import { activeUser } from '../components/username';

export default function MonthlyView() {
  const { username } = activeUser();

  return (
    <View>
      <Navbar username={username} />
      <AvatarTabs />
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