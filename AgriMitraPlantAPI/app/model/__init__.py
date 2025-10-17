from AgriMitraPlantAPI.app.database import Base, engine
from AgriMitraPlantAPI.app import models  # assuming your models are defined here

Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully.")