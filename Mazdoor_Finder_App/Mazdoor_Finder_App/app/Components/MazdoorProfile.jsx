import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MazdoorProfile = ({ navigation, route }) => {
  const { mazdoor, skillLabel, userID } = route.params;
  console.log('USERID in mazdoor profile :' , userID)

  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mazdoor?.id) {
      fetchWorkerData();
    } else {
      setLoading(false);
    }
  }, [mazdoor?.id]);

  const fetchWorkerData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoor.id}.json`
      );
      const data = await response.json();
      if (data) {
        setWorkerData({
          ...mazdoor,
          skillsData: data.skills || [],
        });
      } else {
        console.error('No worker data found in Firebase');
        setWorkerData({ ...mazdoor, skillsData: [] });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setWorkerData({ ...mazdoor, skillsData: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleHireScreen = () => {
    navigation.navigate('HireScreen', {
      workerName: mazdoor.name,
      mazdoorID: mazdoor.id,
      userID,
    });
  };

  if (!mazdoor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No Mazdoor data found.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Loading...</Text>
      </View>
    );
  }

  const renderSkillItem = ({ item }) => {
    return (
      <View style={styles.skillItem}>
        <Text style={styles.skillName}>{item.skillName}</Text>
        <Text style={styles.skillRate}>
          {item.ratePerHour ? `PKR ${item.ratePerHour}/hr` : 'N/A'}
        </Text>
      </View>
    );
  };

  const renderSampleImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.sampleImage}
      resizeMode="cover"
      onError={(e) => console.log(`Sample image load error:`, e.nativeEvent.error)}
    />
  );

  const handleViewAllImages = () => {
    const allImages = workerData?.skillsData
      .flatMap((skill) => skill.images || [])
      .filter((image) => image);
    navigation.navigate('GalleryView', { images: allImages || [] });
  };

  const allExperiences = workerData?.skillsData?.length
    ? workerData.skillsData
        .map((skill) => `${skill.skillName}: ${skill.experience || 'N/A'}`)
        .join('\n')
    : mazdoor.experience || 'Not Provided';

  const allAboutWork = workerData?.skillsData?.length
    ? workerData.skillsData
        .map((skill) => `${skill.skillName}: ${skill.aboutWork || 'No Description'}`)
        .join('\n')
    : mazdoor.aboutMe || 'No Description Available';

  const allSampleImages = workerData?.skillsData
    ?.flatMap((skill) => skill.images || [])
    .filter((image) => image) || mazdoor.sampleImages || [];

  return (
    <LinearGradient
      colors={['#F0F4F8', '#D1DAE0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          {mazdoor.image ? (
            <Image
              source={{ uri: mazdoor.image }}
              style={styles.profileImage}
              resizeMode="cover"
              onError={(e) => console.log(`Profile image load error for ${mazdoor.name}:`, e.nativeEvent.error)}
            />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          <Text style={styles.mazdoorName}>{mazdoor.name}</Text>
          <Text style={styles.mazdoorCity}>
            {mazdoor.city} | {mazdoor.rating ? `${mazdoor.rating} ★` : 'N/A'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <FlatList
            data={workerData?.skillsData || mazdoor.skills.map((skill) => ({ skillName: skill }))}
            renderItem={renderSkillItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.skillsList}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.contactText}>
            {mazdoor.contact || 'Not Available'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.experienceText}>{allExperiences}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{allAboutWork}</Text>
        </View>

        {allSampleImages.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sampleWorkHeader}>
              <Text style={styles.sectionTitle}>Sample Work</Text>
              {allSampleImages.length > 2 && (
                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={handleViewAllImages}
                  activeOpacity={0.7}
                >
                  <AntDesign name="right" size={20} color="#1E3A8A" />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={allSampleImages.slice(0, 2)}
              renderItem={renderSampleImage}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sampleImagesList}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.hireButton} activeOpacity={0.7} onPress={handleHireScreen}>
            <Text style={styles.buttonText}>Hire</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default MazdoorProfile;
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
  },
  placeholderImage: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
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
  },
  experienceText: {
    fontSize: 16,
    color: '#374151',
  },
  aboutText: {
    fontSize: 16,
    color: '#374151',
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
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  hireButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  // chatButton: {
  //   backgroundColor: '#3B82F6',
  //   paddingVertical: 14,
  //   paddingHorizontal: 30,
  //   borderRadius: 12,
  //   flex: 1,
  //   alignItems: 'center',
  // },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});