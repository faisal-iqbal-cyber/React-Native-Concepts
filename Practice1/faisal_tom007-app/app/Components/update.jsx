import React, { useState } from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet } from 'react-native';



function update() {
  return (
    <View style={styles.container}>
       <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Update Product</Text>      
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your email'
          placeholderTextColor='gray'
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your password'
          placeholderTextColor='gray'
          secureTextEntry
        />

        <Button title='Submit' onPress={() => setVisibleModal(true)} />
      </View>
    </View>
  )
}

export default update
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#ddd',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
});
