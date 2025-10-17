import tensorflow as tf
import numpy as np
from PIL import Image
import json

def load_and_preprocess_image(image_path):
    """Load and preprocess a single image"""
    # Load image
    img = Image.open(image_path)
    # Resize to match training size
    img = img.resize((224, 224))
    # Convert to array and normalize
    img_array = np.array(img) / 255.0
    # Add batch dimension
    img_array = np.expand_dims(img_array, 0)
    return img_array

def predict_disease(image_path):
    try:
        # Load the trained model
        model = tf.keras.models.load_model('plant_disease_model.h5')
        
        # Load class mapping
        with open('class_mapping.json', 'r') as f:
            class_mapping = json.load(f)
        
        # Invert class mapping (convert indices to class names)
        index_to_class = {v: k for k, v in class_mapping.items()}
        
        # Load and preprocess the image
        img = load_and_preprocess_image(image_path)
        
        # Make prediction
        predictions = model.predict(img)
        predicted_class_index = np.argmax(predictions[0])
        predicted_class = index_to_class[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])
        
        print(f"\nImage: {image_path}")
        print(f"Predicted Disease: {predicted_class}")
        print(f"Confidence: {confidence:.2%}")
        
        # Show all class probabilities
        print("\nAll probabilities:")
        for i, prob in enumerate(predictions[0]):
            class_name = index_to_class[i]
            print(f"{class_name}: {prob:.2%}")
            
    except FileNotFoundError as e:
        print("Error: Model or class mapping file not found. Make sure both 'plant_disease_model.h5' and 'class_mapping.json' exist.")
    except Exception as e:
        print(f"Error during prediction: {str(e)}")

if __name__ == "__main__":
    # You can replace this with your image path
    image_path = input("Enter the path to your tomato plant image: ")
    predict_disease(image_path)