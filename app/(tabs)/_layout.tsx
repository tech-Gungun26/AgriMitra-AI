import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

// Farmer chatbot component that appears on every screen
function FarmerChatbot({ onOpen }: { onOpen: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <TouchableOpacity style={styles.chatbot} onPress={onOpen} activeOpacity={0.8}>
      <View style={styles.chatbotBubble}>
        <Text style={styles.chatbotText}>नमस्ते! मैं आपका AI सहायक हूँ</Text>
      </View>
      <View style={styles.farmerAvatar}>
        <Text style={styles.farmerEmoji}>👨‍🌾</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const [showChatbot, setShowChatbot] = useState(false);
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
          name="agri-bot"
          options={{
            title: 'AgriMitra Bot',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
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
      <FarmerChatbot onOpen={() => setShowChatbot(true)} />

      {/* Chatbot Modal (global) */}
      <Modal visible={showChatbot} animationType="slide" onRequestClose={() => setShowChatbot(false)}>
        <View style={modalStyles.modalHeader}>
          <TouchableOpacity onPress={() => setShowChatbot(false)} style={modalStyles.modalClose}>
            <Ionicons name="close" size={28} color="#111827" />
          </TouchableOpacity>
          <Text style={modalStyles.modalTitle}>AgriMitra Chatbot</Text>
        </View>
        {Platform.OS === 'web' ? (
          // Use iframe on web
          // @ts-ignore - iframe is available on web builds
          <iframe
            src="https://www.chatbase.co/NIamE6SYZJd_BE3A5SiBo/help"
            title="AgriMitra Chatbot"
            style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <WebView source={{ uri: 'https://www.chatbase.co/NIamE6SYZJd_BE3A5SiBo/help' }} style={modalStyles.webview} startInLoadingState />
        )}
      </Modal>
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

const modalStyles = StyleSheet.create({
  modalHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  modalClose: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  webview: {
    flex: 1,
    backgroundColor: 'white',
  },
});