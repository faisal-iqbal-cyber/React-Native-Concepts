// SignUpScreen.js
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [nic, setNIC] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [modalvisible , setModalVisible] = useState(false);


  const handleNICInput = (text) => {
    let formatted = text
      .replace(/[^0-9]/g, '')
      .slice(0, 13)
      .replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
    setNIC(formatted);
  };

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

  const handleSignUp = () => {
    if (!nic || !name || !mobile || !location || !password || !confirmPassword) {
      setError('Please fill out all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must be the same.');
      return;
    }

    setError('');
    setModalVisible(true); 
    navigation.navigate('SkillsScreen')
  
  };

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
      setImage(result.assets[0].uri);
    }
  };

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Location permission is needed to continue');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    let addressList = await Location.reverseGeocodeAsync(loc.coords);

    if (addressList.length > 0) {
      let addr = addressList[0];
      let formattedLocation = `${addr.city || addr.subregion}, ${addr.region}, ${addr.country}`;
      setLocation(formattedLocation);
    } else {
      setLocation('Location not found');
    }
  };

  return (


    <View style={styles.wrapper}>

       <Modal animationType='slide' visible = {modalvisible} transparent = {true}>
            <View style = {styles.centeredDiv}>
                <View style = {styles.modalView}>
                    <Text>SignUp successfully</Text>
                    <Button title = "Close" onPress = {()=>setModalVisible(false)}/>
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
          <TextInput
            style={styles.input}
            placeholder="NIC No. (XXXXX-XXXXXXX-X)"
            value={nic}
            onChangeText={handleNICInput}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mobile No. (03XX-XXXXXXX)"
            maxLength={12}
            value={mobile}
            onChangeText={handleMobileInput}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={fetchLocation}>
            <Entypo name="location-pin" size={20} color="red" style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Current Location - tap red icon to pick"
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

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    fontSize: 14,
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
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
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
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
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
    fontSize: 16,
  },
  forgotText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 16,
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
},
});
