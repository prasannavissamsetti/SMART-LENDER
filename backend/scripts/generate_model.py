import os
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier

def main():
    print("Generating mock/synthetic data for Loan Prediction...")
    # Features list:
    # ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History', 'Property_Area']
    
    np.random.seed(42)
    n_samples = 1000
    
    # Categorical distributions
    gender_choices = np.random.choice(['Male', 'Female'], size=n_samples, p=[0.6, 0.4])
    married_choices = np.random.choice(['Yes', 'No'], size=n_samples, p=[0.65, 0.35])
    dependents_choices = np.random.choice(['0', '1', '2', '3+'], size=n_samples, p=[0.5, 0.2, 0.15, 0.15])
    education_choices = np.random.choice(['Graduate', 'Not Graduate'], size=n_samples, p=[0.8, 0.2])
    self_employed_choices = np.random.choice(['Yes', 'No'], size=n_samples, p=[0.15, 0.85])
    property_choices = np.random.choice(['Urban', 'Semiurban', 'Rural'], size=n_samples, p=[0.3, 0.4, 0.3])
    credit_choices = np.random.choice([1.0, 0.0], size=n_samples, p=[0.8, 0.2])
    
    # Numerical distributions
    applicant_income = np.random.normal(loc=5400, scale=3000, size=n_samples).clip(1500, 30000)
    coapplicant_income = np.random.choice([0.0, 1500.0, 2500.0, 4000.0], size=n_samples, p=[0.5, 0.25, 0.15, 0.10]) + np.random.normal(loc=0, scale=200, size=n_samples).clip(0, 5000)
    loan_amount = (applicant_income * 0.03 + coapplicant_income * 0.015 + np.random.normal(loc=50, scale=30, size=n_samples)).clip(10, 600)
    loan_term = np.random.choice([120, 180, 240, 300, 360], size=n_samples, p=[0.05, 0.05, 0.05, 0.05, 0.8])
    
    # Create DataFrame
    df = pd.DataFrame({
        'Gender': gender_choices,
        'Married': married_choices,
        'Dependents': dependents_choices,
        'Education': education_choices,
        'Self_Employed': self_employed_choices,
        'ApplicantIncome': applicant_income,
        'CoapplicantIncome': coapplicant_income,
        'LoanAmount': loan_amount,
        'Loan_Amount_Term': loan_term,
        'Credit_History': credit_choices,
        'Property_Area': property_choices
    })
    
    # Encoders
    encoder = {
        'Gender': {'Female': 0, 'Male': 1},
        'Married': {'No': 0, 'Yes': 1},
        'Dependents': {'0': 0, '1': 1, '2': 2, '3+': 3},
        'Education': {'Not Graduate': 0, 'Graduate': 1},
        'Self_Employed': {'No': 0, 'Yes': 1},
        'Property_Area': {'Rural': 0, 'Semiurban': 1, 'Urban': 2}
    }
    
    # Apply encoding
    df_encoded = df.copy()
    for col, mapping in encoder.items():
        df_encoded[col] = df_encoded[col].map(mapping)
    
    # Generate labels (Loan_Status) based on reasonable rules
    total_income = df_encoded['ApplicantIncome'] + df_encoded['CoapplicantIncome']
    debt_to_income = (df_encoded['LoanAmount'] * 1000) / (total_income * 12 + 1)
    
    status = []
    for idx, row in df_encoded.iterrows():
        if row['Credit_History'] == 1.0:
            prob = 0.85
            dti = debt_to_income.iloc[idx]
            if dti > 0.4:
                prob -= 0.3
            if row['ApplicantIncome'] < 2500:
                prob -= 0.15
        else:
            prob = 0.08
            
        outcome = np.random.choice([1, 0], p=[prob, 1.0 - prob])
        status.append(outcome)
        
    df_encoded['Loan_Status'] = status
    
    X = df_encoded.drop('Loan_Status', axis=1)
    y = df_encoded['Loan_Status']
    
    # Fit scaler on numerical columns
    num_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term']
    scaler = StandardScaler()
    X_num_scaled = scaler.fit_transform(X[num_cols])
    
    # Reassemble X with scaled numeric columns
    X_scaled = X.copy()
    X_scaled[num_cols] = X_num_scaled
    
    # Train XGBoost Model
    print("Training XGBoost Classifier...")
    model = XGBClassifier(
        n_estimators=100,
        max_depth=4,
        learning_rate=0.1,
        random_state=42,
        eval_metric='logloss'
    )
    model.fit(X_scaled, y)
    
    # Save artifacts
    model_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'model')
    os.makedirs(model_dir, exist_ok=True)
    
    joblib.dump(model, os.path.join(model_dir, 'xgboost_model.pkl'))
    joblib.dump(scaler, os.path.join(model_dir, 'scaler.pkl'))
    joblib.dump(encoder, os.path.join(model_dir, 'encoder.pkl'))
    
    print(f"Model artifacts saved successfully in: {model_dir}")
    print(f"Features trained: {list(X.columns)}")

if __name__ == '__main__':
    main()
