
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logout from './logoutButton';

export default function Navbar({ username }: { username: string }) {
  return (
    <View style={styles.navbar}>
      <Logout />
      <Image
        source={require('@/assets/images/bl.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.username}>{username}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: .5,
    borderBottomColor: '#ddd',

  },
  logo: {
    width: 80,
    height: 80,
    marginTop: -30,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292929',
    textTransform: 'capitalize',

  },
});