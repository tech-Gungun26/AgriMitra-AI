import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SchemesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('सभी');

  const categories = ['सभी', 'लोन', 'बीमा', 'सब्सिडी', 'प्रशिक्षण'];

  const schemes = [
    {
      id: '1',
      title: 'प्रधानमंत्री किसान सम्मान निधि',
      category: 'सब्सिडी',
      description: 'छोटे और सीमांत किसानों को प्रति वर्ष 6000 रुपये की आर्थिक सहायता। यह राशि तीन बराबर किस्तों में दी जाती है।',
      eligibility: 'भूमि का मालिक होना जरूरी, 2 हेक्टेयर तक जमीन',
      benefits: '₹6,000 प्रति वर्ष',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज'],
      apply: 'https://pmkisan.gov.in',
      isNew: false
    },
    {
      id: '2',
      title: 'प्रधानमंत्री फसल बीमा योजना',
      category: 'बीमा',
      description: 'प्राकृतिक आपदाओं से फसल नुकसान की स्थिति में किसानों को बीमा राशि। कम प्रीमियम पर व्यापक कवरेज मिलता है।',
      eligibility: 'सभी किसान (मालिक और किराएदार दोनों)',
      benefits: 'फसल की लागत का पूरा मुआवजा',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज', 'बुआई प्रमाण पत्र'],
      apply: 'https://pmfby.gov.in',
      isNew: false
    },
    {
      id: '3',
      title: 'किसान क्रेडिट कार्ड',
      category: 'लोन',
      description: 'कृषि और संबद्ध गतिविधियों के लिए आसान ऋण। फसल की खेती से लेकर मछली पालन तक के लिए वित्तीय सहायता।',
      eligibility: 'सभी किसान (व्यक्तिगत/संयुक्त खेती करने वाले)',
      benefits: '3 लाख तक बिना गारंटी, कम ब्याज दर',
      documents: ['आधार कार्ड', 'पैन कार्ड', 'भूमि दस्तावेज', 'पासपोर्ट फोटो'],
      apply: 'नजदीकी बैंक',
      isNew: false
    },
    {
      id: '4',
      title: 'पीएम-किसान FPO योजना',
      category: 'प्रशिक्षण',
      description: 'किसान उत्पादक संगठनों को बढ़ावा देने के लिए। सामूहिक खेती और मार्केटिंग के लिए वित्तीय सहायता।',
      eligibility: 'किसान उत्पादक संगठन (FPO)',
      benefits: '₹15 लाख तक की सहायता',
      documents: ['FPO रजिस्ट्रेशन', 'सदस्यों की सूची', 'बैंक खाता'],
      apply: 'https://sfac.in',
      isNew: true
    }
  ];

  const filteredSchemes = selectedCategory === 'सभी' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  const speakScheme = (scheme: any) => {
    // Placeholder for Text-to-Speech functionality
    console.log('Speaking scheme:', scheme.title);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>सरकारी योजनाएं</Text>
        <Text style={styles.subtitle}>किसानों के लिए सरकारी सहायता</Text>
      </View>

      {/* Category Filter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>श्रेणी चुनें:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Schemes List */}
      <View style={styles.section}>
        {filteredSchemes.map((scheme) => (
          <View key={scheme.id} style={styles.schemeCard}>
            <View style={styles.schemeHeader}>
              <View style={styles.schemeTitleContainer}>
                <Text style={styles.schemeTitle}>{scheme.title}</Text>
                {scheme.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>नई</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity 
                style={styles.speakerButton}
                onPress={() => speakScheme(scheme)}
              >
                <Ionicons name="volume-high" size={20} color="#16A34A" />
              </TouchableOpacity>
            </View>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{scheme.category}</Text>
            </View>

            <Text style={styles.schemeDescription}>{scheme.description}</Text>

            <View style={styles.schemeDetails}>
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>💰 लाभ:</Text>
                <Text style={styles.detailText}>{scheme.benefits}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>✅ पात्रता:</Text>
                <Text style={styles.detailText}>{scheme.eligibility}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>📄 जरूरी दस्तावेज:</Text>
                {scheme.documents.map((doc, index) => (
                  <Text key={index} style={styles.documentItem}>• {doc}</Text>
                ))}
              </View>
            </View>

            <View style={styles.schemeActions}>
              <TouchableOpacity style={styles.applyButton}>
                <Ionicons name="link" size={16} color="white" />
                <Text style={styles.applyButtonText}>आवेदन करें</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share" size={16} color="#16A34A" />
                <Text style={styles.shareButtonText}>साझा करें</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Help Section */}
      <View style={styles.section}>
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>सहायता चाहिए?</Text>
          <Text style={styles.helpText}>हमारे एक्सपर्ट से बात करें और योजनाओं के बारे में विस्तार से जानें</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="call" size={18} color="white" />
            <Text style={styles.helpButtonText}>हेल्पलाइन: 1800-123-4567</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  categoryScroll: {
    marginTop: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: '#22C55E',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  selectedCategoryText: {
    color: 'white',
  },
  schemeCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  schemeTitleContainer: {
    flex: 1,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 24,
  },
  newBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  speakerButton: {
    padding: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
  },
  categoryBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryBadgeText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '600',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  schemeDetails: {
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 18,
  },
  documentItem: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    marginBottom: 2,
  },
  schemeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  shareButton: {
    borderWidth: 1,
    borderColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#16A34A',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  helpCard: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#A16207',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  helpButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});