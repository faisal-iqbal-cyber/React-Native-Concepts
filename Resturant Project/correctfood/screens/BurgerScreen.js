import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const burgerPlaces = [
  {
    id: '1',
    name: 'Johnny & Jugnu',
    image: require('../assets/images/johnny.jpg'),
    rating: 4.4,
    time: '20-30 min',
  },
  {
    id: '2',
    name: 'Hardee’s',
    image: require('../assets/images/hardees.jpg'),
    rating: 4.1,
    time: '30-40 min',
  },
  {
    id: '3',
    name: 'Oh My Grill',
    image: require('../assets/images/oh-my-grill.jpg'),
    rating: 4.6,
    time: '25-35 min',
  },
];

export default function BurgerScreen() {
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
      <Text style={styles.heading}>Burger Restaurants</Text>
      <FlatList
        data={burgerPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
