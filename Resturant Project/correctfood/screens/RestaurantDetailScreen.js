import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { featured } from '../constants';

const RestaurantDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params || {};

  // Filter restaurants by category
  const restaurants = featured
    .flatMap((group) => group.restaurants)
    .filter((restaurant) => restaurant.category === category) || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{category || 'Restaurants'}</Text>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantContainer}
            onPress={() => navigation.navigate('Restaurant', { restaurant })}
          >
            <Image source={restaurant.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
              <Text style={styles.description}>
                {restaurant.category} · {restaurant.stars} stars ({restaurant.reviews} reviews)
              </Text>
              <Text style={styles.description}>{restaurant.address}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.description}>No restaurants found</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  restaurantContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#ff6347',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});