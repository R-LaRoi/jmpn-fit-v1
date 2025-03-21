import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


interface AvatarWithTextProps {
  source: any;
  text: string;
  target: string;
}

function AvatarWithText({ source, text, target }: AvatarWithTextProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(target)} style={styles.avatarWrapper}>
      <Image source={source} style={styles.logo} resizeMode="cover" />
      <Text style={styles.avatarText}>{text}</Text>
    </TouchableOpacity>
  );
}
export default function AvatarTabs() {
  return (
    <View style={styles.avatarContainer}>
      <AvatarWithText source={require('@/assets/images/jmpn.jpg')} text="daily" target="dailyView" />
      <AvatarWithText source={require('@/assets/images/jmpn.jpg')} text="weekly" target="weeklyView" />
      <AvatarWithText source={require('@/assets/images/jmpn.jpg')} text="monthly" target="monthlyView" />
    </View>
  )
}


const styles = StyleSheet.create({

  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: 'white',
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
  avatarWrapper: {
    alignItems: 'center',

    padding: 1,
    marginHorizontal: 5,
  },
  avatarText: {
    marginTop: 5,
    fontSize: 14,
  },
});