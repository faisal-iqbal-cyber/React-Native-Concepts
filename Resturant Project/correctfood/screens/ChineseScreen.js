import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const chineseRestaurants = [
  {
    id: '1',
    name: 'Red Dragon Express',
    image: require('../assets/images/red-dragon.jpg'),
    rating: 4.5,
    time: '30–40 min',
  },
  {
    id: '2',
    name: 'China Town Delight',
    image: require('../assets/images/china-town.jpg'),
    rating: 4.2,
    time: '25–35 min',
  },
];

export default function ChineseScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
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
      <Text style={styles.heading}>Chinese Restaurants</Text>
      <FlatList
        data={chineseRestaurants}
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
    color: '#e74c3c', // Optional: red theme consistent with food apps
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
    color: '#333',
  },
  details: {
    marginTop: 4,
    fontSize: 14,
    color: 'gray',
  },
});
