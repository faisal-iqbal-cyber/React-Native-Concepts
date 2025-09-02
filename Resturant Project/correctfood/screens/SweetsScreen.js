import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const sweetPlaces = [
  {
    id: '1',
    name: 'Bundu Khan Sweets',
    image: require('../assets/images/bundu-khan.jpg'),
    rating: 4.3,
    time: '15-25 min',
  },
  {
    id: '2',
    name: 'Savour Foods Sweets',
    image: require('../assets/images/savour-sweets.jpg'),
    rating: 4.1,
    time: '20-30 min',
  },
  {
    id: '3',
    name: 'Sweet-Cream',
    image: require('../assets/images/sweetcream.jpg'),
    rating: 4.5,
    time: '20-30 min',
  },
];

export default function SweetsScreen() {
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
      <Text style={styles.heading}>Sweet Places</Text>
      <FlatList
        data={sweetPlaces}
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
    paddingHorizontal: 16,
    paddingTop: 20,
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
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
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
