import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MazdoorProfile = () => {
  const navigation = useNavigation();

  // Sample mazdoor profile data
  const mazdoor = {
    name: 'Faisal Iqbal',
    image: require('../../assets/images/ahmed.jpg'),
    skills: [
      { name: 'Plumbing', ratePerHour: 1500 },
      { name: 'Repair', ratePerHour: 1200 },
    ],
    contact: '+92 300 1234567',
    experience: '8 years',
    aboutMe: 'Experienced plumber with 8+ years in residential and commercial projects. Expert in pipe installation, leak repairs, and bathroom fittings. Karachi Technical Institute graduate, committed to quality and customer satisfaction.',
    sampleImages: [
      require('../../assets/images/plumbing.jpg'),
      require('../../assets/images/repairing.jpg'),
      require('../../assets/images/plumbing2.jpg'),
      require('../../assets/images/repairing2.jpg'),
      require('../../assets/images/plumbing3.jpg'),
    ],
    city: 'Karachi',
    rating: 4.7,
  };

  const renderSkillItem = ({ item }) => (
    <View style={styles.skillItem}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillRate}>PKR {item.ratePerHour}/hr</Text>
    </View>
  );

  const renderSampleImage = ({ item }) => (
    <Image source={item} style={styles.sampleImage} />
  );

  const handleViewAllImages = () => {
    navigation.navigate('GalleryView', { images: mazdoor.sampleImages });
  };

  return (
    <LinearGradient
      colors={['#F0F4F8', '#D1DAE0']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Image source={mazdoor.image} style={styles.profileImage} />
          <Text style={styles.mazdoorName}>{mazdoor.name}</Text>
          <Text style={styles.mazdoorCity}>{mazdoor.city} | {mazdoor.rating} ★</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Rates</Text>
          <FlatList
            data={mazdoor.skills}
            renderItem={renderSkillItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.skillsList}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.contactText}>{mazdoor.contact}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.experienceText}>{mazdoor.experience}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{mazdoor.aboutMe}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sampleWorkHeader}>
            <Text style={styles.sectionTitle}>Sample Work</Text>
            {mazdoor.sampleImages.length > 2 && (
              <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllImages} activeOpacity={0.7}>
                <AntDesign name="right" size={20} color="#1E3A8A" />
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={mazdoor.sampleImages.slice(0, 2)}
            renderItem={renderSampleImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sampleImagesList}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.hireButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Hire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  mazdoorName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 5,
  },
  mazdoorCity: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 15,
  },
  sampleWorkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllButton: {
    padding: 10,
  },
  skillsList: {
    gap: 10,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  skillName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  skillRate: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  experienceText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
    lineHeight: 24,
  },
  sampleImagesList: {
    gap: 10,
  },
  sampleImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 20,
  },
  hireButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MazdoorProfile;