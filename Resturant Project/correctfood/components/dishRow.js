import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as Icon from 'react-native-feather'
import { themeColors } from '../theme'
import { addToCart, removeFromCart, selectCartItemsById } from '../slices/cartSlice'

export default function DishRow({ item }) {
  const dispatch = useDispatch()

  // Memoized selector should be defined in cartSlice.js using createSelector from Reselect
  const totalItems = useSelector((state) => selectCartItemsById(state, item.id))
  const itemCount = totalItems?.length || 0

  
const addItemToCart = () => {
  console.log('Adding to cart:', item);
  dispatch(addToCart({ ...item }));
};

  const removeItemFromCart = () => {
    if (itemCount > 0) {
      dispatch(removeFromCart({ id: item.id }))
    }
  }

  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image
        source={item.image}
        style={{ height: 100, width: 100 }}
        className="rounded-3xl"
      />
      <View className="flex-1 flex space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{item.name}</Text>
          <Text className="text-gray-700">{item.description}</Text>
        </View>
        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-lg font-bold text-gray-700">${item.price}</Text>
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity
              onPress={removeItemFromCart}
              disabled={itemCount === 0}
              className="p-1 rounded-full"
              style={{ backgroundColor: itemCount === 0 ? 'gray' : themeColors.bgColor(1) }}
            >
              <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
            <Text className="px-3">{itemCount}</Text>
            <TouchableOpacity
              onPress={addItemToCart}
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
