import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MazdoorDetails = ({ route, navigation }) => {
  const { skillId, skillLabel, userID } = route.params;
  const [searchCity, setSearchCity] = useState('');
  const [mazdoors, setMazdoors] = useState([]);
  const [filteredMazdoors, setFilteredMazdoors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMazdoors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker.json'
      );
      const data = await response.json();
      const tempArray = [];

      if (data) {
        for (const key in data) {
          const workerData = {
            id: key,
            name: data[key].name || 'Unknown',
            rating: data[key].rating || null,
            skills: data[key].skills?.map((skill) => skill.skillName) || [],
            skillsData: data[key].skills || [],
            image: data[key].image || null,
            city: data[key].location || 'Unknown',
            contact: data[key].contact || 'Not Available',
            experience: data[key].skills?.find((skill) => skill.skillName === skillLabel)?.experience || 'N/A',
            aboutMe: data[key].skills?.find((skill) => skill.skillName === skillLabel)?.aboutWork || 'No Description',
            isAvailable: data[key].isAvailable ?? true, 
            jobsCompleted: data[key].jobsCompleted || 0, 
          };
          if (workerData.skills.includes(skillLabel)) {
            tempArray.push(workerData);
          }
        }
        setMazdoors(tempArray);
        setFilteredMazdoors(tempArray);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setMazdoors([]);
      setFilteredMazdoors([]);
      setLoading(false);
    }
  }, [skillLabel]);

  useEffect(() => {
    fetchMazdoors();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMazdoors(); 
    });
    return () => unsubscribe();
  }, [navigation, fetchMazdoors]);

  useEffect(() => {
    const filtered = mazdoors.filter((mazdoor) =>
      mazdoor.city.toLowerCase().includes(searchCity.toLowerCase().trim())
    );
    setFilteredMazdoors(filtered);
  }, [searchCity, mazdoors]);

  const ViewProfileHandler = (mazdoor) => {
    navigation.navigate('MazdoorProfile', { mazdoor, skillLabel, userID });
  };

  const handleHireScreen = (mazdoor) => {
    if (!mazdoor.isAvailable) {
      alert('This worker is not available at the moment.');
      return;
    }
    navigation.navigate('HireScreen', {
      workerName: mazdoor.name,
      mazdoorID: mazdoor.id,
      userID,
    });
  };

  const renderMazdoorItem = ({ item }) => (
    <View style={styles.mazdoorCard}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.mazdoorImage}
          resizeMode="cover"
          onError={(e) => console.log(`Image load error for ${item.name}:`, e.nativeEvent.error)}
        />
      ) : (
        <View style={[styles.mazdoorImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.mazdoorInfo}>
        <Text style={styles.mazdoorName}>{item.name}</Text>
        <Text style={styles.mazdoorRating}>Rating: {item.rating ? `${item.rating.toFixed(1)} ★` : 'N/A'}</Text>
        <Text style={styles.mazdoorSkills}>Skills: {item.skills.join(', ')}</Text>
        <Text style={styles.mazdoorCity}>City: {item.city}</Text>
        <Text style={styles.mazdoorAvailability}>
          Status: {item.isAvailable ? 'Available' : 'Not Available'}
        </Text>
        <Text style={styles.mazdoorJobs}>Jobs Completed: {item.jobsCompleted}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={() => ViewProfileHandler(item)}
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.hireButton, !item.isAvailable && styles.disabledButton]}
            onPress={() => handleHireScreen(item)}
            disabled={!item.isAvailable}
          >
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
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : filteredMazdoors.length === 0 ? (
        <Text style={styles.noMazdoorsText}>
          {searchCity
            ? `No workers found in ${searchCity} for ${skillLabel}.`
            : `No workers found for ${skillLabel}.`}
        </Text>
      ) : (
        <FlatList
          data={filteredMazdoors}
          renderItem={renderMazdoorItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </LinearGradient>
  );
};

export default MazdoorDetails;

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
    paddingTop: 5,
    paddingBottom: 5,
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
  placeholderImage: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
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
    color: 'orange',
    marginBottom: 5,
  },
  mazdoorSkills: {
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 5,
  },
  mazdoorCity: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  mazdoorAvailability: {
    fontSize: 14,
    color: '#10872c',
    marginBottom: 5,
    fontWeight: '600',
  },
  mazdoorJobs: {
    fontSize: 14,
    color: '#1E3A8A',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewProfileButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  hireButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
  },
  // disabledButton: {
  //   backgroundColor: 'white',
  //   opacity: 0.6,
  // },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  logoMini: {
    fontSize: 16,
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
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  noMazdoorsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});