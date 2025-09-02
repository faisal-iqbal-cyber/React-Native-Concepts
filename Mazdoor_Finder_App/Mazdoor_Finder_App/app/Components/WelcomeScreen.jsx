import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  return (

    <View style={styles.container}>
      <Text style={styles.logo}>
          <Text style={styles.logoMini}>Asaan</Text>
          <Text style={styles.logoMain}>Kaam</Text>
        </Text>

        <View style={styles.separator} />



      <Text style={styles.heading}>Select Your Option</Text>

      <TouchableOpacity
        style={[styles.button, styles.greenButton]}
        onPress={() => navigation.navigate('SignUpScreen', { role: 'Worker' })}
      >
        <Text style={styles.buttonText}>Become Mazdoor & start earning</Text>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

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
    textAlign: 'center',
    marginTop : -150
  },
  logoMini: {
    fontSize: 16,
    color: '#333',
   
  },
  logoMain: {
    fontSize: 27,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginBottom: 55,
    marginTop : 10
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginTop : 60,
    marginBottom: 20,
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
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
 
});
