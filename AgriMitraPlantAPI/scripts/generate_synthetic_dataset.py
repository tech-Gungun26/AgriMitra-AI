import numpy as np
from PIL import Image, ImageDraw
from pathlib import Path
import os

# Setup paths
base = Path(__file__).resolve().parents[1]
train_dir = base / 'data' / 'train'
val_dir = base / 'data' / 'validation'

# Ensure directories exist
classes = ['tomato_early_blight', 'tomato_late_blight', 'tomato_healthy']
for cls in classes:
    (train_dir / cls).mkdir(parents=True, exist_ok=True)
    (val_dir / cls).mkdir(parents=True, exist_ok=True)

def create_synthetic_leaf(disease_type, size=(224, 224)):
    """Create a synthetic leaf image with disease patterns"""
    # Create base image (green leaf)
    img = Image.new('RGB', size, (50, 150, 50))
    draw = ImageDraw.Draw(img)
    
    # Add leaf shape
    draw.ellipse([20, 40, size[0]-20, size[1]-40], fill=(30, 120, 30))
    
    # Add disease patterns based on type
    if disease_type == 'early_blight':
        # Brown spots in concentric circles
        for i in range(5):
            x = np.random.randint(50, size[0]-50)
            y = np.random.randint(50, size[1]-50)
            for r in range(5, 20, 5):
                draw.ellipse([x-r, y-r, x+r, y+r], fill=(139, 69, 19))
                
    elif disease_type == 'late_blight':
        # Large irregular dark patches
        for _ in range(3):
            x = np.random.randint(50, size[0]-50)
            y = np.random.randint(50, size[1]-50)
            draw.polygon([(x, y), (x+40, y+20), (x+20, y+40)], fill=(45, 45, 45))
            
    elif disease_type == 'healthy':
        # Just add some variation in green
        for _ in range(10):
            x = np.random.randint(40, size[0]-40)
            y = np.random.randint(40, size[1]-40)
            r = np.random.randint(5, 15)
            draw.ellipse([x-r, y-r, x+r, y+r], fill=(40, 140, 40))
    
    return img

# Generate training images
print("Generating training images...")
n_train = 10
n_val = 5

# Training set
for cls in classes:
    disease_type = cls.split('_', 1)[1]  # Get disease type from class name
    for i in range(n_train):
        img = create_synthetic_leaf(disease_type)
        img.save(train_dir / cls / f'{disease_type}_{i:02d}.jpg')
        print(f"Created {cls} training image {i+1}/{n_train}")

# Validation set
for cls in classes:
    disease_type = cls.split('_', 1)[1]
    for i in range(n_val):
        img = create_synthetic_leaf(disease_type)
        img.save(val_dir / cls / f'{disease_type}_{i:02d}.jpg')
        print(f"Created {cls} validation image {i+1}/{n_val}")

print("\nDataset creation complete!")
print(f"Created {n_train} training and {n_val} validation images per class.")