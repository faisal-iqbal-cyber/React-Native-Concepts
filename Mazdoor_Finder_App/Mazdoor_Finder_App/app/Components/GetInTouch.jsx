import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, } from 'react-native';

const GetInTouch = ({ navigation, route }) => {
  const { userID, role } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [focusedInput, setFocusedInput] = useState(null); 
  console.log('Role in get in touch screen', role);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!userID) {
      Alert.alert('Error', 'User ID is missing. Please try again.');
      return;
    }

    try {
      const submission = {
        name,
        email,
        message,
        timestamp: Date.now(),
      };

      const timestampKey = Date.now().toString();
      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/GetInTouch/${userID}/${timestampKey}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save data to the database.');
      }

      console.log('Submission saved:', submission, 'User ID:', userID);

      Alert.alert(
        'Thank You',
        'Your message has been submitted!',
        [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setEmail('');
              setMessage('');
              if (role === 'Customer') {
                navigation.navigate('CustomerDashboard', { userID, role });
              } else if (role === 'Worker') {
                navigation.navigate('Dashboard', { mazdoorID: userID, role });
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error saving submission:', error);
      Alert.alert('Error', 'Failed to submit your message. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Get In Touch</Text>
        <Text style={styles.description}>
          Have any questions, concerns, or feedback about our services? We’d love to hear from you!
        </Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="#757575"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="#757575"
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          placeholder="Write your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          style={[styles.input, styles.textArea, focusedInput === 'message' && styles.inputFocused]}
          onFocus={() => setFocusedInput('message')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="#757575"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GetInTouch;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00695C', 
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575', 
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'black', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: 'black', 
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});