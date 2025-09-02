import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View , Modal , Button} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [modalvisible , setModalVisible] = useState(false)

  const handleMobileInput = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '').slice(0, 11);
    if (!cleaned.startsWith('03')) {
      cleaned = '03' + cleaned.replace(/^03/, '');
    }
    let formatted = cleaned.replace(/(03\d{2})(\d{7})?/, (match, p1, p2) =>
      p2 ? `${p1}-${p2}` : p1
    );
    setMobile(formatted);
  };

  const handleSubmit = () => {
    if (!mobile || !otp) {
      setError('Please enter all the required fields.');
    } else {
      setError('');
      setModalVisible(true); 
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>

      <Modal animationType='slide' visible = {modalvisible} transparent = {true}>
        <View style = {styles.centeredDiv}>
          <View style = {styles.modalView}>
            <Text>Password updated successfully</Text>
            <Button title = "close" onPress= {()=>setModalVisible(false)}/>

          </View>
        </View>

      </Modal>
      <Text style={styles.logo}>
        <Text style={styles.logoMini}>Asaan</Text>
        <Text style={styles.logoMain}>Kaam</Text>
      </Text>

      <View style={styles.separator} />

      <Text style={styles.heading}>Forgot Password</Text>


      <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          maxLength={12}
          value={mobile}
          placeholder="03XXXXXXXXXX"
          keyboardType="phone-pad"
          onChangeText={handleMobileInput}
        />
      </View>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Generate OTP</Text>
      </TouchableOpacity>

   
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="OTP Code"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}


      <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    alignItems: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: -70,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    width: '50%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
  SubmitButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    width: '100%',
    marginBottom: 20,
    marginTop: 15,
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
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

modalView:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 35,
}
});
