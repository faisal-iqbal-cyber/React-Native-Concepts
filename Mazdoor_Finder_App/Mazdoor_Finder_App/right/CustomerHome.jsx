import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const skills = [
  { id: '1', label: 'AC Installation', image: require('../../assets/images/AC_installation.jpg') },
  { id: '2', label: 'Plumber', image: require('../../assets/images/plumber.jpg') },
  { id: '3', label: 'Welder', image: require('../../assets/images/Welder.jpg') },
  { id: '4', label: 'App developer', image: require('../../assets/images/App_developer.jpg') },
  { id: '5', label: 'Camera installation', image: require('../../assets/images/Camera.jpg') },
  { id: '6', label: 'Carpenter', image: require('../../assets/images/carpenter.jpg') },
  { id: '7', label: 'Constructor', image: require('../../assets/images/constructor.jpg') },
  { id: '8', label: 'Electrician', image: require('../../assets/images/Electrician.jpg') },
  { id: '9', label: 'Driver', image: require('../../assets/images/driver.jpg') },
  { id: '10', label: 'Furniture Maker', image: require('../../assets/images/furniture.jpg') },
  { id: '11', label: 'Graphic Designer', image: require('../../assets/images/Graphic_designer.jpg') },
  { id: '12', label: 'Helper', image: require('../../assets/images/Helper.jpg') },
  { id: '13', label: 'Online Teacher', image: require('../../assets/images/online_teacher.jpg') },
  { id: '14', label: 'Painter', image: require('../../assets/images/Painter.jpg') },
  { id: '15', label: 'Shifting Services', image: require('../../assets/images/Shifting_Services.jpg') },
  { id: '16', label: 'Software developer', image: require('../../assets/images/Software_developer.jpg') },
  { id: '17', label: 'Steel fixer', image: require('../../assets/images/Steel_fixer.jpg') },
  { id: '18', label: 'Tile Mason', image: require('../../assets/images/Tile_mason.jpg') },
  { id: '19', label: 'Web Developer', image: require('../../assets/images/Web_developer.jpg') },
  { id: '20', label: 'Beautician', image: require('../../assets/images/beautician.jpg') },
  { id: '21', label: 'Glass Door Installer', image: require('../../assets/images/glassdoor.jpg') },
];

export default function CustomerScreen({ navigation }) {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills([]); // Deselect if already selected
    } else {
      setSelectedSkills([id]); // Select only the new skill, overriding previous
    }
  };

  const renderSkillItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.skillCard, selectedSkills.includes(item.id) && styles.selectedCard]}
      onPress={() => toggleSkill(item.id)}
    >
      <Image source={item.image} style={styles.skillImage} />
      <Text style={styles.skillLabel} numberOfLines={1}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.logo}>
          <Text style={{ color: '#4CAF50' }}>Asaan</Text>
          <Text style={{ color: '#555' }}>Kaam</Text>
        </Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
        </View>
        <Text style={styles.subtitle}>Services</Text>

        <FlatList
          data={skills}
          renderItem={renderSkillItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
        />
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 3 - 20;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    width: '90%',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#4CAF50',
    width: '70%',
    borderRadius: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 10,
  },
  grid: {
    paddingHorizontal: 10,
  },
  skillCard: {
    width: CARD_WIDTH,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#D1F0D1',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  skillImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  skillLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
});