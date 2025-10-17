import tensorflow_datasets as tfds
from pathlib import Path
from PIL import Image
import numpy as np

base = Path(__file__).resolve().parents[1]
train_dir = base / 'data' / 'train'
val_dir = base / 'data' / 'validation'

# Create directories
(train_dir / 'tomato_early_blight').mkdir(parents=True, exist_ok=True)
(train_dir / 'tomato_late_blight').mkdir(parents=True, exist_ok=True)
(train_dir / 'tomato_healthy').mkdir(parents=True, exist_ok=True)

(val_dir / 'tomato_early_blight').mkdir(parents=True, exist_ok=True)
(val_dir / 'tomato_late_blight').mkdir(parents=True, exist_ok=True)
(val_dir / 'tomato_healthy').mkdir(parents=True, exist_ok=True)

print('Loading TFDS plant_village (this may download ~100-200MB)')
# Force TFDS to use a short data directory to avoid long Windows paths
tfds_data_dir = 'C:/tfds'
# Load dataset info to map labels
ds_info = tfds.builder('plant_village').info
# Load a small subset (use split to limit) and point data_dir to short path
dataset = tfds.load('plant_village', split='train[:1000]', as_supervised=True, data_dir=tfds_data_dir)

# Mapping of TFDS labels to our folder names - TFDS label names vary; we'll inspect names via info if needed
# We'll iterate and save up to N images per class
N_train = 10
N_val = 5

# Build a mapping from TFDS label names to our class folders (lowercased with _)
tfds_labels = ds_info.features['label'].names if 'label' in ds_info.features else []
label_map = {}
for name in tfds_labels:
    key = name.replace(' ', '_').replace('__', '___')
    label_map[name] = key

counters_train = {k: 0 for k in ['Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___healthy']}
counters_val = {k: 0 for k in ['Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___healthy']}

# Save images
for img, label in dataset.take(300):
    arr = img.numpy()
    pil = Image.fromarray(arr)
    # Map numeric label to text name
    try:
        label_name = ds_info.features['label'].names[int(label.numpy())]
    except Exception:
        # fallback
        label_name = None

    # Choose target class folder if it matches tomato classes
    if label_name and 'Tomato' in label_name:
        key = label_name.replace(' ', '_')
        target_folder = key.replace('___', '_').lower()
        cls_key = label_name.replace(' ', '_').replace('__', '___')
        if cls_key in counters_train and counters_train[cls_key] < N_train:
            idx = counters_train[cls_key]
            path = train_dir / cls_key.replace('___', '_').lower() / f'sample_{idx}.jpg'
            pil.save(path)
            counters_train[cls_key] += 1

    # stop early if we've filled all
    if all(v >= N_train for v in counters_train.values()):
        break

print('Saved training samples: ', counters_train)
print('Done')