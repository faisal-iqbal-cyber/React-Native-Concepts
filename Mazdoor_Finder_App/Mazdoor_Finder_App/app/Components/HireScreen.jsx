import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HireScreen({ route, navigation }) {
  const { workerName = 'Worker', mazdoorID, userID } = route.params;
  console.log('HireScreen params:', route.params); 

  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [preferredTime, setPreferredTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || preferredDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPreferredDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || preferredTime;
    setShowTimePicker(Platform.OS === 'ios');
    setPreferredTime(currentTime);
  };

  const generateRequestId = () => {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; 
  };

  const handleHireRequest = async () => {
    if (!problemDescription.trim()) {
      Alert.alert('Error', 'Please fill the problem description.');
      return;
    }

    if (!userID || !mazdoorID) {
      Alert.alert('Error', `Missing customer or worker ID. Customer ID: ${userID}, Worker ID: ${mazdoorID}`);
      return;
    }

    const requestId = generateRequestId();
    const hireRequestData = {
      workerName,
      mazdoorID,
      userID,
      problemDescription,
      preferredDate: preferredDate.toISOString(),
      preferredTime: preferredTime.toISOString(),
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    try {

      const customerResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${userID}/${requestId}.json`,
        {
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hireRequestData),
        }
      );
      const customerResult = await customerResponse.json();
      console.log('Customer HireRequest response - requestId:', requestId, customerResult);

      
      const workerResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${requestId}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userID,
            problemDescription,
            preferredDate: preferredDate.toISOString(),
            preferredTime: preferredTime.toISOString(),
            status: 'pending',
            timestamp: new Date().toISOString(),
          }),
        }
      );
      const workerResult = await workerResponse.json();
      console.log('Worker Request response - requestId:', requestId, workerResult);

      Alert.alert(
        'Request Sent',
        'Your hire request has been sent successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navigating to CustomerDashboard with:', { userID });
              navigation.navigate('CustomerDashboard', { userID });
            },
          },
        ]
      );
    } catch (error) {
      console.error('Hire request error:', error);
      Alert.alert('Error', 'Failed to send hire request. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainDiv}>
        <Text style={styles.logo}>
          <Text style={styles.logoMini}>Asaan</Text>
          <Text style={styles.logoMain}>Kaam</Text>
        </Text>

        <View style={styles.separator} />
        <Text style={styles.workerName}>Hire {workerName}</Text>

        <Text style={styles.label}>Problem Description</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., There is a leakage in the main water pipe..."
          value={problemDescription}
          onChangeText={setProblemDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Preferred Date</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dateInput}
            value={preferredDate.toLocaleDateString('en-US')}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.iconButton}
          >
            <Text style={styles.icon}>📅</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={preferredDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.label}>Preferred Time</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dateInput}
            value={preferredTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.iconButton}
          >
            <Text style={styles.icon}>⏰</Text>
          </TouchableOpacity>
        </View>
        {showTimePicker && (
          <DateTimePicker
            value={preferredTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity style={styles.hireButton} onPress={handleHireRequest}>
          <Text style={styles.hireButtonText}>Send Hire Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  mainDiv: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  logo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
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
    marginBottom: 30,
  },
  workerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a31a6',
    marginBottom: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    height: 70,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  dateInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    fontSize: 20,
    color: '#555',
  },
  hireButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  hireButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});