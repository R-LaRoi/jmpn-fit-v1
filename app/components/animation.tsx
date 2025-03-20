import React, { useEffect, useRef } from 'react';

import { View, Image, Text, StyleSheet, Animated, Easing } from 'react-native';

export default function Animation() {
  const text = "constistency is key ";
  const spinValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });



  return (
    <View style={styles.circle}>
      <Image
        source={{ uri: 'https://assets.codepen.io/7344750/internal/avatars/users/default.png' }}
        style={styles.logo}
        resizeMode="cover"
      />
      <Animated.View style={[styles.textContainer, { transform: [{ rotate: spin }] }]}>
        {text.split("").map((char, i) => (
          <Text
            key={i}
            style={[
              styles.textSpan,
              {
                transform: [
                  { rotate: `${(i * 360) / text.length}deg` },
                  { translateY: -80 },
                ],
              },
            ]}
          >
            {char}
          </Text>
        ))}
      </Animated.View >
    </View>

  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSpan: {
    position: 'absolute',
    fontSize: 16,
    color: '#f9004c',
    fontFamily: 'Arial',


  },
});
