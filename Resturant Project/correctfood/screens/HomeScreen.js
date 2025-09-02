import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';
import Categories from '../components/categories';
import { featured } from '../constants';
import RestaurantCard from '../components/RestaurantCard';
import FeaturedRow from '../components/featuredRow';
export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten restaurants from featured data for searching with safety checks
  const allRestaurants = useMemo(() => {
    return Array.isArray(featured)
      ? featured.reduce((acc, item) => {
          return [...acc, ...(Array.isArray(item?.restaurants) ? item.restaurants : [])];
        }, [])
      : [];
  }, [featured]);

  // Memoized search results for better performance
  const searchResults = useMemo(() => {
    if (searchQuery.trim() === '') return [];
    const query = searchQuery.toLowerCase();
    return allRestaurants.filter((restaurant) =>
      restaurant.name?.toLowerCase()?.includes(query)
    );
  }, [searchQuery, allRestaurants]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="auto" />

      {/* Search Bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height={25} width={25} stroke="gray" />
          <TextInput
            placeholder="Search Restaurants"
            className="ml-2 flex-1 text-base"
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          <View className="flex-row items-center space-x-1 border-l-2 pl-2 border-gray-300">
            <Icon.MapPin height={20} width={20} stroke="gray" />
            <Text className="text-gray-600">Islamabad, PK</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders width={20} height={20} strokeWidth={2.5} stroke="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1">
        {searchQuery.trim() !== '' ? (
          searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <RestaurantCard item={item} />}
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Text className="text-lg font-bold px-4 py-2">
                  Search Results ({searchResults.length})
                </Text>
              }
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg text-gray-500">No restaurants found</Text>
            </View>
          )
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Categories */}
            <Categories />

            {/* Featured Sections */}
            <View className="mt-5 space-y-4">
              {Array.isArray(featured) && featured.length > 0 ? (
                featured.map((item, index) => (
                  <FeaturedRow
                    key={item.id || index}
                    title={item.title}
                    restaurants={item.restaurants || []}
                    description={item.description}
                  />
                ))
              ) : (
                <Text className="text-lg text-gray-500 text-center">
                  No featured restaurants available
                </Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}