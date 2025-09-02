import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';
import * as Animatable from 'react-native-animatable';
import { themeColors } from '../theme';
import DishRow from '../components/dishRow';
import CartIcon from '../components/cartIcon';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params?.restaurant || params; // Handle both direct and nested restaurant object
  const dispatch = useDispatch();

  // Check if item is undefined or missing required properties
  if (!item || !item.name) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-red-500">Error: Restaurant data not found</Text>
        <TouchableOpacity
          className="bg-[#ff5733] p-3 rounded-lg mt-4"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    if (item?.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, [item]);

  const renderStars = (count) => {
    const stars = [];
    const full = Math.floor(count || 0);
    for (let i = 0; i < full; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../assets/images/fullStar.png')}
          className="h-4 w-4"
        />
      );
    }
    return stars;
  };

  return (
    <View className="flex-1 bg-white">
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Image */}
        <Animatable.View animation="fadeIn" duration={800} className="relative">
          {item.image ? (
            <Image source={item.image} className="w-full h-72" />
          ) : (
            <View className="w-full h-72 bg-gray-200 flex items-center justify-center">
              <Text className="text-gray-500">No image available</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </Animatable.View>

        {/* Restaurant Info */}
        <Animatable.View
          animation="fadeInUp"
          delay={100}
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.name}</Text>
            <View className="flex-row space-x-2 my-2 items-center">
              <View className="flex-row items-center space-x-1">
                {renderStars(item.stars)}
                <Text className="text-xs text-gray-700 ml-1">
                  {item.stars || 'No rating'} ({item.reviews || 0} reviews) ·{' '}
                  <Text className="font-semibold">{item.category || 'Unknown'}</Text>
                </Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-1 mb-1">
              <Icon.MapPin color="gray" width={15} height={15} />
              <Text className="text-gray-700 text-xs">
                Nearby · {item.address || 'Lahore, PK'}
              </Text>
            </View>
            <Text className="text-gray-500 mt-2">{item.description || 'No description available'}</Text>
          </View>
        </Animatable.View>

        {/* Menu Section */}
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {item.menu && item.menu.length > 0 ? (
            item.menu.map((dish, index) => (
              <Animatable.View key={`${dish.id}-${index}`} animation="fadeInUp" delay={index * 100}>
                <DishRow item={dish} />
              </Animatable.View>
            ))
          ) : (
            <Text className="text-center text-gray-400">No menu items available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}