import { View, Text, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function OrderPreparingScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Delivery')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <StatusBar barStyle='dark-content' backgroundColor='#fff' />
      <Image
        source={require('../assets/images/delivery.gif')}
        className='h-80 w-80'
      />
      <Text className='text-lg font-semibold text-gray-700 mt-4'>
        Preparing your order...
      </Text>
    </View>
  )
}
