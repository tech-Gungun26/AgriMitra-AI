import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

// Farmer chatbot component that appears on every screen
function FarmerChatbot() {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <View style={styles.chatbot}>
      <View style={styles.chatbotBubble}>
        <Text style={styles.chatbotText}>नमस्ते! मैं आपका AI सहायक हूँ</Text>
      </View>
      <View style={styles.farmerAvatar}>
        <Text style={styles.farmerEmoji}>👨‍🌾</Text>
      </View>
    </View>
  ) : null;
}

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#16A34A',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingBottom: 5,
            paddingTop: 5,
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'होम',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="plant-analysis"
          options={{
            title: 'पौधा जांच',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="camera" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mandi-prices"
          options={{
            title: 'मंडी भाव',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="trending-up" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="schemes"
          options={{
            title: 'योजनाएं',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="document-text" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'प्रोफाइल',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <FarmerChatbot />
    </>
  );
}

const styles = StyleSheet.create({
  chatbot: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  chatbotBubble: {
    backgroundColor: '#22C55E',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    maxWidth: 200,
  },
  chatbotText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  farmerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  farmerEmoji: {
    fontSize: 24,
  },
});