import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditMazdoor({ route }) {
  const { userID } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${userID}.json`
        );
        const data = await response.json();

        if (data) {
          setName(data.name || '');
          setEmail(data.email || '');
          setContact(data.mobile || '');
          setLocation(data.location || '');
          if (data.profileImageURL) {
            setProfileImage({ uri: data.profileImageURL });
          } else {
            setProfileImage(require('../../assets/images/Work.png'));
          }
        } else {
          Alert.alert('No Data', 'Customer data not found.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch customer data.');
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

 
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to your media library.');
      }
    })();
  }, []);

  const handleChangePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setProfileImage({ uri });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to open media library.');
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        name,
        email,
        contact,
        location,
        profileImageURL: profileImage?.uri || '',
      };

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${userID}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F7FA' }}>
      <View style={styles.imagePicker}>
        <Image
          source={profileImage}
          style={styles.profilePic}
        />
        <TouchableOpacity onPress={handleChangePicture} style={styles.ChangeProfile}>
          <MaterialIcons name="photo-camera" size={18} color="#000" style={{ marginRight: 8, marginLeft: 13, marginTop: 10 }} />
          <Text style={styles.changePicText}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#eee', color: '#888' }]}
            value={name}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#eee', color: '#888' }]}
            value={email}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            placeholder="Enter your contact"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location / Address</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Lahore, Pakistan"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#F4F7FA',
  },
  imagePicker: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  ChangeProfile: {
    height: 40,
    width: 190,
    backgroundColor: '#a5e8d0',
    borderRadius: 20,
  },
  changePicText: {
    color: 'black',
    marginTop: -20,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 18,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});