import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function AgriMitraBotScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AgriMitra Bot</Text>
        <Text style={styles.subtitle}>आपका AI सहायक</Text>
      </View>
      <View style={styles.webContainer}>
        {Platform.OS === 'web' ? (
          // @ts-ignore iframe for web
          <iframe
            src="https://www.chatbase.co/NIamE6SYZJd_BE3A5SiBo/help"
            title="AgriMitra Chatbot"
            style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <WebView source={{ uri: 'https://www.chatbase.co/NIamE6SYZJd_BE3A5SiBo/help' }} style={{ flex: 1 }} startInLoadingState />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#14532D' },
  subtitle: { fontSize: 15, color: '#4B5563', marginTop: 6 },
  webContainer: { flex: 1, marginTop: 0 },
});
