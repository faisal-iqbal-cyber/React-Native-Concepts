import { AntDesign } from '@expo/vector-icons';
//import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GalleryView = ({navigation , route}) => {
  const { images } = route.params || { images: [] };

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.galleryImage}
      resizeMode="cover"
      onError={(e) => console.log(`Gallery image load error:`, e.nativeEvent.error)}
    />
  );

  return (
    <LinearGradient
      colors={['#F0F4F8', '#D1DAE0']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Work Gallery</Text>
      </View>
      {images.length === 0 ? (
        <Text style={styles.noImagesText}>No sample images available</Text>
      ) : (
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.galleryList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A8A',
    marginLeft: 10,
  },
  galleryList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  galleryImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  noImagesText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GalleryView;