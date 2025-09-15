
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';


// List of Indian states and their capital cities
const STATES = [
  { state: 'Delhi', capital: 'Delhi' },
  { state: 'Uttar Pradesh', capital: 'Lucknow' },
  { state: 'Maharashtra', capital: 'Mumbai' },
  { state: 'West Bengal', capital: 'Kolkata' },
  { state: 'Tamil Nadu', capital: 'Chennai' },
  { state: 'Karnataka', capital: 'Bengaluru' },
  { state: 'Gujarat', capital: 'Gandhinagar' },
  { state: 'Rajasthan', capital: 'Jaipur' },
  { state: 'Punjab', capital: 'Chandigarh' },
  { state: 'Haryana', capital: 'Chandigarh' },
  { state: 'Bihar', capital: 'Patna' },
  { state: 'Madhya Pradesh', capital: 'Bhopal' },
  { state: 'Odisha', capital: 'Bhubaneswar' },
  { state: 'Kerala', capital: 'Thiruvananthapuram' },
  { state: 'Telangana', capital: 'Hyderabad' },
  { state: 'Andhra Pradesh', capital: 'Amaravati' },
  { state: 'Assam', capital: 'Dispur' },
  { state: 'Chhattisgarh', capital: 'Raipur' },
  { state: 'Jharkhand', capital: 'Ranchi' },
  { state: 'Goa', capital: 'Panaji' },
  { state: 'Tripura', capital: 'Agartala' },
  { state: 'Manipur', capital: 'Imphal' },
  { state: 'Meghalaya', capital: 'Shillong' },
  { state: 'Nagaland', capital: 'Kohima' },
  { state: 'Arunachal Pradesh', capital: 'Itanagar' },
  { state: 'Mizoram', capital: 'Aizawl' },
  { state: 'Sikkim', capital: 'Gangtok' },
  { state: 'Uttarakhand', capital: 'Dehradun' },
  { state: 'Himachal Pradesh', capital: 'Shimla' }
];

const OPENWEATHER_API_KEY = '1da9489476bac5fcfe9bf72ed4c0bf4c'; // <-- Your actual OpenWeatherMap API key

export default function HomeScreen() {
  const [selectedState, setSelectedState] = useState(STATES[0]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredStates, setFilteredStates] = useState(STATES);
  const [weatherData, setWeatherData] = useState({
    temperature: '--',
    humidity: '--',
    condition: 'Loading...',
    location: STATES[0].capital + ', India',
  });

  // Fetch weather data for the selected state's capital
  useEffect(() => {
    async function fetchWeather() {
      try {
        const city = selectedState.capital;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.main && data.weather && data.weather[0]) {
          setWeatherData({
            temperature: String(Math.round(data.main.temp)),
            humidity: String(data.main.humidity),
            condition: data.weather[0].description,
            location: `${city}, India`,
          });
        } else {
          setWeatherData({
            temperature: '--',
            humidity: '--',
            condition: 'No data',
            location: `${city}, India`,
          });
        }
      } catch (e) {
        setWeatherData({
          temperature: '--',
          humidity: '--',
          condition: 'Error',
          location: `${selectedState.capital}, India`,
        });
      }
    }
    fetchWeather();
  }, [selectedState]);

  // Filter states as user types
  useEffect(() => {
    if (!searchText) {
      setFilteredStates(STATES);
    } else {
      setFilteredStates(
        STATES.filter(s => s.state.toLowerCase().startsWith(searchText.toLowerCase()))
      );
    }
  }, [searchText]);

  const quickActions = [
    { id: '1', title: 'पौधा स्कैन करें', icon: 'camera', screen: '/plant-analysis' },
    { id: '2', title: 'मंडी भाव देखें', icon: 'trending-up', screen: '/mandi-prices' },
    { id: '3', title: 'सरकारी योजनाएं', icon: 'document-text', screen: '/schemes' },
    { id: '4', title: 'आवाज में पूछें', icon: 'mic', action: 'voice' },
  ];

  const newsUpdates = [
    {
      id: '1',
      title: 'खरीफ फसल की नई MSP घोषणा',
      summary: 'सरकार ने धान और मक्का के लिए नए न्यूनतम समर्थन मूल्य की घोषणा की है।',
      time: '2 घंटे पहले'
    },
    {
      id: '2',
      title: 'मानसून अपडेट',
      summary: 'इस सप्ताह उत्तर भारत में अच्छी बारिश की संभावना है।',
      time: '5 घंटे पहले'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>नमस्ते किसान जी!</Text>
          <Text style={styles.subGreeting}>आज आपकी कैसे सेवा करें?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#16A34A" />
        </TouchableOpacity>
      </View>

      {/* Weather Card with Dropdown */}
      <View style={styles.weatherCard}>
        {/* Dropdown at top-right */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(!dropdownVisible)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownButtonText}>{selectedState.state}</Text>
            <Ionicons name={dropdownVisible ? 'chevron-up' : 'chevron-down'} size={18} color="#16A34A" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <TextInput
                style={styles.dropdownSearch}
                placeholder="राज्य चुनें..."
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
              <FlatList
                data={filteredStates}
                keyExtractor={item => item.state}
                style={{ maxHeight: 180 }}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedState(item);
                      setDropdownVisible(false);
                      setSearchText('');
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item.state}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
          <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
          <Text style={styles.location}>{weatherData.location}</Text>
        </View>
        <View style={styles.weatherDetails}>
          <Text style={styles.humidity}>आर्द्रता: {weatherData.humidity}%</Text>
          <Text style={styles.farmerTip}>💡 आज सिंचाई के लिए अच्छा दिन है</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>त्वरित सेवाएं</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name={action.icon as any} size={28} color="#16A34A" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* News & Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>कृषि समाचार</Text>
        {newsUpdates.map((news) => (
          <TouchableOpacity key={news.id} style={styles.newsCard}>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsSummary}>{news.summary}</Text>
              <Text style={styles.newsTime}>{news.time}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Voice Interaction Button */}
      <TouchableOpacity style={styles.voiceButton}>
        <Ionicons name="mic" size={28} color="white" />
        <Text style={styles.voiceButtonText}>आवाज में पूछें</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  weatherCard: {
    backgroundColor: '#22C55E',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
    position: 'relative',
    overflow: 'visible',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    alignItems: 'flex-end',
    width: 160,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#16A34A',
    minWidth: 120,
  },
  dropdownButtonText: {
    color: '#16A34A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#16A34A',
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 6,
  },
  dropdownSearch: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F2937',
  },
  weatherInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherCondition: {
    fontSize: 18,
    color: 'white',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  location: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  humidity: {
    color: 'white',
    fontSize: 14,
  },
  farmerTip: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'italic',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#F0FDF4',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  newsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  newsSummary: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  newsTime: {
    fontSize: 12,
    color: '#9CA3AF',
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
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});