from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class PlantAnalysis(Base):
    __tablename__ = "plant_analysis"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    prediction = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
