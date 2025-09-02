import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [storeUID, setStoreUID] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter all the required fields.');
      return;
    }

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTwhzFrKQXneKoRHpSVotCMoiDe3Q3uz4',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        setError(result.error.message || 'Login failed.');
        return;
      }

      const userUID = result.localId;
      setStoreUID(userUID);

      const dataPath = role === 'Customer'
        ? `Customer/${userUID}.json`
        : `Worker/${userUID}.json`;

      const userDataResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/${dataPath}`
      );
      const userData = await userDataResponse.json();

      if (!userData) {
        setError('User profile not found in the database.');
        return;
      }

      setError('');
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Modal animationType='slide' visible={modalVisible} transparent={true}>
        <View style={styles.centeredDiv}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10, fontSize: 17 }}>Login Successfully</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setTimeout(() => {
                  setModalVisible(false);
                  if (role === 'Customer') {
                    console.log('Navigating to CustomerDashboard with userID:', storeUID , role);
                    navigation.navigate('CustomerDashboard', { userID: storeUID , role :  role});
                  } else if (role === 'Worker') {
                    navigation.navigate('WorkerDashboard', { mazdoorID: storeUID  , role :  role });
                  }
                }, 100);
              }}
            >
              <Text style={{ color: '#112f91', fontWeight: 'bold', marginLeft: 30, fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.logo}>
        <Text style={styles.logoMini}>Asaan</Text>
        <Text style={styles.logoMain}>Kaam</Text>
      </Text>

      <View style={styles.separator} />
      <Text style={styles.heading}>Login</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email (abc@example.com)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          maxLength={8}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialIcons
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>or</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen', { role })}>
        <Text style={styles.registerText}>Register here</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { role })}>
        <Text style={styles.forgotText}>Forgot Password</Text>
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
    alignItems: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: -140,
  },
  logoMini: {
    fontSize: 14,
    color: '#444',
  },
  logoMain: {
    fontSize: 27,
    color: '#4CAF50',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
  },
  orContainer: {
    marginVertical: 2,
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginTop: -10,
    marginBottom: 5,
  },
  registerText: {
    fontSize: 16,
    color: '#4CAF50',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 15,
    color: '#FF0000',
    textDecorationLine: 'underline',
  },
  separator: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginBottom: 40,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    marginTop: -30,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  centeredDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 27,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  modalCloseButton: {
    padding: 10,
    marginLeft: 10,
  },
});