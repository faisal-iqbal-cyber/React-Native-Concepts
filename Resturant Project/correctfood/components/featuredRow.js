import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { themeColors } from '../theme'
import RestaurantCard from './RestaurantCard'
import PropTypes from 'prop-types' // Optional but recommended

export default function FeaturedRow({ title, restaurants = [], description }) {
  return (
    <View className='mt-4'>
      {/* Header */}
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <View>
          <Text className='font-bold text-lg'>{title}</Text>
          {description && (
            <Text className='text-gray-500 text-xs'>{description}</Text>
          )}
        </View>

        {restaurants.length > 0 && (
          <TouchableOpacity onPress={() => console.log('Navigate to full list')}>
            <Text
              style={{ color: themeColors.text }}
              className='font-semibold text-sm'
            >
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Scrollable Restaurant Cards */}
      {restaurants.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingRight: 20 // Added more right padding
          }}
          className='overflow-visible py-3'
        >
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={`${restaurant.id}-${index}`} // More unique key
              item={restaurant}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="px-4 py-3">
          <Text className="text-gray-500 text-sm">
            No restaurants available
          </Text>
        </View>
      )}
    </View>
  )
}

// Optional prop type validation
FeaturedRow.propTypes = {
  title: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string
}