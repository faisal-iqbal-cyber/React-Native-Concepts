import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import all screens
import HomeScreen from './screens/HomeScreen';
import PizzaScreen from './screens/PizzaScreen';
import BurgerScreen from './screens/BurgerScreen';
import ItalianFoodScreen from './screens/ItalianFoodScreen';
import ChineseScreen from './screens/ChineseScreen';
import SweetsScreen from './screens/SweetsScreen';
import LoginScreen from './screens/LoginScreen';

import SignupScreen from './screens/SignupScreen';
import RestaurantDetailScreen from './screens/RestaurantDetailScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // Wrap the app in GestureHandlerRootView for gesture handling
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        
          <Stack.Screen name="Signup" component={SignupScreen} />
        
            <Stack.Screen name="Pizza" component={PizzaScreen} />
            <Stack.Screen name="Burger" component={BurgerScreen} />
            <Stack.Screen name="ItalianFood" component={ItalianFoodScreen} />
            <Stack.Screen name="Chinese" component={ChineseScreen} />
            <Stack.Screen name="Sweets" component={SweetsScreen} />
           
            <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen} />
            <Stack.Screen name="Delivery" component={DeliveryScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}