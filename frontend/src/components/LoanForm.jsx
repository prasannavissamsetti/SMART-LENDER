import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateLoanForm } from '../utils/validation';
import { 
  User, 
  DollarSign, 
  HelpCircle, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Image as ImageIcon,
  Home,
  FileSpreadsheet
} from 'lucide-react';

const STEPS = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Financial", icon: DollarSign },
  { id: 3, label: "Loan Details", icon: FileSpreadsheet },
  { id: 4, label: "Credit Bureau", icon: ShieldCheck },
  { id: 5, label: "Review & Uploads", icon: ImageIcon }
];

const LoanForm = ({ formData, setFormData, onSubmit, loading, photo, setPhoto }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(photo ? URL.createObjectURL(photo) : '');

  // Calculate completion percentage based on filled elements
  const requiredKeys = [
    'Applicant Income',
    'Loan Amount',
    'Loan Amount Term'
  ];
  let filledCount = 0;
  if (formData.Gender) filledCount++;
  if (formData['Marital Status']) filledCount++;
  if (formData.Dependents) filledCount++;
  if (formData.Education) filledCount++;
  if (formData['Employment Status']) filledCount++;
  if (formData['Applicant Income'] !== '') filledCount++;
  if (formData['Coapplicant Income'] !== '') filledCount++;
  if (formData['Loan Amount'] !== '') filledCount++;
  if (formData['Loan Amount Term'] !== '') filledCount++;
  if (formData['Credit History']) filledCount++;
  if (formData['Property Area']) filledCount++;

  const totalInputs = 11;
  const completionPercentage = Math.round((filledCount / totalInputs) * 100);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // Local step validation before proceeding
  const validateStep = (step) => {
    const localErrors = {};
    if (step === 2) {
      const income = parseFloat(formData['Applicant Income']);
      if (formData['Applicant Income'] === '' || isNaN(income)) {
        localErrors['Applicant Income'] = 'Applicant Income is required';
      } else if (income <= 0) {
        localErrors['Applicant Income'] = 'Income must be greater than 0';
      }
      
      const coIncome = parseFloat(formData['Coapplicant Income']);
      if (formData['Coapplicant Income'] === '' || isNaN(coIncome)) {
        localErrors['Coapplicant Income'] = 'Coapplicant Income is required';
      } else if (coIncome < 0) {
        localErrors['Coapplicant Income'] = 'Cannot be negative';
      }
    }
    
    if (step === 3) {
      const amount = parseFloat(formData['Loan Amount']);
      if (formData['Loan Amount'] === '' || isNaN(amount)) {
        localErrors['Loan Amount'] = 'Loan Amount is required';
      } else if (amount <= 0) {
        localErrors['Loan Amount'] = 'Must be greater than 0';
      }

      const term = parseFloat(formData['Loan Amount Term']);
      if (formData['Loan Amount Term'] === '' || isNaN(term)) {
        localErrors['Loan Amount Term'] = 'Loan Term is required';
      } else if (term <= 0) {
        localErrors['Loan Amount Term'] = 'Term must be greater than 0';
      }
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;

    // Full validation check
    const validation = validateLoanForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Fallback to error step
      if (validation.errors['Applicant Income'] || validation.errors['Coapplicant Income']) {
        setActiveStep(2);
      } else if (validation.errors['Loan Amount'] || validation.errors['Loan Amount Term']) {
        setActiveStep(3);
      }
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    if (photo) {
      payload.append('photo', photo);
    }

    onSubmit(payload);
  };

  const currentStepInfo = STEPS[activeStep - 1];

  return (
    <div className="form-container glassmorphic-form">
      
      {/* 1. Progress Indicator header */}
      <div className="form-progress-indicator">
        <div className="progress-header-row">
          <span className="step-count-label">Step {activeStep} of 5: <strong>{currentStepInfo.label}</strong></span>
          <span className="progress-percentage-label">{completionPercentage}% Completed</span>
        </div>
        <div className="progress-track-bar">
          <motion.div 
            className="progress-fill-gradient" 
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 2. Step Icons Panel */}
      <div className="form-step-circles-row">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isCompleted = s.id < activeStep;
          const isActive = s.id === activeStep;
          return (
            <div key={s.id} className="step-circle-wrapper">
              <button
                type="button"
                onClick={() => {
                  if (s.id < activeStep || validateStep(activeStep)) {
                    setActiveStep(s.id);
                  }
                }}
                className={`step-circle-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                title={s.label}
              >
                {isCompleted ? <Check size={12} /> : <Icon size={14} />}
              </button>
              <span className="circle-label-text">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* 3. Form Cards Switcher */}
      <form onSubmit={handleSubmit} className="multistep-form-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="form-card-wrapper"
          >
            
            {/* STEP 1: PERSONAL INFORMATION */}
            {activeStep === 1 && (
              <div className="form-group-card">
                <div className="card-header-iconic">
                  <User size={18} className="text-primary" />
                  <h3>Personal Information</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-input" name="Gender" value={formData.Gender} onChange={handleFieldChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Marital Status</label>
                    <select className="form-input" name="Marital Status" value={formData['Marital Status']} onChange={handleFieldChange}>
                      <option value="No">Single</option>
                      <option value="Yes">Married</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dependents</label>
                    <select className="form-input" name="Dependents" value={formData.Dependents} onChange={handleFieldChange}>
                      <option value="0">0 Dependents</option>
                      <option value="1">1 Dependent</option>
                      <option value="2">2 Dependents</option>
                      <option value="3+">3+ Dependents</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Education Profile</label>
                    <select className="form-input" name="Education" value={formData.Education} onChange={handleFieldChange}>
                      <option value="Graduate">Graduate degree</option>
                      <option value="Not Graduate">Undergraduate / Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: FINANCIAL DETAILS */}
            {activeStep === 2 && (
              <div className="form-group-card">
                <div className="card-header-iconic">
                  <DollarSign size={18} className="text-primary" />
                  <h3>Financial Details</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Employment Classification</label>
                    <select className="form-input" name="Employment Status" value={formData['Employment Status']} onChange={handleFieldChange}>
                      <option value="No">Salaried Professional</option>
                      <option value="Yes">Self-Employed / Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Primary Monthly Income ($)
                      <HelpCircle size={12} className="text-muted" title="Applicant monthly base income" />
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      name="Applicant Income"
                      value={formData['Applicant Income']}
                      onChange={handleFieldChange}
                      placeholder="e.g. 5200"
                    />
                    {errors['Applicant Income'] && <span className="form-error">{errors['Applicant Income']}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Co-applicant Income ($)
                      <HelpCircle size={12} className="text-muted" title="Guarantor/partner income contribution. Enter 0 if none." />
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      name="Coapplicant Income"
                      value={formData['Coapplicant Income']}
                      onChange={handleFieldChange}
                      placeholder="e.g. 1800"
                    />
                    {errors['Coapplicant Income'] && <span className="form-error">{errors['Coapplicant Income']}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: LOAN PARAMETERS */}
            {activeStep === 3 && (
              <div className="form-group-card">
                <div className="card-header-iconic">
                  <FileSpreadsheet size={18} className="text-primary" />
                  <h3>Loan Request Parameters</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Loan Principal ($ in Thousands)
                      <HelpCircle size={12} className="text-muted" title="Principal total represented in thousands (e.g. $150,000 should be entered as 150)" />
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      name="Loan Amount"
                      value={formData['Loan Amount']}
                      onChange={handleFieldChange}
                      placeholder="e.g. 150 (for $150k)"
                    />
                    {errors['Loan Amount'] && <span className="form-error">{errors['Loan Amount']}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Repayment Term (Days)
                      <HelpCircle size={12} className="text-muted" title="Standard days limit for full payment maturity (e.g. 360)" />
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      name="Loan Amount Term"
                      value={formData['Loan Amount Term']}
                      onChange={handleFieldChange}
                      placeholder="e.g. 360"
                    />
                    {errors['Loan Amount Term'] && <span className="form-error">{errors['Loan Amount Term']}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CREDIT RATING */}
            {activeStep === 4 && (
              <div className="form-group-card">
                <div className="card-header-iconic">
                  <ShieldCheck size={18} className="text-primary" />
                  <h3>Credit History Assessment</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Credit Bureau Record Rating</label>
                    <select className="form-input" name="Credit History" value={formData['Credit History']} onChange={handleFieldChange}>
                      <option value="1.0">Good Rating (No outstanding defaults/delinquency)</option>
                      <option value="0.0">Delinquent Rating (Previous credit default flagged)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & VERIFICATIONS */}
            {activeStep === 5 && (
              <div className="form-group-card">
                <div className="card-header-iconic">
                  <ImageIcon size={18} className="text-primary" />
                  <h3>Review & Documents</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Collateral Property Area</label>
                    <select className="form-input" name="Property Area" value={formData['Property Area']} onChange={handleFieldChange}>
                      <option value="Urban">Urban Zone</option>
                      <option value="Semiurban">Semi-Urban Zone</option>
                      <option value="Rural">Rural Zone</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Applicant Photo Identification</label>
                    <input
                      type="file"
                      className="form-input file-input-widget"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  {photoPreview && (
                    <div className="form-group full-width photo-preview-box">
                      <span className="form-label">Preview Verification</span>
                      <img src={photoPreview} alt="Applicant preview" />
                    </div>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* 4. Navigation controls */}
        <div className="form-navigation-actions">
          {activeStep > 1 && (
            <button type="button" onClick={handleBack} className="btn btn-nav-back">
              <ChevronLeft size={16} />
              Back
            </button>
          )}
          
          {activeStep < STEPS.length ? (
            <button type="button" onClick={handleNext} className="btn btn-nav-next">
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button type="submit" className="btn btn-submit-assessment-premium" disabled={loading}>
              <Sparkles size={16} />
              {loading ? 'Evaluating Proposal...' : 'Verify & Underwrite'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
