# Smart Lender – AI-Based Loan Approval Prediction System

Smart Lender is a complete, production-ready machine learning-powered web application that predicts the creditworthiness of loan applicants. Powered by a pre-trained **XGBoost Classifier**, the system assesses risk profiles and assists loan officers in making faster, data-driven decisions.

## Project Features

1. **User-Friendly Assessment Panel**: Form inputs for all standard loan applicant variables.
2. **Real-time Approval Decisions**: Fast predictions returned by an XGBoost model.
3. **Probability & Confidence Score**: Clear visualization of the model's confidence and corresponding risk classification.
4. **Audit History Log**: Auto-persistence of prediction data and assessments to a local SQLite database.
5. **Analytics Dashboard**: Aggregate metrics (Total volume, Approval rate, Risk ratios) and a chronological history database viewer.
6. **Form Validation & Alerts**: Validation checks for inputs with beautiful, responsive notification toasts.
7. **Curated Banking UI/UX**: Professional banking themes (Deep blue, white, gray) optimized for both desktop and mobile screens.

---

## Folder Structure

```text
Smart-Lender/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoanForm.jsx
│   │   │   ├── PredictionCard.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Predict.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── utils/
│   │   │   └── validation.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── config/
│   │   └── config.py
│   ├── controllers/
│   │   └── prediction_controller.py
│   ├── routes/
│   │   └── prediction_routes.py
│   ├── services/
│   │   └── prediction_service.py
│   ├── models/
│   │   └── prediction_history.py
│   ├── utils/
│   │   └── preprocess.py
│   ├── scripts/
│   │   └── generate_model.py
│   ├── model/
│   │   ├── xgboost_model.pkl
│   │   ├── scaler.pkl
│   │   ├── encoder.pkl
│   │   └── predict.py
│   ├── database.db
│   ├── requirements.txt
│   └── .env
│
├── README.md
└── .gitignore
```

---

## Input Variables Schema

| Feature | Type | Expected Values | Description |
| :--- | :--- | :--- | :--- |
| **Gender** | Categorical | `Male`, `Female` | Applicant gender |
| **Marital Status** | Categorical | `Yes`, `No` | Legal marriage status |
| **Dependents** | Categorical | `0`, `1`, `2`, `3+` | Number of financial dependents |
| **Education** | Categorical | `Graduate`, `Not Graduate` | Academic status |
| **Employment Status** | Categorical | `Yes` (Self Employed), `No` | Primary source of income |
| **Applicant Income** | Numerical | Positive Float | Monthly income of primary applicant |
| **Co-applicant Income**| Numerical | Float (>= 0) | Monthly income of secondary applicant |
| **Loan Amount** | Numerical | Positive Float | Requested loan principal in thousands ($) |
| **Loan Amount Term** | Numerical | Positive Integer | Repayment window in days (e.g. 360) |
| **Credit History** | Categorical | `1.0` (Good), `0.0` (Bad) | Prior repayment default records |
| **Property Area** | Categorical | `Urban`, `Semiurban`, `Rural` | Collateral property locality |

---

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js (v18+) and npm

### 1. Backend Setup & Run

Navigate to the `backend` directory:
```bash
cd backend
```

Install requirements:
```bash
pip install -r requirements.txt
```

*(Optional)* If model files (`xgboost_model.pkl`, `scaler.pkl`, `encoder.pkl`) are missing from the `backend/model` directory, recreate them with the synthetic training script:
```bash
python scripts/generate_model.py
```

Run the server:
```bash
python app.py
```
The server will boot on `http://localhost:5000`.

### 2. Frontend Setup & Run

Navigate to the `frontend` directory:
```bash
cd ../frontend
```

Install node dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will compile and launch on `http://localhost:3000`.

---

## REST API Documentation

### `POST /api/predict`
Executes an assessment on the submitted parameters.
- **Request Body**: JSON mapping of input features.
- **Response Example**:
  ```json
  {
    "prediction": "Approved",
    "confidence": 79.45,
    "risk_level": "Medium"
  }
  ```

### `GET /api/history`
Retrieves chronological prediction history.
- **Query Parameter**: `limit` (default: 100).
- **Response**: Array of assessment logs.

### `GET /api/health`
Checks backend component health.
- **Response**: Connection states of SQLite and ML models.
