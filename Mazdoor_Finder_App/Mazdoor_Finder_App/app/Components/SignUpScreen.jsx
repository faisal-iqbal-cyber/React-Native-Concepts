import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen({ navigation, route }) {
  const { role } = route.params;

  const [nic, setNIC] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [workerFormData, setWorkerFormData] = useState(null);
  const [userID, setUserID] = useState(null); 

  const handleNICInput = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 13);
    let formatted = '';
    if (cleaned.length <= 5) {
      formatted = cleaned;
    } else if (cleaned.length <= 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    } else {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12)}`;
    }
    setNIC(formatted);
  };

  const handleMobileInput = (text) => {
    let cleaned = text.replace(/\D/g, '').slice(0, 11);
    let formatted = '';
    if (cleaned.length <= 4) {
      formatted = cleaned;
    } else {
      formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    }
    setContact(formatted);
  };

  async function handleSignUp() {
    if (!email || !nic || !name || !contact || !location || !password || !confirmPassword) {
      setError('Please fill out all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., abc@example.com).');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must be the same.');
      return;
    }
    if(!image){
      setError('Please upload the image.');
      return;
    }
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTwhzFrKQXneKoRHpSVotCMoiDe3Q3uz4',
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
        setError(result.error.message || 'Signup failed.');
        return;
      }
      const firebaseUserID = result.localId;
      setUserID(firebaseUserID); 
      const imagePath = image || null;

      if (role === 'Customer') {
        const customerData = {
          name,
          email,
          location,
          contact,
          cnic: nic,
          role,
          image: imagePath,
        };

        await fetch(`https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/${firebaseUserID}.json`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });

        setError('');
        setModalVisible(true);
      } else if (role === 'Worker') {
        const workerData = {
          name,
          email,
          location,
          contact,
          cnic: nic,
          role,
          image,
          uid: firebaseUserID,
        };
        setWorkerFormData(workerData);
      }

      setError('');
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);

      try {
        const imageName = `profile_${Date.now()}.jpg`;
        const imageDir = `${FileSystem.documentDirectory}profile_images/`;

        await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
        
        const newPath = `${imageDir}${imageName}`;
        await FileSystem.moveAsync({
          from: imageUri,
          to: newPath,
        });
        
        setImage(newPath);
      } catch (error) {
        console.error('Error saving image:', error);
        Alert.alert('Error', 'Failed to save image');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={styles.centeredDiv}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10, fontSize: 17 }}>Signup Successfully</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(false);
                setTimeout(() => {
                  if (role === 'Customer') {
                    navigation.navigate('CustomerDashboard', { userID, role  }); 
                  } else if (role === 'Worker') {
                    navigation.navigate('SkillsScreen', { formData: workerFormData  , role : role });
                  }
                }, 700);
              }}
            >
              <Text style={{ color: '#112f91', marginLeft: 30, fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logo}>
          <Text style={styles.logoMini}>Asaan</Text>
          <Text style={styles.logoMain}>Kaam</Text>
        </Text>

        <View style={styles.separator} />

        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subHeading}>Personal Info</Text>
        <Text style={styles.note}>
          Your NIC Number and Mobile Number will not be visible to anyone else
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Full Name" value={name} maxLength={30} onChangeText={setName} />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email (abc@exmaple.com) "
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="NIC No. (XXXXX-XXXXXXX-X)"
            value={nic}
            maxLength={15}
            onChangeText={handleNICInput}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mobile No. (03XX-XXXXXXX)"
            maxLength={12}
            value={contact}
            onChangeText={handleMobileInput}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Entypo name="location-pin" size={20} color="red" style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Current Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            maxLength={8}
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

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            maxLength={8}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <MaterialIcons
              name={confirmPasswordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
          <Text style={styles.uploadText}>Upload Image</Text>
          <View style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>UPLOAD IMAGE</Text>
            <MaterialIcons name="add-photo-alternate" size={18} color="#fff" style={{ marginLeft: 5 }} />
          </View>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 10, borderRadius: 10 }}
          />
        )}

        <View style={{ marginBottom: 30 }} />
      </ScrollView>

      <View style={styles.fixedBottom}>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.confirmButton} onPress={handleSignUp}>
          <Text style={styles.confirmText}>CONFIRM</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen', { role })}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { role })}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles remain unchanged
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 20,
  },
  fixedBottom: {
    paddingHorizontal: 20,
    paddingBottom: 70,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  logoMini: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  logoMain: {
    fontSize: 27,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4CAF50',
  },
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9CFFD',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  uploadText: {
    fontSize: 16,
    color: '#555',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#6200EE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: '#fff',
  },
  loginText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 20,
    fontSize: 19,
    textDecorationLine: 'underline',
  },
  forgotText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 18,
    textDecorationLine: 'underline',
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
    marginLeft: 15,
  },
});