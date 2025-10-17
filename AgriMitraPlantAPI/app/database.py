from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = (
    "mssql+pyodbc://@/?odbc_connect="
    "Driver=ODBC+Driver+17+for+SQL+Server;"
    "Server=np:\\\\.\\pipe\\LOCALDB#0B76F4CD\\tsql\\query;"
    "Database=AgriMitraAI;"
    "Trusted_Connection=yes;"
)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
