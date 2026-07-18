import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoanForm from '../components/LoanForm';
import PredictionCard from '../components/PredictionCard';
import Loader from '../components/Loader';
import { predictLoan } from '../services/api';
import { 
  AlertCircle, 
  Activity, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  Compass
} from 'lucide-react';

const Predict = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);
  const [photo, setPhoto] = useState(null);

  // Lifted form data state to sync preview dashboards live
  const [formData, setFormData] = useState({
    Gender: 'Male',
    'Marital Status': 'No',
    Dependents: '0',
    Education: 'Graduate',
    'Employment Status': 'No',
    'Applicant Income': '',
    'Coapplicant Income': '0',
    'Loan Amount': '',
    'Loan Amount Term': '360',
    'Credit History': '1.0',
    'Property Area': 'Semiurban'
  });

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === 'true') {
      setFormData({
        Gender: 'Male',
        'Marital Status': 'Yes',
        Dependents: '1',
        Education: 'Graduate',
        'Employment Status': 'No',
        'Applicant Income': '6400',
        'Coapplicant Income': '2000',
        'Loan Amount': '150',
        'Loan Amount Term': '360',
        'Credit History': '1.0',
        'Property Area': 'Semiurban'
      });
      triggerToast('Loaded demo applicant parameters! Review summary on the right.', 'success');
    }
  }, []);

  const handleFormSubmit = async (payloadFormData) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await predictLoan(payloadFormData);
      setResult(data);
      
      // Save data for Chatbot session sync
      localStorage.setItem('latest_prediction_result', JSON.stringify(data));
      localStorage.setItem('latest_prediction_input', JSON.stringify(formData));
      window.dispatchEvent(new Event('predictionUpdated'));

      if (data.prediction === 'Approved') {
        triggerToast('Credit Proposal Approved! Confirms safe risk threshold.', 'success');
      } else {
        triggerToast('Credit Proposal Rejected. High default probability flagged.', 'error');
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || 'Failed to communicate with classifier engine.';
      triggerToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Preview dashboard parameters
  const amountVal = parseFloat(formData['Loan Amount'] || 0) * 1000;
  const incomeVal = parseFloat(formData['Applicant Income'] || 0);
  const coIncomeVal = parseFloat(formData['Coapplicant Income'] || 0);
  const totalMonthlyIncome = incomeVal + coIncomeVal;
  const isCreditGood = formData['Credit History'] === '1.0';

  // Live approximate calculation for visual guide
  const estEmi = amountVal > 0 ? Math.round((amountVal * 0.065 / 12 * Math.pow(1 + 0.065/12, 12)) / (Math.pow(1 + 0.065/12, 12) - 1)) : 0;
  const ratio = totalMonthlyIncome > 0 && estEmi > 0 ? Math.min(100, Math.round((estEmi / totalMonthlyIncome) * 100)) : 0;

  return (
    <div style={{ position: 'relative' }}>
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type} animate-bounce-short`}>
            {toast.type === 'error' && <AlertCircle size={18} style={{ color: 'var(--color-error)' }} />}
            <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="workspace-header-row">
        <div>
          <h1 className="page-main-title">Loan Underwriting Workspace</h1>
          <p className="page-subtitle">Submit application parameters to assess borrower credit risk and classification.</p>
        </div>
        
        {/* Floating status icon */}
        <div className="live-assessment-pill">
          <Activity size={12} className="text-primary animate-pulse" />
          <span>Real-time Risk Evaluation</span>
        </div>
      </div>

      <div className="predict-layout">
        
        {/* Left Hand: Step Form Card */}
        <div className="workspace-form-side">
          <LoanForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleFormSubmit} 
            loading={loading}
            photo={photo}
            setPhoto={setPhoto}
          />
        </div>

        {/* Right Hand: Dynamic Preview Panel vs Assessment Results */}
        <div className="workspace-status-side">
          <AnimatePresence mode="wait">
            
            {/* Loader State */}
            {loading && (
              <motion.div 
                key="loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="predict-preview-card loader-card"
              >
                <Loader message="Interrogating model & processing decision rules..." />
              </motion.div>
            )}

            {/* Assessment results card */}
            {!loading && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <PredictionCard predictionData={result} inputDetails={formData} />
              </motion.div>
            )}

            {/* Awaiting input Live Preview Panel */}
            {!loading && !result && (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="predict-preview-card glassmorphic-panel"
              >
                <div className="preview-card-header">
                  <Compass size={18} className="text-primary" />
                  <h3>Live Underwriting Summary</h3>
                </div>

                {/* Metrics rows */}
                <div className="preview-metrics-list">
                  
                  {/* Requested Loan Amount */}
                  <div className="preview-metric-row">
                    <div className="row-icon-wrapper">
                      <DollarSign size={16} />
                    </div>
                    <div className="row-details">
                      <span className="row-label">Requested Loan Amount</span>
                      <span className="row-value font-poppins">
                        {amountVal > 0 ? `$${amountVal.toLocaleString()}` : "Awaiting entry..."}
                      </span>
                    </div>
                  </div>

                  {/* Estimated Repayment Days */}
                  <div className="preview-metric-row">
                    <div className="row-icon-wrapper">
                      <Calendar size={16} />
                    </div>
                    <div className="row-details">
                      <span className="row-label">Repayment Tenure</span>
                      <span className="row-value font-poppins">
                        {formData['Loan Amount Term'] ? `${formData['Loan Amount Term']} Days` : "Awaiting entry..."}
                      </span>
                    </div>
                  </div>

                  {/* Bureau credit rating */}
                  <div className="preview-metric-row">
                    <div className="row-icon-wrapper">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="row-details">
                      <span className="row-label">Bureau Registry History</span>
                      <span className={`row-value font-poppins ${isCreditGood ? 'text-success' : 'text-error'}`}>
                        {isCreditGood ? "Good (No defaults)" : "Delinquent (Default record)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Eligibility Meter Gauge */}
                <div className="preview-eligibility-progress-box">
                  <div className="progress-labels">
                    <span>Debt Burden Ratio (DTI)</span>
                    <span>{ratio}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className={`progress-bar-fill ${ratio > 40 ? 'bg-danger' : ratio > 25 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                  <span className="progress-bar-desc">
                    Ratio of estimated monthly loan payment to combined monthly income. Safest is below 35%.
                  </span>
                </div>

                <div className="preview-guidance-note">
                  <TrendingUp size={14} className="text-primary" />
                  <p>
                    {isCreditGood 
                      ? "Applicant holds a clean history. XGBoost approval odds are high subject to sufficient monthly income thresholds."
                      : "Delinquent credit bureau records severely compromise approvals. Ensure strong income metrics are provided."}
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Predict;
