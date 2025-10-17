from sqlalchemy import Column, Integer, String, Float, DateTime
from app.database import Base
from datetime import datetime

class PlantAnalysis(Base):
    __tablename__ = "plant_analysis"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    plant_name = Column(String)
    disease_name = Column(String)
    confidence_score = Column(Float)
    remedy = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
