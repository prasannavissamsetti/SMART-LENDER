from config.config import Config
from model.predict import LoanPredictor
from models.prediction_history import PredictionHistoryDB
from utils.preprocess import clean_input_data

class PredictionService:
    def __init__(self):
        self.predictor = LoanPredictor()
        self.db = PredictionHistoryDB(Config.DATABASE_PATH)

    def predict_and_save(self, raw_data):
        # 1. Clean and preprocess input data
        cleaned_data = clean_input_data(raw_data)
        
        # 2. Query XGBoost prediction model
        result = self.predictor.predict(cleaned_data)
        
        # 3. Save logs to SQLite database
        self.db.insert_prediction(cleaned_data, result)
        
        return result

    def get_history(self, limit=100):
        # Retrieve records from database
        return self.db.get_all_history(limit)
