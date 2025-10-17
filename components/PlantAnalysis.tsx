interface PredictionResult {
    prediction: string;
    confidence: number;
    all_probabilities: Record<string, number>;
    error?: string;
}

const analyzePlantDisease = async (imageUri: string) => {
    try {
        // Create form data
        const formData = new FormData();
        const imageDetails = {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'plant_image.jpg'
        };
        formData.append('file', imageDetails as any); // Type assertion needed for React Native's FormData

        // Make API call
        const response = await fetch('http://your-api-url:8000/predict/', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const result = await response.json() as PredictionResult;

        if (result.error) {
            console.error('Prediction error:', result.error);
            return null;
        }

        return {
            disease: result.prediction,
            confidence: (result.confidence * 100).toFixed(2) + '%',
            allProbabilities: Object.entries(result.all_probabilities).map(([disease, probability]) => ({
                disease,
                probability: (probability * 100).toFixed(2) + '%'
            }))
        };
    } catch (error) {
        console.error('Error analyzing plant disease:', error);
        return null;
    }
};