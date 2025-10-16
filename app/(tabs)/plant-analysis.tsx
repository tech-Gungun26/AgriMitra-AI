import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function PlantAnalysisScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock analysis function (replace with Vertex AI Vision)
  const analyzeImage = async () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setAnalysisResult({
        disease: 'टमाटर का झुलसा रोग',
        confidence: 92,
        symptoms: [
          'पत्तियों पर भूरे धब्बे',
          'पत्तियों का पीला होना',
          'फल पर काले निशान'
        ],
        remedies: [
          'कॉपर सल्फेट का छिड़काव करें',
          'प्रभावित पत्तियों को हटा दें',
          'नीम का तेल का उपयोग करें',
          'पानी कम दें और हवादार जगह रखें'
        ],
        prevention: [
          'बीज बोने से पहले कीटाणुशोधन करें',
          'खेत में पानी जमा न होने दें',
          'फसल चक्रण अपनाएं'
        ]
      });
      setIsAnalyzing(false);
      setShowCamera(false);
    }, 2000);
  };

  const takePicture = () => {
    // Mock camera capture
    analyzeImage();
  };

  if (showCamera) {
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>कैमरा की अनुमति चाहिए</Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>अनुमति दें</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
            >
              <Ionicons name="camera" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>पौधा रोग निदान</Text>
        <Text style={styles.subtitle}>AI से पौधों की बीमारी पहचानें</Text>
      </View>

      {/* Camera Section */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.cameraCard}
          onPress={() => setShowCamera(true)}
        >
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={48} color="#16A34A" />
          </View>
          <Text style={styles.cameraText}>पौधे की फोटो लें</Text>
          <Text style={styles.cameraSubtext}>AI तुरंत बीमारी की पहचान करेगा</Text>
        </TouchableOpacity>
      </View>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>AI विश्लेषण हो रहा है...</Text>
          <Text style={styles.loadingSubtext}>कृपया प्रतीक्षा करें</Text>
        </View>
      )}

      {/* Analysis Result */}
      {analysisResult && (
        <View style={styles.section}>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.diseaseTitle}>{analysisResult.disease}</Text>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{analysisResult.confidence}% सटीक</Text>
              </View>
            </View>

            {/* Symptoms */}
            <View style={styles.resultSection}>
              <Text style={styles.resultSectionTitle}>🔍 लक्षण:</Text>
              {analysisResult.symptoms.map((symptom: string, index: number) => (
                <Text key={index} style={styles.listItem}>• {symptom}</Text>
              ))}
            </View>

            {/* Remedies */}
            <View style={styles.resultSection}>
              <Text style={styles.resultSectionTitle}>💊 उपचार:</Text>
              {analysisResult.remedies.map((remedy: string, index: number) => (
                <Text key={index} style={styles.listItem}>• {remedy}</Text>
              ))}
            </View>

            {/* Prevention */}
            <View style={styles.resultSection}>
              <Text style={styles.resultSectionTitle}>🛡️ बचाव:</Text>
              {analysisResult.prevention.map((prevention: string, index: number) => (
                <Text key={index} style={styles.listItem}>• {prevention}</Text>
              ))}
            </View>

            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="volume-high" size={20} color="white" />
              <Text style={styles.voiceButtonText}>आवाज में सुनें</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>कैसे करें इस्तेमाल:</Text>
        <View style={styles.instructionCard}>
          <View style={styles.instruction}>
            <Text style={styles.instructionNumber}>1</Text>
            <Text style={styles.instructionText}>बीमार पौधे की साफ फोटो लें</Text>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.instructionNumber}>2</Text>
            <Text style={styles.instructionText}>AI 2-3 सेकंड में परिणाम देगा</Text>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.instructionNumber}>3</Text>
            <Text style={styles.instructionText}>दिए गए उपचार को फॉलो करें</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4', // match home soft green
  },
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#14532D',
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 6,
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  cameraCard: {
    backgroundColor: 'white',
    padding: 28,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cameraIcon: {
    width: 96,
    height: 96,
    backgroundColor: '#F0FDF4',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  cameraText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#14532D',
    marginBottom: 6,
  },
  cameraSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 50,
  },
  captureButton: {
    width: 88,
    height: 88,
    backgroundColor: '#16A34A',
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  loadingCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DC2626',
    flex: 1,
  },
  confidenceBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  resultSection: {
    marginBottom: 20,
  },
  resultSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 4,
    paddingLeft: 8,
  },
  voiceButton: {
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  voiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  instructionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 30,
    height: 30,
    backgroundColor: '#22C55E',
    color: 'white',
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  button: {
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});