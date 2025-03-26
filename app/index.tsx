import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, Animated } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import '../app/global.css';

const { width, height } = Dimensions.get('window');
console.log('Screen Dimensions:', width, height);

export default function Index() {
  const logoScale = useRef(new Animated.Value(0.5)).current; // Start small
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(100)).current; // Start off-screen
  const buttonsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo Animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Buttons Animation
      Animated.parallel([
        Animated.timing(buttonsTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);


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
        colors={['rgba(27, 28, 29, .7)', 'rgba(27, 28, 29, 0.7)', '#1B1C1D']}
        style={[styles.overlay, { zIndex: 1 }]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Animated.Image
        source={require('@/assets/images/lg.png')}
        style={[styles.logo, { transform: [{ scale: logoScale }], opacity: logoOpacity, zIndex: 2 }]}
        resizeMode="contain"
      />


      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonsTranslateY }], opacity: buttonsOpacity, zIndex: 3 }]}>
        <View >
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push('./loginForm')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('./RegisterUser')}>
            <Text style={styles.joinText}>Ready to JMPN? Join Now.</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
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
    bottom: 90,
    width: '100%',
    alignItems: 'center',
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
    color: 'white',
    fontSize: 16,
  },
});