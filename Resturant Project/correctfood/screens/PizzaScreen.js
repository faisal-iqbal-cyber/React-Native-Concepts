import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pizzaPlaces = [
  {
    id: '1',
    name: 'Pizza Hut',
    image: require('../assets/images/pizza-hut.jpg'),
    rating: 4.3,
    time: '25-35 min',
  },
  {
    id: '2',
    name: 'Domino’s Pizza',
    image: require('../assets/images/dominos.jpg'),
    rating: 4.5,
    time: '20-30 min',
  },
  {
    id: '3',
    name: '14th Street Pizza',
    image: require('../assets/images/14th-street.jpg'),
    rating: 4.6,
    time: '30-40 min',
  },
];

export default function PizzaScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('RestaurantDetail', {
          name: item.name,
          image: item.image,
          description: `⭐ ${item.rating} | ⏱ ${item.time}`,
        })
      }
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>⭐ {item.rating} | ⏱ {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pizza Restaurants</Text>
      <FlatList
        data={pizzaPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#e74c3c',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 4,
    fontSize: 14,
    color: 'gray',
  },
});
