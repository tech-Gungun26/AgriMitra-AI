from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import PlantAnalysis
from app.predict import predictor
from PIL import Image
import io
from datetime import datetime

router = APIRouter()

@router.post("/analyze-plant")
async def analyze_plant(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Get prediction
        result = predictor.predict(image)
        
        # Create DB record
        analysis = PlantAnalysis(
            filename=file.filename,
            plant_name=result["plant"],
            disease_name=result["disease"],
            confidence_score=result["confidence"],
            remedy=result["remedy"],
            timestamp=datetime.utcnow()
        )
        
        # Save to database
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
        
        # Return result
        return {
            "id": analysis.id,
            "plant": result["plant"],
            "disease": result["disease"],
            "confidence": result["confidence"],
            "remedy": result["remedy"],
            "timestamp": analysis.timestamp
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
def get_analysis_history(db: Session = Depends(get_db)):
    """Get history of plant analysis requests"""
    analyses = db.query(PlantAnalysis).order_by(PlantAnalysis.timestamp.desc()).all()
    return [
        {
            "id": analysis.id,
            "filename": analysis.filename,
            "plant": analysis.plant_name,
            "disease": analysis.disease_name,
            "confidence": analysis.confidence_score,
            "remedy": analysis.remedy,
            "timestamp": analysis.timestamp
        }
        for analysis in analyses
    ]