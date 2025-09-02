import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MazdoorDetail = () => {
  const [searchCity, setSearchCity] = useState('');
  const [mazdoors, setMazdoors] = useState([]);

  // Sample mazdoor data with random cities
  useEffect(() => {
    const sampleMazdoors = [
      { id: '1', name: 'Faisal Iqbal', rating: 4.7, skills: ['Plumbing', 'Repair'], image: require('../../assets/images/ahmed.jpg'), city: 'Karachi' },
      { id: '2', name: 'Fatima Bibi', rating: 4.5, skills: ['Electrical', 'Wiring'], image: require('../../assets/images/fatima.png'), city: 'Lahore' },
      { id: '3', name: 'Zain Malik', rating: 4.9, skills: ['Carpentry', 'Furniture'], image: require('../../assets/images/zain.jpg'), city: 'Islamabad' },
      { id: '4', name: 'Ayesha Khan', rating: 4.6, skills: ['Painting', 'Decor'], image: require('../../assets/images/ayesha.jpg'), city: 'Multan' },
      { id: '5', name: 'Omar Farooq', rating: 4.8, skills: ['Construction', 'Masonry'], image: require('../../assets/images/omar.jpg'), city: 'Rawalpindi' },
    ];
    // Shuffle array randomly
    const shuffled = sampleMazdoors.sort(() => 0.5 - Math.random());
    setMazdoors(shuffled);
  }, []);

  const filteredMazdoors = mazdoors.filter(mazdoor =>
    mazdoor.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  const renderMazdoorItem = ({ item }) => (
    <View style={styles.mazdoorCard}>
      <Image source={item.image} style={styles.mazdoorImage} />
      <View style={styles.mazdoorInfo}>
        <Text style={styles.mazdoorName}>{item.name}</Text>
        <Text style={styles.mazdoorRating}>Rating: {item.rating} ★</Text>
        <Text style={styles.mazdoorSkills}>Skills: {item.skills.join(', ')}</Text>
        <Text style={styles.mazdoorCity}>City: {item.city}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.viewProfileButton}>
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hireButton}>
            <Text style={styles.buttonText}>Hire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#E6F0FA', '#B0C4DE']} style={styles.container}>
      <View>
        <Text style={styles.logo}>
          <Text style={styles.logoMini}>Asaan</Text>
          <Text style={styles.logoMain}>Kaam</Text>
        </Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Results</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search City"
          value={searchCity}
          onChangeText={setSearchCity}
          placeholderTextColor="#666"
        />
      </View>
      <FlatList
        data={filteredMazdoors}
        renderItem={renderMazdoorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  searchBar: {
    height: 30,
    width: 150,
    borderColor: '#1E3A8A',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#333',
    paddingTop:5,
    paddingBottom:5
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  mazdoorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  mazdoorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  mazdoorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mazdoorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
  },
  mazdoorRating: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 5,
  },
  mazdoorSkills: {
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 5,
  },
  mazdoorCity: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewProfileButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  hireButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoMini: {
    fontSize: 14,
    color: '#444',
  },
  logoMain: {
    fontSize: 27,
    color: '#4CAF50',
  },
  separator: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
});

export default MazdoorDetail;