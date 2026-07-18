import os
import joblib
import pandas as pd
import numpy as np

# Define paths to model artifacts
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(MODEL_DIR, 'xgboost_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
ENCODER_PATH = os.path.join(MODEL_DIR, 'encoder.pkl')

class LoanPredictor:
    def __init__(self):
        # Cache instances
        self.model = None
        self.scaler = None
        self.encoder = None

    def _load_artifacts(self):
        if self.model is None:
            if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH) or not os.path.exists(ENCODER_PATH):
                raise FileNotFoundError("Model artifacts not found. Please train/generate model first.")
            self.model = joblib.load(MODEL_PATH)
            self.scaler = joblib.load(SCALER_PATH)
            self.encoder = joblib.load(ENCODER_PATH)

    def predict(self, data):
        self._load_artifacts()
        
        # Mapping input keys to backend expected values
        # Form field labels maps to:
        # data keys are standard from frontend loan form
        gender_raw = data.get('Gender', 'Male')
        marital_raw = data.get('Marital Status', 'No')
        dependents_raw = str(data.get('Dependents', '0'))
        education_raw = data.get('Education', 'Graduate')
        self_employed_raw = data.get('Employment Status', 'No')
        property_area_raw = data.get('Property Area', 'Semiurban')
        
        credit_history_raw = data.get('Credit History', '1.0')
        try:
            credit_history = float(credit_history_raw)
        except (ValueError, TypeError):
            credit_history = 1.0
            
        try:
            applicant_income = float(data.get('Applicant Income', 0))
        except (ValueError, TypeError):
            applicant_income = 0.0
            
        try:
            coapplicant_income = float(data.get('Coapplicant Income', 0))
        except (ValueError, TypeError):
            coapplicant_income = 0.0
            
        try:
            # Frontend might send Loan Amount in regular currency, but model might expect it in thousands.
            # Usually the LoanAmount in Kaggle dataset is in thousands (e.g. 120 means $120,000).
            # We'll assume the model expects it in thousands, and if the user input is like 120000, we convert it to 120.
            # Let's inspect the input. If loan_amount > 50000, we divide by 1000.
            val = float(data.get('Loan Amount', 0))
            if val > 50000:
                val = val / 1000.0
            loan_amount = val
        except (ValueError, TypeError):
            loan_amount = 0.0
            
        try:
            loan_amount_term = float(data.get('Loan Amount Term', 360))
        except (ValueError, TypeError):
            loan_amount_term = 360.0

        # Encode categorical variables using loaded encoder mapping
        gender = self.encoder['Gender'].get(gender_raw, 1)
        married = self.encoder['Married'].get(marital_raw, 0)
        dependents = self.encoder['Dependents'].get(dependents_raw, 0)
        education = self.encoder['Education'].get(education_raw, 1)
        self_employed = self.encoder['Self_Employed'].get(self_employed_raw, 0)
        property_area = self.encoder['Property_Area'].get(property_area_raw, 1)

        # Assemble the raw array
        # Order must be: Gender, Married, Dependents, Education, Self_Employed, ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term, Credit_History, Property_Area
        raw_features = np.array([[
            gender, married, dependents, education, self_employed,
            applicant_income, coapplicant_income, loan_amount, loan_amount_term,
            credit_history, property_area
        ]])
        
        # Scale the numerical fields: ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term
        num_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term']
        num_features = pd.DataFrame(raw_features[:, [5, 6, 7, 8]], columns=num_cols)
        scaled_num = self.scaler.transform(num_features)
        
        features = raw_features.copy()
        features[:, [5, 6, 7, 8]] = scaled_num
        
        # Predict probability of approval (class 1)
        all_cols = [
            'Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',
            'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term',
            'Credit_History', 'Property_Area'
        ]
        features_df = pd.DataFrame(features, columns=all_cols)
        prob = self.model.predict_proba(features_df)[0][1]
        pred = self.model.predict(features_df)[0]
        
        prediction_label = 'Approved' if pred == 1 else 'Rejected'
        confidence = float(prob if pred == 1 else (1.0 - prob)) * 100
        
        # Determine risk level
        if prediction_label == 'Approved':
            if confidence >= 85:
                risk_level = 'Low'
            elif confidence >= 70:
                risk_level = 'Medium'
            else:
                risk_level = 'High'
        else:
            if confidence >= 80:
                risk_level = 'High'
            else:
                risk_level = 'Medium'
                
        return {
            'prediction': prediction_label,
            'confidence': round(confidence, 2),
            'risk_level': risk_level
        }
