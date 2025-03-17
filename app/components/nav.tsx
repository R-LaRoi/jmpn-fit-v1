// // components/Navbar.js
// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import Logout from './logoutButton';

// export default function Navbar({ username }: { username: string }) {
//   return (
//     <View style={styles.navbar}>
//       <Image
//         source={require('@/assets/images/lg.png')}
//         style={styles.logo}
//         resizeMode="contain"
//       />
//       <Text style={styles.username}>{username}</Text>
//       <Logout />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navbar: {
//     marginTop: -20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#1b1b1b',
//     // borderBottomWidth: .5,
//     // borderBottomColor: '#ddd',

//   },
//   logo: {
//     width: 50,
//     height: 50,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',

//   },
// });