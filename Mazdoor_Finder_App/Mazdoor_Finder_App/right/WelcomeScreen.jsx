// WelcomeScreen.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  return (

    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>
        <Text style={styles.logoMini}>Asaan</Text>
        <Text style={styles.logoMain}>Kaam</Text>
      </Text>

      {/* Heading */}
      <Text style={styles.heading}>Select Your Option</Text>

      {/* Button 1 */}
      <TouchableOpacity
        style={[styles.button, styles.greenButton]}
        onPress={() => navigation.navigate('SignUpScreen', { role: 'Worker' })}
      >
        <Text style={styles.buttonText}>Become Mazdoor & start earning</Text>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

      {/* Button 2 */}
      <TouchableOpacity
        style={[styles.button, styles.orangeButton]}
        onPress={() => navigation.navigate('SignUpScreen', { role: 'Customer' })}
      >
        <Text style={styles.buttonText}>Hire Mazdoor</Text>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:200,
    marginTop : -150,
  },
  logoMini: {
    fontSize: 12,
    color: '#444',
  },
  logoMain: {
    fontSize: 26,
    color: '#4CAF50',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop : -100,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
  greenButton: {
    backgroundColor: '#4CAF50',
  },
  orangeButton: {
    backgroundColor: '#FFA500',
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
});
