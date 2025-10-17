from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load model and class mapping at startup
model = None
class_mapping = None

@app.on_event("startup")
async def load_model():
    global model, class_mapping
    try:
        model = tf.keras.models.load_model('plant_disease_model.h5')
        with open('class_mapping.json', 'r') as f:
            class_mapping = json.load(f)
        print("Model and class mapping loaded successfully!")
    except Exception as e:
        print(f"Error loading model or class mapping: {str(e)}")

def preprocess_image(image_bytes):
    """Preprocess the uploaded image"""
    # Open image from bytes
    img = Image.open(io.BytesIO(image_bytes))
    
    # Convert RGBA to RGB if needed
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    
    # Resize to match training size
    img = img.resize((224, 224))
    
    # Convert to array and normalize
    img_array = np.array(img) / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, 0)
    return img_array

@app.post("/predict/")
async def predict_disease(file: UploadFile = File(...)):
    """
    Endpoint to predict plant disease from uploaded image
    """
    try:
        # Verify model is loaded
        if model is None or class_mapping is None:
            return {"error": "Model or class mapping not loaded"}
        
        # Read and preprocess the image
        contents = await file.read()
        img = preprocess_image(contents)
        
        # Make prediction
        predictions = model.predict(img)
        predicted_class_index = np.argmax(predictions[0])
        
        # Get class name and confidence
        index_to_class = {v: k for k, v in class_mapping.items()}
        predicted_class = index_to_class[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])
        
        # Get all class probabilities
        all_probabilities = {
            index_to_class[i]: float(prob) 
            for i, prob in enumerate(predictions[0])
        }
        
        return {
            "prediction": predicted_class,
            "confidence": confidence,
            "all_probabilities": all_probabilities
        }
        
    except Exception as e:
        return {"error": str(e)}

# For testing the API
@app.get("/")
async def root():
    return {"message": "Plant Disease Detection API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)