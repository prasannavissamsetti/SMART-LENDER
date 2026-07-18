import sqlite3
import os
from datetime import datetime

class PredictionHistoryDB:
    def __init__(self, db_path):
        self.db_path = db_path
        self.init_db()

    def _get_connection(self):
        conn = sqlite3.connect(self.db_path)
        # return rows as dictionaries for easy consumption
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        # Ensure parent directories exist
        db_dir = os.path.dirname(self.db_path)
        if db_dir:
            os.makedirs(db_dir, exist_ok=True)
            
        conn = self._get_connection()
        cursor = conn.cursor()
        
        # Create history table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS prediction_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                gender TEXT,
                marital_status TEXT,
                dependents TEXT,
                education TEXT,
                employment_status TEXT,
                applicant_income REAL,
                coapplicant_income REAL,
                loan_amount REAL,
                loan_amount_term REAL,
                credit_history REAL,
                property_area TEXT,
                prediction TEXT,
                confidence REAL,
                risk_level TEXT,
                timestamp TEXT
            )
        ''')
        conn.commit()
        conn.close()

    def insert_prediction(self, data, prediction_result):
        conn = self._get_connection()
        cursor = conn.cursor()
        
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        cursor.execute('''
            INSERT INTO prediction_history (
                gender, marital_status, dependents, education, employment_status,
                applicant_income, coapplicant_income, loan_amount, loan_amount_term,
                credit_history, property_area, prediction, confidence, risk_level, timestamp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('Gender'),
            data.get('Marital Status'),
            data.get('Dependents'),
            data.get('Education'),
            data.get('Employment Status'),
            float(data.get('Applicant Income', 0)),
            float(data.get('Coapplicant Income', 0)),
            float(data.get('Loan Amount', 0)),
            float(data.get('Loan Amount Term', 360)),
            float(data.get('Credit History', 1.0)),
            data.get('Property Area'),
            prediction_result.get('prediction'),
            float(prediction_result.get('confidence', 0.0)),
            prediction_result.get('risk_level'),
            timestamp
        ))
        conn.commit()
        last_id = cursor.lastrowid
        conn.close()
        return last_id

    def get_all_history(self, limit=100):
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM prediction_history 
            ORDER BY id DESC 
            LIMIT ?
        ''', (limit,))
        
        rows = cursor.fetchall()
        
        history_list = []
        for row in rows:
            history_list.append(dict(row))
            
        conn.close()
        return history_list
