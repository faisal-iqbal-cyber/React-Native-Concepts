import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

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

export default function SkillsScreen({ navigation  , route}) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { formData , role  } = route.params; 
  console.log(role)

  const toggleSkill = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter(skill => skill !== id));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, id]);
    } else {
      Alert.alert('Limit Reached', 'You can select up to 3 skills only.');
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
            <Text style={styles.logoMini}>Asaan</Text>
            <Text style={styles.logoMain}>Kaam</Text>
          </Text>
        
          <View style={styles.separator} />

       
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>SELECT ONE OR UPTO THREE SKILLS</Text>

        <FlatList
          data={skills}
          renderItem={renderSkillItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
        />

      
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (selectedSkills.length === 0) {
              Alert.alert('Selection Required', 'Please select at least one skill.');
              return;
            }
            const selectedSkillObjects = skills.filter(skill => selectedSkills.includes(skill.id));
            navigation.navigate('ExperienceScreen', {
              selectedSkills: selectedSkillObjects,
              formData: formData,
              role : role
            });
          }}
        >
          <Text style={styles.nextText}>NEXT</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>
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
  
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft:-230,
    color:'#4CAF50',
    marginBottom : 22
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 13,
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
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal:30,
    borderRadius: 30,
    marginVertical: 20,
    alignSelf: 'center',
   
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft : 20,
    fontSize: 18,
    marginRight : 190
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
   
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
  marginVertical: 10,
  width: '90%',
  alignSelf: 'center',
},
});
