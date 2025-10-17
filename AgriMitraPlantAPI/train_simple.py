import tensorflow as tf
from tensorflow.keras.applications import ResNet50
import os
import numpy as np
from PIL import Image

# Constants
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10

def load_and_preprocess_image(path):
    """Load and preprocess a single image"""
    image = Image.open(path)
    image = image.resize(IMG_SIZE)
    image = np.array(image) / 255.0
    return image

def create_model(num_classes):
    """Create the model architecture"""
    base_model = ResNet50(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )
    
    # Freeze the base model
    base_model.trainable = False
    
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

def load_dataset(data_dir):
    """Load images and labels from directory"""
    images = []
    labels = []
    label_to_index = {}
    current_label = 0
    
    # Walk through the directory
    for class_name in os.listdir(data_dir):
        label_to_index[class_name] = current_label
        class_path = os.path.join(data_dir, class_name)
        
        if os.path.isdir(class_path):
            for image_name in os.listdir(class_path):
                image_path = os.path.join(class_path, image_name)
                try:
                    image = load_and_preprocess_image(image_path)
                    images.append(image)
                    labels.append(current_label)
                except Exception as e:
                    print(f"Error loading {image_path}: {str(e)}")
        
        current_label += 1
    
    return np.array(images), np.array(labels), label_to_index

def main():
    # Paths to your synthetic dataset
    base_dir = os.path.dirname(os.path.abspath(__file__))
    train_dir = os.path.join(base_dir, 'data', 'train')
    val_dir = os.path.join(base_dir, 'data', 'validation')
    
    print("Loading training data...")
    train_images, train_labels, label_to_index = load_dataset(train_dir)
    print("Loading validation data...")
    val_images, val_labels, _ = load_dataset(val_dir)
    
    num_classes = len(label_to_index)
    print(f"Number of classes: {num_classes}")
    print("Class mapping:", label_to_index)
    
    # Convert labels to one-hot encoding
    train_labels = tf.keras.utils.to_categorical(train_labels, num_classes)
    val_labels = tf.keras.utils.to_categorical(val_labels, num_classes)
    
    # Create and compile model
    model = create_model(num_classes)
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Train the model
    history = model.fit(
        train_images,
        train_labels,
        validation_data=(val_images, val_labels),
        epochs=EPOCHS,
        batch_size=BATCH_SIZE
    )
    
    # Save the model
    model.save('plant_disease_model.h5')
    print("Model saved successfully!")
    
    # Save class mapping
    import json
    with open('class_mapping.json', 'w') as f:
        json.dump(label_to_index, f)
    print("Class mapping saved successfully!")

if __name__ == "__main__":
    main()