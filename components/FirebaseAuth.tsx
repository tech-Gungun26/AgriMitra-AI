import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface FirebaseAuthProps {
  onAuthSuccess: (user: any) => void;
}

export default function FirebaseAuth({ onAuthSuccess }: FirebaseAuthProps) {
  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    if (authMode === 'phone' && phoneNumber.length < 10) {
      Alert.alert('त्रुटि', 'कृपया सही फोन नंबर डालें');
      return;
    }
    if (authMode === 'email' && !email.includes('@')) {
      Alert.alert('त्रुटि', 'कृपया सही ईमेल पता डालें');
      return;
    }

    setIsLoading(true);
    // Simulate Firebase OTP sending
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      Alert.alert('सफल', 'OTP भेजा गया है');
    }, 1000);
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('त्रुटि', 'कृपया 6 अंकों का OTP डालें');
      return;
    }

    setIsLoading(true);
    // Simulate Firebase OTP verification
    setTimeout(() => {
      setIsLoading(false);
      const mockUser = {
        uid: 'mock-user-id',
        phoneNumber: authMode === 'phone' ? phoneNumber : null,
        email: authMode === 'email' ? email : null,
        displayName: 'राम कुमार'
      };
      onAuthSuccess(mockUser);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.authCard}>
        <View style={styles.header}>
          <Text style={styles.logo}>🌾 AgriMitra AI</Text>
          <Text style={styles.subtitle}>किसानों का AI सहायक</Text>
        </View>

        {!isOtpSent ? (
          <>
            {/* Auth Mode Toggle */}
            <View style={styles.authModeToggle}>
              <TouchableOpacity
                style={[styles.toggleButton, authMode === 'phone' && styles.activeToggle]}
                onPress={() => setAuthMode('phone')}
              >
                <Ionicons name="call" size={16} color={authMode === 'phone' ? 'white' : '#6B7280'} />
                <Text style={[styles.toggleText, authMode === 'phone' && styles.activeToggleText]}>
                  फोन
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, authMode === 'email' && styles.activeToggle]}
                onPress={() => setAuthMode('email')}
              >
                <Ionicons name="mail" size={16} color={authMode === 'email' ? 'white' : '#6B7280'} />
                <Text style={[styles.toggleText, authMode === 'email' && styles.activeToggleText]}>
                  ईमेल
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Field */}
            <View style={styles.inputContainer}>
              <Ionicons 
                name={authMode === 'phone' ? 'call' : 'mail'} 
                size={20} 
                color="#6B7280" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder={authMode === 'phone' ? 'फोन नंबर (+91)' : 'ईमेल पता'}
                value={authMode === 'phone' ? phoneNumber : email}
                onChangeText={authMode === 'phone' ? setPhoneNumber : setEmail}
                keyboardType={authMode === 'phone' ? 'phone-pad' : 'email-address'}
              />
            </View>

            <TouchableOpacity 
              style={[styles.sendOtpButton, isLoading && styles.disabledButton]}
              onPress={sendOtp}
              disabled={isLoading}
            >
              {isLoading && <Text style={styles.buttonText}>भेजा जा रहा...</Text>}
              {!isLoading && <Text style={styles.buttonText}>OTP भेजें</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* OTP Input */}
            <Text style={styles.otpInfo}>
              OTP भेजा गया है {authMode === 'phone' ? phoneNumber : email} पर
            </Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="key" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="6 अंकों का OTP डालें"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            <TouchableOpacity 
              style={[styles.verifyButton, isLoading && styles.disabledButton]}
              onPress={verifyOtp}
              disabled={isLoading}
            >
              {isLoading && <Text style={styles.buttonText}>सत्यापित हो रहा...</Text>}
              {!isLoading && <Text style={styles.buttonText}>OTP सत्यापित करें</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resendButton}
              onPress={() => setIsOtpSent(false)}
            >
              <Text style={styles.resendText}>दोबारा भेजें</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.disclaimer}>
          साइन इन करके आप हमारी गोपनीयता नीति और उपयोग की शर्तों से सहमत होते हैं
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authCard: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16A34A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  authModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#16A34A',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 6,
  },
  activeToggleText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  sendOtpButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  otpInfo: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  resendButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#16A34A',
    fontSize: 14,
    fontWeight: '500',
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
});