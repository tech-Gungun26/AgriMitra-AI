import tensorflow as tf
import numpy as np
from PIL import Image

# Load model once at import time
MODEL_PATH = "app/model/plant_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# List your class labels in the same order as training
CLASS_NAMES = ["Healthy", "Leaf_Spot", "Blight", "Nutrient_Deficiency"]

def preprocess_image(image: Image.Image):
    """Resize and normalize image for model prediction"""
    image = image.convert("RGB").resize((224, 224))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_plant(image: Image.Image) -> str:
    """Predict plant condition from an image"""
    img_array = preprocess_image(image)
    preds = model.predict(img_array)
    predicted_class = CLASS_NAMES[np.argmax(preds)]
    confidence = float(np.max(preds))
    return f"{predicted_class} ({confidence:.2f})"
