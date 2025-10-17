import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
import os
import tensorflow_datasets as tfds

dataset, info = tfds.load("plant_village", with_info=True, as_supervised=True)
def create_model(num_classes):
    # Load ResNet50 as base model
    base_model = ResNet50(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )
    
    # Add custom layers
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    # Freeze base model layers
    for layer in base_model.layers:
        layer.trainable = False
        
    return model

def train_model(train_dir, validation_dir, num_classes, epochs=10):
    # Data augmentation for training
    train_datagen = ImageDataGenerator(
        preprocessing_function=tf.keras.applications.resnet50.preprocess_input,
        rotation_range=40,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    # Only rescaling for validation
    validation_datagen = ImageDataGenerator(
        preprocessing_function=tf.keras.applications.resnet50.preprocess_input
    )

    # Create generators
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    validation_generator = validation_datagen.flow_from_directory(
        validation_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    # Create and compile model
    model = create_model(num_classes)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # Train model
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        epochs=epochs,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // validation_generator.batch_size
    )

    # Save model
    model.save('model/plant_disease_model.h5')
    
    return history, model

if __name__ == "__main__":
    # Example usage:
    # Assuming your data is organized like this:
    # data/
    #   train/
    #     tomato_early_blight/
    #     tomato_late_blight/
    #     tomato_healthy/
    #   validation/
    #     tomato_early_blight/
    #     tomato_late_blight/
    #     tomato_healthy/
    
    train_dir = 'data/train'
    validation_dir = 'data/validation'
    num_classes = len(os.listdir(train_dir))  # Number of disease categories
    
    history, model = train_model(train_dir, validation_dir, num_classes)
    print("Model training completed and saved to model/plant_disease_model.h5")

   

train_dir = "data/train"
val_dir = "data/validation"

img_size = (224, 224)
batch_size = 32

train_gen = ImageDataGenerator(rescale=1./255)
val_gen = ImageDataGenerator(rescale=1./255)

train_data = train_gen.flow_from_directory(train_dir, target_size=img_size, batch_size=batch_size, class_mode='categorical')
val_data = val_gen.flow_from_directory(val_dir, target_size=img_size, batch_size=batch_size, class_mode='categorical')

model = tf.keras.applications.MobileNetV2(weights=None, input_shape=(224, 224, 3), classes=train_data.num_classes)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(train_data, validation_data=val_data, epochs=10)
model.save("app/model/plant_disease_model.h5")