from fastapi import FastAPI
from app.database import engine, Base   # Base comes from database.py
from app.plant_analysis import router as plant_analysis_router



# Create tables if not exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include the plant analysis routes
app.include_router(plant_analysis_router, prefix="/plant", tags=["Plant Analysis"])
