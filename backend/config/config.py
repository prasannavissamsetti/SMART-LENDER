import os
from dotenv import load_dotenv

# Load env variables from backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(BASE_DIR, '.env')
load_dotenv(dotenv_path)

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'smart_lender_default_secret_key_999')
    PORT = int(os.environ.get('PORT', 5000))
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')
    
    # Database
    DB_NAME = os.environ.get('DATABASE_PATH', 'database.db')
    DATABASE_PATH = os.path.join(BASE_DIR, DB_NAME)
    
    # Model folder
    MODEL_DIR = os.path.join(BASE_DIR, 'model')
    MODEL_PATH = os.path.join(MODEL_DIR, 'xgboost_model.pkl')
    SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
    ENCODER_PATH = os.path.join(MODEL_DIR, 'encoder.pkl')
