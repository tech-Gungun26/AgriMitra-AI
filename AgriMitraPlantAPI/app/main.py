from fastapi import FastAPI, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base   # Base comes from database.py
from app.models import PlantAnalysis                  # models only for ORM classes
from app.model import predict_plant
from PIL import Image
import io



# Create tables if not exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/analyze-plant/")
async def analyze_plant(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Read image
    image = Image.open(io.BytesIO(await file.read()))
    
    # Make prediction
    prediction = predict_plant(image)
    
    # Save to DB
    record = PlantAnalysis(filename=file.filename, prediction=prediction)
    db.add(record)
    db.commit()
    db.refresh(record)
    
    return {
        "id": record.id,
        "filename": record.filename,
        "prediction": record.prediction,
        "timestamp": record.timestamp
    }

@app.get("/history/")
def get_history(db: Session = Depends(get_db)):
    records = db.query(PlantAnalysis).all()
    return [
        {"id": r.id, "filename": r.filename, "prediction": r.prediction, "timestamp": r.timestamp}
        for r in records
    ]
