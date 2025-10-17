import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// API configuration
const API_URL = __DEV__ 
  ? Platform.select({
      // Use localhost for web
      web: 'https://localhost:7107',
      // Use computer's IP for mobile dev
      default: 'https://192.168.1.47:7107', 
    })
  : 'https://your-production-api.com'; // Replace with your production API

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      
      // Use your computer's IP address instead of localhost for mobile testing
      const response = await fetch(`${API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the JWT token and user data from the nested structure
      await AsyncStorage.setItem('userToken', data.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));

      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error details:', error);
      Alert.alert(
        'Login Error', 
        `${(error as Error)?.message || 'Failed to login. Please try again.'}\n\nAPI URL: ${API_URL}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0FDF4',
      justifyContent: 'center',
      padding: 20,
    },
    formCard: {
      backgroundColor: 'white',
      padding: 24,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#14532D',
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      color: '#4B5563',
      textAlign: 'center',
      marginBottom: 24,
    },
    input: {
      backgroundColor: '#F9FAFB',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      fontSize: 16,
    },
    loginButton: {
      backgroundColor: '#16A34A',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>AgriMitra AI</Text>
        <Text style={styles.subtitle}>लॉग इन करें</Text>

        <TextInput
          style={styles.input}
          placeholder="ईमेल"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="पासवर्ड"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'लॉग इन हो रहा है...' : 'लॉग इन करें'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}