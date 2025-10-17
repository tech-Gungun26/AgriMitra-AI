import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from PIL import Image

# Dictionary mapping class indices to plant diseases and remedies
PLANT_DISEASES = {
    0: {
        "plant": "Tomato",
        "disease": "Leaf Blight",
        "remedy": "Use copper-based fungicides and avoid overwatering. Remove infected leaves and maintain good air circulation."
    },
    1: {
        "plant": "Tomato",
        "disease": "Leaf Curl Virus",
        "remedy": "Remove infected leaves and use neem oil spray. Control whitefly population as they spread the virus."
    },
    2: {
        "plant": "Potato",
        "disease": "Early Blight",
        "remedy": "Apply fungicides containing chlorothalonil or copper. Maintain proper plant spacing and avoid overhead irrigation."
    },
    3: {
        "plant": "Potato",
        "disease": "Late Blight",
        "remedy": "Use protective fungicides and remove infected plants. Plant resistant varieties and maintain good drainage."
    },
    # Add more disease classes as needed
}

class PlantDiseasePredictor:
    def __init__(self):
        # Initialize ResNet50 model with ImageNet weights as base
        self.base_model = ResNet50(
            weights='imagenet',
            include_top=False,
            input_shape=(224, 224, 3)
        )
        
        # Add custom layers for our specific task
        x = self.base_model.output
        x = tf.keras.layers.GlobalAveragePooling2D()(x)
        x = tf.keras.layers.Dense(1024, activation='relu')(x)
        x = tf.keras.layers.Dropout(0.5)(x)
        predictions = tf.keras.layers.Dense(len(PLANT_DISEASES), activation='softmax')(x)
        
        self.model = tf.keras.Model(inputs=self.base_model.input, outputs=predictions)
        
        # Load trained weights if available
        try:
            self.model.load_weights('model/plant_disease_model.h5')
        except:
            print("No pre-trained weights found. Model will need training.")

    def preprocess_image(self, image: Image.Image) -> np.ndarray:
        """Preprocess image for model prediction"""
        # Resize image to 224x224
        image = image.resize((224, 224))
        
        # Convert to array and expand dimensions
        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        
        # Preprocess for ResNet50
        return preprocess_input(image_array)

    def predict(self, image: Image.Image) -> dict:
        """Predict plant disease from image"""
        # Preprocess image
        processed_image = self.preprocess_image(image)
        
        # Get model predictions
        predictions = self.model.predict(processed_image)
        
        # Get the most likely class
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        # Get disease info
        result = PLANT_DISEASES.get(predicted_class, {
            "plant": "Unknown",
            "disease": "Unknown",
            "remedy": "Please consult an agricultural expert."
        })
        
        # Add confidence score
        result["confidence"] = confidence
        
        return result

# Create singleton instance
predictor = PlantDiseasePredictor()