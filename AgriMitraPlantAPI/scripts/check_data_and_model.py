from pathlib import Path
import sys

base = Path(__file__).resolve().parents[1]
train_dir = base / 'data' / 'train'
val_dir = base / 'data' / 'validation'

for d in [train_dir, val_dir]:
    print('\nChecking:', d)
    if not d.exists():
        print('  Directory does not exist')
        continue
    for cls in sorted([p for p in d.iterdir() if p.is_dir()], key=lambda x: x.name):
        count = sum(1 for f in cls.rglob('*') if f.suffix.lower() in ['.jpg','.jpeg','.png'])
        samples = list(cls.glob('*'))[:3]
        print(f'  Class: {cls.name} - {count} images - samples: {[s.name for s in samples]}')

# Check for model files
model_paths = [base / 'model' / 'plant_disease_model.h5', base / 'app' / 'model' / 'plant_disease_model.h5']
for mp in model_paths:
    if mp.exists():
        print('\nModel found:', mp, 'size:', mp.stat().st_size)
    else:
        print('\nModel not found at', mp)

print('\nDone')