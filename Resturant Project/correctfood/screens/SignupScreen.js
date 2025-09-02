import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Replace this with your actual Firebase Realtime Database URL
const FIREBASE_DB_URL = 'https://cravebite-c263d-default-rtdb.firebaseio.com/';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if user already exists
      const res = await fetch(`${FIREBASE_DB_URL}/users.json`);
      const existingUsers = await res.json();

      const emailExists = Object.values(existingUsers || {}).some(
        user => user.email === username
      );

      if (emailExists) {
        setError('Email already registered');
        setIsLoading(false);
        return;
      }

      // Save user to Firebase
      const newUser = {
        name,
        email: username,
        password,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(`${FIREBASE_DB_URL}/users.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      console.log('User created:', newUser);
      navigation.replace('Home');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Try again.');
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
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <TouchableOpacity
          onPress={handleSignup}
          className="w-full bg-[#ff5733] p-3 rounded-lg mb-3"
          disabled={isLoading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-sm text-gray-500">Already have an account? Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
