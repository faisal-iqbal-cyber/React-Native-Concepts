import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  selectCartItemCount
} from '../slices/cartSlice';

export default function CartScreen() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      {item.image && (
        <Image
          source={item.image}
          style={{ height: 80, width: 80 }}
          className="rounded-3xl mr-3"
        />
      )}
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.name || 'Unknown Item'}</Text>
        <Text className="text-gray-700">{item.description || 'No description'}</Text>
        <Text className="text-lg font-bold text-gray-700">${item.price || 0}</Text>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart({ id: item.id }))}
        className="p-1 rounded-full"
        style={{ backgroundColor: themeColors.bgColor(1) }}
      >
        <Icon.Trash strokeWidth={2} height={20} width={20} stroke="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4 text-center">Your Cart ({cartItemCount})</Text>
      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Your cart is empty</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="mt-4 p-3 rounded-full"
            style={{ backgroundColor: themeColors.bgColor(1) }}
          >
            <Text className="text-white text-center font-bold text-lg">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          <View className="absolute bottom-5 w-full p-4 bg-white rounded-3xl shadow-lg mx-2">
            <Text className="text-lg font-bold">Total: ${cartTotal.toFixed(2)}</Text>
            <TouchableOpacity
              className="mt-2 p-3 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text className="text-white text-center font-bold text-lg">Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}