import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { emptyCart } from '../slices/cartSlice';
import { themeColors } from '../theme';

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);

  const handleCancelOrder = () => {
    dispatch(emptyCart());
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1">
      {/* Map showing restaurant location */}
      <MapView
        className="flex-1"
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>

      {/* Delivery Info Card */}
      <View className="bg-white -mt-12 rounded-t-3xl relative shadow-lg">
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg font-semibold text-gray-700">Estimated Arrival</Text>
            <Text className="text-3xl font-bold text-gray-800">20-30 Minutes</Text>
            <Text className="mt-1 text-gray-600">Hang tight! Your meal is on the way.</Text>
          </View>
          <Image
            source={require('../assets/images/bikeGuy2.gif')}
            className="w-24 h-24"
          />
        </View>

        {/* Rider Card */}
        <View
          className="flex-row items-center justify-between p-3 mx-4 mt-5 mb-5 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
        >
          <View className="p-1 rounded-full bg-white/40">
            <Image
              source={require('../assets/images/deliveryGuy.png')}
              className="w-16 h-16 rounded-full"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-white font-bold text-lg">Ali Khan</Text>
            <Text className="text-white">Delivery Partner</Text>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone stroke={themeColors.bgColor(1)} strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancelOrder}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X stroke="red" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
