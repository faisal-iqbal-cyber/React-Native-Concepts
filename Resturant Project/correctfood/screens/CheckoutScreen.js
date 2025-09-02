import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectCartItems, selectCartTotal, emptyCart } from '../slices/cartSlice';
import { themeColors } from '../theme';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [showDeliveryBoy, setShowDeliveryBoy] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

  const firebaseURL = 'https://cravebite-c263d-default-rtdb.firebaseio.com/orders.json';

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add some items before proceeding.');
      setError('Cart is empty');
      return;
    }
    console.log('Proceeding to checkout, cart items:', cartItems);
    setShowDeliveryBoy(true);
    setError(null);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add some items before placing an order.');
      setError('Cart is empty');
      return;
    }

    const order = {
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      console.log('Sending order to Firebase:', order);
      const response = await fetch(firebaseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      console.log('Order placed successfully, response:', response.status);
      setOrderPlaced(true);
      setShowDeliveryBoy(false);
      setError(null);
      dispatch(emptyCart());
    } catch (error) {
      console.error('Place order error:', error.message);
      setError(`Could not place order: ${error.message}`);
      Alert.alert('Error', `Could not place order: ${error.message}`);
    }
  };

  if (orderPlaced) {
    return (
      <View className="flex-1 p-4 bg-gray-100 justify-center items-center">
        <Text className="text-xl font-bold text-green-600">Place Order Successfully</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4 text-center">Checkout</Text>
      <View className="bg-white p-4 rounded-3xl shadow-lg mb-4">
        <Text className="text-lg font-bold">Order Total: ${cartTotal.toFixed(2)}</Text>
        <Text className="text-gray-700 mt-2">Payment Method: Cash on Delivery</Text>
        <Text className="text-gray-700 mt-2">Delivery Address: Islamabad, PK</Text>
        <Text className="text-gray-700 mt-2">Estimated Delivery: 30-45 min</Text>
      </View>

      {error && <Text className="text-red-500 mt-2 mb-4">{error}</Text>}

      {showDeliveryBoy && (
        <View className="items-center my-4">
          <Image
            source={require('../assets/images/deliveryGuy.png')}
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-gray-500 mt-2">Preparing your order...</Text>
        </View>
      )}

      {!showDeliveryBoy ? (
        <TouchableOpacity
          onPress={handleProceedToCheckout}
          className="mt-2 p-3 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(1) }}
        >
          <Text className="text-white text-center font-bold text-lg">Proceed to Checkout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={placeOrder}
          className="mt-2 p-3 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(1) }}
        >
          <Text className="text-white text-center font-bold text-lg">Place Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}