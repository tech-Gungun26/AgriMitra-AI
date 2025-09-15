import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function MandiPricesScreen() {
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock mandi price data
  const mandiPrices = [
    {
      id: '1',
      crop: 'टमाटर',
      minPrice: 20,
      maxPrice: 30,
      modalPrice: 25,
      unit: 'kg',
      change: '+5%',
      trend: 'up'
    },
    {
      id: '2',
      crop: 'प्याज',
      minPrice: 15,
      maxPrice: 25,
      modalPrice: 20,
      unit: 'kg',
      change: '-2%',
      trend: 'down'
    },
    {
      id: '3',
      crop: 'आलू',
      minPrice: 10,
      maxPrice: 18,
      modalPrice: 14,
      unit: 'kg',
      change: '+3%',
      trend: 'up'
    },
    {
      id: '4',
      crop: 'गेहूं',
      minPrice: 2000,
      maxPrice: 2200,
      modalPrice: 2100,
      unit: 'quintal',
      change: '+1%',
      trend: 'up'
    },
    {
      id: '5',
      crop: 'धान',
      minPrice: 1800,
      maxPrice: 2000,
      modalPrice: 1900,
      unit: 'quintal',
      change: '-1%',
      trend: 'down'
    },
    {
      id: '6',
      crop: 'मक्का',
      minPrice: 1500,
      maxPrice: 1700,
      modalPrice: 1600,
      unit: 'quintal',
      change: '+4%',
      trend: 'up'
    }
  ];

  const locations = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Jaipur'];

  const filteredPrices = mandiPrices.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>मंडी भाव</Text>
        <Text style={styles.subtitle}>आज के ताजा बाजार दर</Text>
      </View>

      {/* Location Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>स्थान चुनें:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationScroll}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.locationChip,
                selectedLocation === location && styles.selectedLocationChip
              ]}
              onPress={() => setSelectedLocation(location)}
            >
              <Text style={[
                styles.locationText,
                selectedLocation === location && styles.selectedLocationText
              ]}>
                {location}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search */}
      <View style={styles.section}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="फसल खोजें..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Price Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>आज के भाव - {selectedLocation}</Text>
        {filteredPrices.map((item) => (
          <View key={item.id} style={styles.priceCard}>
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>{item.crop}</Text>
              <View style={styles.priceRange}>
                <Text style={styles.priceLabel}>न्यूनतम: </Text>
                <Text style={styles.price}>₹{item.minPrice}</Text>
                <Text style={styles.priceLabel}> - अधिकतम: </Text>
                <Text style={styles.price}>₹{item.maxPrice}</Text>
                <Text style={styles.unit}> /{item.unit}</Text>
              </View>
              <View style={styles.modalPriceContainer}>
                <Text style={styles.modalPriceLabel}>सामान्य भाव: </Text>
                <Text style={styles.modalPrice}>₹{item.modalPrice} /{item.unit}</Text>
              </View>
            </View>
            <View style={styles.trendInfo}>
              <View style={[
                styles.trendBadge,
                { backgroundColor: item.trend === 'up' ? '#DCFCE7' : '#FEE2E2' }
              ]}>
                <Ionicons 
                  name={item.trend === 'up' ? 'trending-up' : 'trending-down'} 
                  size={16} 
                  color={item.trend === 'up' ? '#16A34A' : '#DC2626'} 
                />
                <Text style={[
                  styles.changeText,
                  { color: item.trend === 'up' ? '#16A34A' : '#DC2626' }
                ]}>
                  {item.change}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Market Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>बाजार सुझाव</Text>
        <View style={styles.tipsCard}>
          <View style={styles.tip}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>टमाटर की कीमतें बढ़ रही हैं - बेचने का अच्छा समय</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipIcon}>📈</Text>
            <Text style={styles.tipText}>अगले हफ्ते गेहूं की मांग बढ़ने की उम्मीद</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipIcon}>🌧️</Text>
            <Text style={styles.tipText}>बारिश के कारण हरी सब्जियों के दाम बढ़ सकते हैं</Text>
          </View>
        </View>
      </View>

      {/* Voice Assistant */}
      <TouchableOpacity style={styles.voiceButton}>
        <Ionicons name="mic" size={24} color="white" />
        <Text style={styles.voiceButtonText}>आवाज में मंडी भाव पूछें</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 20,
  },
  locationScroll: {
    marginTop: 8,
  },
  locationChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedLocationChip: {
    backgroundColor: '#22C55E',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  selectedLocationText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  priceCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  priceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  unit: {
    fontSize: 12,
    color: '#6B7280',
  },
  modalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalPriceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  trendInfo: {
    alignItems: 'flex-end',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  tipsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
  voiceButton: {
    backgroundColor: '#16A34A',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  voiceButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});