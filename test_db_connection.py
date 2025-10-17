from sqlalchemy import text
from AgriMitraPlantAPI.app.database import SessionLocal

db = SessionLocal()
try:
    result = db.execute(text("SELECT 1"))
    print("✅ Connected:", result.scalar())
except Exception as e:
    print("❌ Database connection failed:", e)
finally:
    db.close()