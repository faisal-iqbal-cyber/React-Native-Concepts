import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GetInTouch from './GetInTouch';
import RequestsByCustomer from './RequestsByCustomer';

const Tab = createBottomTabNavigator();

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

const ServicesTab = ({ navigation, route }) => {
  const { userID  , role} = route.params;
  console.log('ServicesTab params:', route.params); 

  const handleSkillPress = (id, label) => {
    navigation.navigate('MazdoorDetails', { skillId: id, skillLabel: label, userID: userID });
  };

  const renderSkillItem = ({ item }) => (
    <TouchableOpacity
      style={styles.skillCard}
      onPress={() => handleSkillPress(item.id, item.label)}
    >
      <Image source={item.image} style={styles.skillImage} />
      <Text style={styles.skillLabel} numberOfLines={1}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
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
};

export default function CustomerHome({ route }) {
  const { userID , role } = route.params;
  console.log('CustomerHome params:', userID , role); 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4CAF50', 
        tabBarInactiveTintColor: '#00695C', 
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
        tabBarStyle: { backgroundColor: '#F5F7FA' }, 
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Services') {
            iconName = 'construct-outline'; 
          } else if (route.name === 'Requests') {
            iconName = 'list-outline'; 
          } else if (route.name === 'Get in Touch') {
            iconName = 'mail-outline'; 
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Services"
        component={ServicesTab}
        initialParams={{ userID }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsByCustomer}
        initialParams={{ userID }}
      />
      <Tab.Screen
        name="Get in Touch"
        component={GetInTouch}
        initialParams={{ userID  , role}}
      />
    </Tab.Navigator>
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
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#00695C',
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
  skillImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  skillLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
  },
});