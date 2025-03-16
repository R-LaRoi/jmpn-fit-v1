import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';



const { width, height } = Dimensions.get('window');
export default function loginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const videoRef = useRef(null);

  function loginUser() {
    const { width, height } = Dimensions.get('window');
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };

    console.log('Logging in with:', email, password);
    axios.post('http://localhost:8000/login-user', userData).then(res => {
      console.log(res.data);

      if (res.data.status == 'ok') {
        Alert.alert('Logged In Successfull');
        AsyncStorage.setItem('token', res.data.data);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        AsyncStorage.setItem('userType', res.data.userType)
        AsyncStorage.setItem('username', res.data.username);
        AsyncStorage.setItem('userId', res.data.userId);
        console.log('userId stored:', res.data.userId);
        router.replace('./dailyView');

      }
    });
  }
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'data');

  }
  useEffect(() => {
    getData();
    console.log("logged in");
  }, [])



  return (
    <>

      <Video
        source={({ uri: 'https://github.com/user-attachments/assets/73e4ed6e-0dcf-404c-86f7-181313b25c81' })}
        style={styles.video}
        resizeMode="contain"
        muted={true}
        repeat={true}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch="ignore"
      />
      {/* <View style={styles.overlay}>
        <Text style={styles.overlayText}>JMPN</Text>
      </View> */}
      {/* <Image
        source={require('@/assets/images/jmpn.jpg')}
        style={styles.image}
        resizeMode="cover"
      /> */}
      <Image
        source={require('@/assets/images/lg.png')}
        style={styles.image2}
        resizeMode="contain"
      />
      {/* 249,0,76 */}
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={styles.gradient}
        locations={[0.3, 1]} />
      <LinearGradient
        colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
        style={styles.gradient2}
        locations={[0.2, 1]} />

      <View style={styles.formContainer}>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.joinNowLink}
          onPress={() => router.replace('./RegisterUser')}
        >
          <Text style={styles.joinNowText}>Ready to JMPN? Join Now.</Text>
        </TouchableOpacity>
      </View>

    </>

  );

}

const styles = StyleSheet.create({
  video: {
    width: '100%',


  },
  // image: {
  //   width: '100%',
  //   height: '100%',
  //   position: 'absolute',
  //   borderRadius: 35,
  //   borderColor: 'white',
  //   borderWidth: 15,

  // },
  image2: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },


  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 96,
    fontWeight: 'bold',

  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    zIndex: 1,
  },
  gradient2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    zIndex: 1,
  },

  contentContainer: {
    borderColor: 'black',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 9,
  },
  messageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  subheadingText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    width: 50,
    height: 3,
    backgroundColor: '#8BC34A',
    marginVertical: 10,
  },
  formContainer: {
    width: '85%',
    marginTop: 600,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',

  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#292929',
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 15,

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#292929',
    padding: 10,
  },
  joinNowLink: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  joinNowText: {
    color: 'whitesmoke',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  }

});