import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'राम कुमार',
    phone: '+91 98765 43210',
    email: 'ram.kumar@example.com',
    dateOfBirth: '15-08-1980',
    location: 'गाजियाबाद, उत्तर प्रदेश',
    language: 'हिंदी',
    landSize: '2.5 एकड़',
    crops: ['गेहूं', 'धान', 'सरसों']
  });

  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    priceAlerts: true,
    schemeUpdates: true,
    marketNews: false
  });

  const languages = ['हिंदी', 'English', 'ಕನ್ನಡ', 'தமிழ்', 'తెలుగు', 'ગુજરાતી', 'ਪੰਜਾਬੀ'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={40} color="#16A34A" />
          </View>
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userLocation}>{user.location}</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>व्यक्तिगत जानकारी</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>नाम:</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>फोन:</Text>
            <Text style={styles.infoValue}>{user.phone}</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ईमेल:</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>जन्म तिथि:</Text>
            <Text style={styles.infoValue}>{user.dateOfBirth}</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Farm Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>खेती की जानकारी</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>जमीन का आकार:</Text>
            <Text style={styles.infoValue}>{user.landSize}</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.cropsList}>
            <Text style={styles.infoLabel}>मुख्य फसलें:</Text>
            <View style={styles.cropsContainer}>
              {user.crops.map((crop, index) => (
                <View key={index} style={styles.cropChip}>
                  <Text style={styles.cropText}>{crop}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.addCropButton}>
                <Ionicons name="add" size={16} color="#16A34A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Language Preference */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>भाषा सेटिंग्स</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>पसंदीदा भाषा:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.languageScroll}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.languageChip,
                  user.language === language && styles.selectedLanguageChip
                ]}
                onPress={() => setUser({...user, language})}
              >
                <Text style={[
                  styles.languageText,
                  user.language === language && styles.selectedLanguageText
                ]}>
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>सूचना सेटिंग्स</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.notificationItem}>
            <View>
              <Text style={styles.notificationTitle}>मौसम अलर्ट</Text>
              <Text style={styles.notificationSubtitle}>बारिश और मौसम की जानकारी</Text>
            </View>
            <Switch
              value={notifications.weatherAlerts}
              onValueChange={(value) => setNotifications({...notifications, weatherAlerts: value})}
              trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
              thumbColor={notifications.weatherAlerts ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View>
              <Text style={styles.notificationTitle}>मंडी भाव अलर्ट</Text>
              <Text style={styles.notificationSubtitle}>कीमतों में बदलाव की सूचना</Text>
            </View>
            <Switch
              value={notifications.priceAlerts}
              onValueChange={(value) => setNotifications({...notifications, priceAlerts: value})}
              trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
              thumbColor={notifications.priceAlerts ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View>
              <Text style={styles.notificationTitle}>योजना अपडेट</Text>
              <Text style={styles.notificationSubtitle}>नई सरकारी योजनाओं की जानकारी</Text>
            </View>
            <Switch
              value={notifications.schemeUpdates}
              onValueChange={(value) => setNotifications({...notifications, schemeUpdates: value})}
              trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
              thumbColor={notifications.schemeUpdates ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View>
              <Text style={styles.notificationTitle}>बाजार समाचार</Text>
              <Text style={styles.notificationSubtitle}>कृषि बाजार की ताजा खबरें</Text>
            </View>
            <Switch
              value={notifications.marketNews}
              onValueChange={(value) => setNotifications({...notifications, marketNews: value})}
              trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
              thumbColor={notifications.marketNews ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ऐप सेटिंग्स</Text>
        
        <View style={styles.infoCard}>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="shield-checkmark" size={20} color="#16A34A" />
            <Text style={styles.settingText}>गोपनीयता सेटिंग्स</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="help-circle" size={20} color="#16A34A" />
            <Text style={styles.settingText}>सहायता और सपोर्ट</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="information-circle" size={20} color="#16A34A" />
            <Text style={styles.settingText}>ऐप के बारे में</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="star" size={20} color="#16A34A" />
            <Text style={styles.settingText}>ऐप को रेट करें</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>लॉग आउट</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#22C55E',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: '#16A34A',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: '#6B7280',
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
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    flex: 2,
    textAlign: 'right',
    marginRight: 12,
  },
  cropsList: {
    paddingVertical: 12,
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  cropChip: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  cropText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '500',
  },
  addCropButton: {
    backgroundColor: '#22C55E',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageScroll: {
    marginTop: 12,
  },
  languageChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedLanguageChip: {
    backgroundColor: '#22C55E',
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  selectedLanguageText: {
    color: 'white',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  notificationSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 8,
  },
});