import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Replace this with your Firebase Realtime Database base URL
const FIREBASE_DB_URL = 'https://cravebite-c263d-default-rtdb.firebaseio.com/';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter email and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch users from Firebase
      const response = await fetch(`${FIREBASE_DB_URL}/users.json`);
      const data = await response.json();

      // Find user by email
      let userFound = null;
      for (const key in data) {
        if (data[key].email === username && data[key].password === password) {
          userFound = data[key];
          break;
        }
      }

      if (userFound) {
        console.log('Login successful');
        navigation.replace('Home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('An error occurred. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center items-center p-6 bg-white"
      >
        <Image source={require('../assets/images/logo.png')} className="w-32 h-32 mb-2" resizeMode="contain" />
        <Text className="text-3xl font-bold text-[#ff5733] mb-6">CraveBite</Text>

        {error && <Text className="text-red-500 mb-4">{error}</Text>}

        <TextInput
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-[#ff5733] p-3 rounded-lg mb-3"
          disabled={isLoading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-sm text-gray-500">Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
