import { LinearGradient } from 'expo-linear-gradient'; // Ensure expo-linear-gradient is installed
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <LinearGradient
      colors={['#E0F7FA', '#B2DFDB']}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.asaanText}>Asaan</Text>
          <Text style={styles.kaamText}>Kaam</Text>
        </Animated.View>
      </View>
      <Animated.View style={{ transform: [{ translateY: slideAnim }], opacity: fadeAnim }}>
        <Text style={styles.welcomeText}>Your professional workspace is ready!</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  asaanText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Arial',
    marginRight: 2,
  },
  kaamText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#008000',
    fontFamily: 'Arial',
  },
  welcomeText: {
    fontSize: 18,
    color: '#424242',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SplashScreen;
