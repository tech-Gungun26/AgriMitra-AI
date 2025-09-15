import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function IndexScreen() {
  useEffect(() => {
    // Simple timeout to allow router to initialize, then navigate to auth
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loading}>🌾 AgriMitra AI</Text>
      <Text style={styles.subtext}>लोड हो रहा है...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
  },
  loading: {
    fontSize: 32,
    color: '#16A34A',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    color: '#6B7280',
  },
});