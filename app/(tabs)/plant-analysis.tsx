import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function PlantAnalysisScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Disease information mapping
  const diseaseInfo: Record<string, any> = {
    'tomato_early_blight': {
      name: 'टमाटर का अर्ली ब्लाइट रोग',
      symptoms: [
        'पत्तियों पर गोल या अंडाकार भूरे धब्बे',
        'धब्बों के चारों ओर पीला घेरा',
        'पुरानी पत्तियां पहले प्रभावित'
      ],
      remedies: [
        'कॉपर आधारित फफूंदनाशक का छिड़काव',
        'प्रभावित पत्तियों को हटाएं',
        'पौधों के बीच हवा का प्रवाह बढ़ाएं',
        'सिंचाई पत्तियों पर नहीं करें'
      ],
      prevention: [
        'रोग प्रतिरोधी किस्में चुनें',
        'फसल चक्र अपनाएं',
        'स्वच्छ खेती करें'
      ]
    },
    'tomato_late_blight': {
      name: 'टमाटर का लेट ब्लाइट रोग',
      symptoms: [
        'पत्तियों पर गहरे भूरे या काले धब्बे',
        'नम मौसम में सफेद फफूंद',
        'फल पर भूरे धब्बे'
      ],
      remedies: [
        'मैंकोजेब का छिड़काव करें',
        'अधिक पानी न दें',
        'रोगी पौधों को नष्ट करें'
      ],
      prevention: [
        'उचित जल निकासी',
        'पौधों के बीच पर्याप्त दूरी',
        'प्रतिरोधी किस्मों का चयन'
      ]
    },
    'tomato_healthy': {
      name: 'स्वस्थ टमाटर का पौधा',
      symptoms: [
        'पत्तियां हरी और स्वस्थ',
        'कोई रोग के लक्षण नहीं',
        'सामान्य विकास'
      ],
      remedies: [
        'नियमित देखभाल जारी रखें',
        'संतुलित पोषण दें',
        'नियमित निरीक्षण करें'
      ],
      prevention: [
        'स्वच्छ वातावरण बनाए रखें',
        'समय पर सिंचाई करें',
        'उचित पोषण दें'
      ]
    }
  };

  // Analyze image using our trained model
  const analyzeImage = async (imageUri: string) => {
    try {
      setIsAnalyzing(true);
      
      // Create form data for image upload
      const formData = new FormData();
      const imageDetails = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'plant_image.jpg'
      };
      formData.append('file', imageDetails as any);

      // Make API call to our FastAPI server
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (result.error) {
        Alert.alert('Error', 'Failed to analyze image. Please try again.');
        return;
      }

      // Map the prediction to Hindi information
      const disease = result.prediction;
      const confidence = Math.round(result.confidence * 100);
      const diseaseDetails = diseaseInfo[disease] || {
        name: disease,
        symptoms: ['Information not available'],
        remedies: ['Information not available'],
        prevention: ['Information not available']
      };

      setAnalysisResult({
        disease: diseaseDetails.name,
        confidence: confidence,
        symptoms: diseaseDetails.symptoms,
        remedies: diseaseDetails.remedies,
        prevention: diseaseDetails.prevention
      });

    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert('Error', 'Failed to analyze image. Please check your internet connection and try again.');
    } finally {
      setIsAnalyzing(false);
      setShowCamera(false);
    }
  };

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      if (photo?.uri) {
        analyzeImage(photo.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
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
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
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