
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import '../app/global.css'


const { width, height } = Dimensions.get('window');
console.log('Screen Dimensions:', width, height);
export default function Index() {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://github.com/user-attachments/assets/73e4ed6e-0dcf-404c-86f7-181313b25c81' }}
        style={styles.video}
        resizeMode="contain"
        muted
        repeat
      />
      <LinearGradient
        colors={['rgba(252,252,252, 0)', 'rgba(252,252,252, .35)']}
        style={styles.overlay}
        locations={[0, 1]}
      />
      <Image
        source={require('@/assets/images/lg.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.buttonContainer}>
        <View style={styles.topCard}>
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push('./loginForm')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('./RegisterUser')}>
            <Text style={styles.joinText}>Ready to JMPN? Join Now.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 5,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderRightWidth: 5,
  },
  topCard: {
    position: 'absolute',
    bottom: -130,
    backgroundColor: 'rgba(255,255,255, 0.95)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    padding: 40,
    alignItems: 'center',
    height: 200,
  },
  video: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',

  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    position: 'absolute',
    width: '50%',
    alignSelf: 'center',
    bottom: '30%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  signInButton: {
    backgroundColor: '#F9004C',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 30,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinText: {
    color: 'black',
    fontSize: 16,
  },
});
