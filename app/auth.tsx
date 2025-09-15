import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import FirebaseAuth from '@/components/FirebaseAuth';

export default function AuthScreen() {
  const handleAuthSuccess = (user: any) => {
    // Store user data (in real app, use AsyncStorage or secure storage)
    console.log('User authenticated:', user);
    // Navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1 }}>
      <FirebaseAuth onAuthSuccess={handleAuthSuccess} />
    </View>
  );
}