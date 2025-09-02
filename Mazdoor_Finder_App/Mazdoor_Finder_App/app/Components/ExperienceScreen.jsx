import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function ExperienceScreen({ route, navigation }) {
  const { formData, selectedSkills  , role} = route.params;
  console.log('In Experoinece screen ' , role)

 
  if (!formData?.uid) {
    Alert.alert('Error', 'User ID is missing. Please log in again.');
    navigation.navigate('Login'); 
    return null; 
  }

  const [experience, setExperience] = useState({});
  const [hoursPerRate, setHoursPerRate] = useState({});
  const [images, setImages] = useState({});
  const [aboutWork, setAboutWork] = useState({});

  const handleExperienceChange = (id, value) => {
    setExperience({ ...experience, [id]: value });
  };

  const handleHoursPerRateChange = (id, value) => {
    setHoursPerRate({ ...hoursPerRate, [id]: value });
  };

  const handleAboutWorkChange = (id, value) => {
    setAboutWork({ ...aboutWork, [id]: value });
  };

  const pickImage = async (id) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => {
        const existing = prevImages[id] || [];
        const combined = [...existing, ...selectedUris];
        const unique = [...new Set(combined)];

        if (unique.length > 3) {
          Alert.alert('Limit Reached', 'You can only select a maximum of 3 images.');
          return {
            ...prevImages,
            [id]: unique.slice(0, 3),
          };
        }

        return {
          ...prevImages,
          [id]: unique,
        };
      });
    }
  };

  const removeImage = (id, indexToRemove) => {
    setImages((prevImages) => {
      const updatedImages = prevImages[id].filter((_, idx) => idx !== indexToRemove);
      return { ...prevImages, [id]: updatedImages };
    });
  };

  const handleSubmit = async () => {
    if (!formData.uid) {
      Alert.alert('Error', 'User ID is missing. Please log in again.');
      navigation.navigate('LoginScreen');
      return;
    }

    const workerSkillsData = selectedSkills.map((skill) => ({
      id: skill.id,
      skillName: skill.label,
      experience: experience[skill.id] || '',
      ratePerHour: hoursPerRate[skill.id] || '',
      aboutWork: aboutWork[skill.id] || '',
      images: images[skill.id] || [],
    }));

  
    const { uid, ...formDataWithoutUid } = formData;

    const finalData = {
      ...formDataWithoutUid,
      email: formData.email || 'Unknown',
      skills: workerSkillsData,
    };

    try {
      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${formData.uid}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        }
      );

      if (response.ok) {
        Alert.alert(
          'Success',
          'Data submitted successfully.',
          [
            {
              text: 'Close',
              onPress: () => navigation.navigate('WorkerDashboard' , { mazdoorID: formData.uid  , role : role}),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to submit data.');
      }
    } catch (error) {
      console.error('Firebase Error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>
        <Text style={styles.logoMini}>Asaan</Text>
        <Text style={styles.logoMain}>Kaam</Text>
      </Text>

      <View style={styles.separator} />
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.title}>YOUR EXPERIENCE</Text>

      {selectedSkills.map((skill, index) => (
        <View key={index} style={styles.skillBlock}>
          <Text style={styles.skillTitle}>{skill.label}</Text>

          <Text style={styles.label}>Experience in this field (in years):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="e.g., 3"
            value={experience[skill.id] || ''}
            onChangeText={(text) => handleExperienceChange(skill.id, text)}
          />

          <Text style={styles.label}>Hourly Rate:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="e.g., 1000"
            value={hoursPerRate[skill.id] || ''}
            onChangeText={(text) => handleHoursPerRateChange(skill.id, text)}
          />

          <Text style={styles.label}>About your work:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g., Describe your work experience..."
            value={aboutWork[skill.id] || ''}
            onChangeText={(text) => handleAboutWorkChange(skill.id, text)}
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Sample Images of Your Work (max 3):</Text>
          <TouchableOpacity style={styles.uploadContainer} onPress={() => pickImage(skill.id)}>
            <View style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>UPLOAD IMAGE</Text>
              <Text style={{ marginLeft: 5, marginBottom: 5 }}>📷</Text>
            </View>
          </TouchableOpacity>

          {images[skill.id]?.length > 0 && (
            <View style={styles.imagePreviewRow}>
              {images[skill.id].map((img, idx) => (
                <View key={idx} style={styles.imageContainer}>
                  <Image source={{ uri: img }} style={styles.previewImage} />
                  <TouchableWithoutFeedback onPress={() => removeImage(skill.id, idx)}>
                    <Text style={styles.removeIcon}>❌</Text>
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextText}>NEXT</Text>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
    marginBottom: 15,
    color: 'green',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 12,
  },
  skillBlock: {
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5817d1',
    marginBottom: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    marginTop: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#74848a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 110,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imagePreviewRow: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  removeIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'red',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 40,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 190,
    fontSize: 16,
    marginLeft: -0,
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
  },
});