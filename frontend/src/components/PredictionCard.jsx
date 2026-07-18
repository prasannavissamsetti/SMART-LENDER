import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  XCircle, 
  Download, 
  PenTool, 
  FileText, 
  Check, 
  X, 
  AlertTriangle, 
  Activity, 
  RefreshCw, 
  HelpCircle,
  TrendingUp,
  Landmark,
  UserCheck
} from 'lucide-react';

const PredictionCard = ({ predictionData, inputDetails }) => {
  if (!predictionData) return null;

  const { prediction, confidence, risk_level } = predictionData;
  const isApproved = prediction === 'Approved';

  const [showSignModal, setShowSignModal] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);

  // Trigger confetti for approvals
  useEffect(() => {
    if (isApproved) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isApproved]);

  // Compute Loan Parameters dynamically
  const loanAmountK = parseFloat(inputDetails?.['Loan Amount'] || 150);
  const loanAmount = loanAmountK * 1000;
  const loanTermDays = parseInt(inputDetails?.['Loan Amount Term'] || 360);
  const applicantIncome = parseFloat(inputDetails?.['Applicant Income'] || 5000);
  const coIncome = parseFloat(inputDetails?.['Coapplicant Income'] || 0);
  const creditHistory = parseFloat(inputDetails?.['Credit History'] || 1.0);

  // EMI calculation (Assumed 6.5% APR)
  const monthlyRate = 0.065 / 12;
  const totalMonths = Math.max(1, Math.round(loanTermDays / 30));
  const calculatedEmi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                        (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const monthlyPayment = isNaN(calculatedEmi) || calculatedEmi === Infinity ? 'N/A' : calculatedEmi;

  // Debt-to-income (Monthly Payment / Total Income)
  const totalIncome = applicantIncome + coIncome;
  const dti = totalIncome > 0 && typeof monthlyPayment === 'number' ? 
              Math.min(100, Math.round((monthlyPayment / totalIncome) * 100)) : 'N/A';

  // Canvas Drawing for E-Signature
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Support mouse & mobile touch
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleSaveSignature = () => {
    setIsSigned(true);
    setShowSignModal(false);
  };

  // Open Chatbot Assistant
  const handleOpenChatbot = () => {
    const trigger = document.querySelector('.chatbot-floating-trigger');
    if (trigger) {
      trigger.click();
    } else {
      alert("Please click the floating AI Chatbot on the bottom right of the page.");
    }
  };

  // Printable Loan Offer terms sheet PDF
  const handlePrintOffer = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('Pop-up blocker is preventing download. Please allow popups.');
      return;
    }
    
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const html = `
      <html>
        <head>
          <title>Official Loan Offer Terms Sheet</title>
          <style>
            body { font-family: 'Inter', sans-serif; margin: 40px; color: #1e293b; line-height: 1.6; }
            .header { border-bottom: 3px double #2563eb; padding-bottom: 20px; text-align: center; }
            .header h1 { margin: 0; color: #1e3a8a; font-size: 26px; text-transform: uppercase; }
            .badge { display: inline-block; padding: 6px 16px; background: #dcfce7; color: #15803d; border-radius: 9999px; font-weight: bold; margin-top: 10px; }
            .details { margin: 35px 0; }
            .details table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .details th, .details td { padding: 12px; border: 1px solid #cbd5e1; text-align: left; }
            .details th { background: #f8fafc; color: #1e3b8b; }
            .sig-box { margin-top: 60px; border-top: 1px dashed #cbd5e1; padding-top: 30px; display: flex; justify-content: space-between; }
            .sig-line { width: 220px; border-bottom: 2px solid #0f172a; height: 50px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SMART LENDER UNDERWRITING</h1>
            <p>Official Credit Eligibility Terms Sheet</p>
            <div class="badge">${prediction.toUpperCase()}</div>
          </div>
          <p style="margin-top: 25px;">This document certifies that the underwriting request submitted for a value of <strong>$${loanAmount.toLocaleString()}</strong> has been processed by our XGBoost AI risk engine.</p>
          
          <div class="details">
            <h3>Assessment Parameters</h3>
            <table>
              <tr><th>Principal Amount</th><td>$${loanAmount.toLocaleString()}</td></tr>
              <tr><th>Repayment Term</th><td>${loanTermDays} Days (~${totalMonths} Months)</td></tr>
              <tr><th>Combined Monthly Income</th><td>$${totalIncome.toLocaleString()} / month</td></tr>
              <tr><th>Debt-to-Income (DTI) Ratio</th><td>${dti}%</td></tr>
              <tr><th>Assessment Risk Level</th><td>${risk_level} Risk</td></tr>
              <tr><th>AI Model Confidence</th><td>${confidence}%</td></tr>
              <tr><th>Offer Issued Date</th><td>${today}</td></tr>
            </table>
          </div>

          <div class="sig-box">
            <div>
              <p style="margin-bottom: 5px; font-weight: 600;">Authorized Underwriter Representative</p>
              <div style="font-style: italic; color: #475569; padding-top: 20px;">[AI Risk Model Verified]</div>
            </div>
            <div>
              <p style="margin-bottom: 5px; font-weight: 600;">Borrower Digital Confirmation</p>
              <div style="font-weight: bold; font-family: cursive; color: #1d4ed8; padding-top: 20px;">
                ${isSigned ? '✓ Digitally Recorded' : 'Not Signed'}
              </div>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className={`loan-outcome-card ${isApproved ? 'approved' : 'rejected'}`}>
      
      {/* Official Watermark Header */}
      <div className="outcome-card-header">
        <Landmark size={18} className="bank-icon-watermark" />
        <span>SMART LENDER CREDIT UNDERWRITING ASSESSMENT</span>
      </div>

      {/* Main Status Illustration */}
      <div className="outcome-result-panel">
        <div className="result-icon-wrapper animate-pulse">
          {isApproved ? (
            <ShieldCheck size={64} className="text-success shadow-icon" />
          ) : (
            <XCircle size={64} className="text-error shadow-icon" />
          )}
        </div>
        
        <h2 className="outcome-title">
          Credit Proposal {isApproved ? 'Approved' : 'Rejected'}
        </h2>
        
        <div className={`outcome-status-badge ${isApproved ? 'approved' : 'rejected'}`}>
          {isApproved ? 'Certified Eligible' : 'High Risk Flagged'}
        </div>
      </div>

      {/* Speedometer Gauge for AI Confidence */}
      <div className="gauge-meter-wrapper">
        <div className="gauge-track">
          <svg className="gauge-svg" viewBox="0 0 100 50">
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke="var(--border-color)" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke={isApproved ? 'var(--color-success)' : 'var(--color-error)'} 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeDasharray={`${(confidence / 100) * 125} 125`}
            />
          </svg>
          <div className="gauge-score-value">
            <span className="score-percentage">{confidence}%</span>
            <span className="score-subtitle">AI Underwriter Confidence</span>
          </div>
        </div>
      </div>

      {/* Loan Financial Statement Dashboard */}
      <div className="loan-dashboard-metrics">
        <div className="metric-box">
          <span className="box-label">Requested Loan</span>
          <span className="box-value">${loanAmount.toLocaleString()}</span>
          <span className="box-sub">Principal</span>
        </div>
        <div className="metric-box">
          <span className="box-label">Estimated Monthly</span>
          <span className="box-value">
            {typeof monthlyPayment === 'number' ? `$${Math.round(monthlyPayment).toLocaleString()}` : monthlyPayment}
          </span>
          <span className="box-sub">EMI @ 6.5% APR</span>
        </div>
        <div className="metric-box">
          <span className="box-label">Debt-to-Income (DTI)</span>
          <span className="box-value">{dti}%</span>
          <span className="box-sub">Monthly Burden</span>
        </div>
        <div className="metric-box">
          <span className="box-label">Risk Profile</span>
          <span className={`box-value risk-tag ${risk_level.toLowerCase()}`}>{risk_level}</span>
          <span className="box-sub">Assessed Tier</span>
        </div>
      </div>

      {/* Credit Audit Check points */}
      <div className="underwriting-audit-checklist">
        <h4 className="checklist-title">Underwriting Decision Factors</h4>
        
        <div className="audit-row">
          <div className="audit-indicator">
            {creditHistory === 1.0 ? (
              <span className="indicator-dot pass"><Check size={12} /></span>
            ) : (
              <span className="indicator-dot fail"><X size={12} /></span>
            )}
          </div>
          <div className="audit-detail">
            <span className="audit-label">Credit Bureau History</span>
            <span className="audit-desc">
              {creditHistory === 1.0 ? 'Excellent history - No previous defaults recorded.' : 'Flagged default - Insufficient clean record history.'}
            </span>
          </div>
        </div>

        <div className="audit-row">
          <div className="audit-indicator">
            {totalIncome >= (loanAmount / 40) ? (
              <span className="indicator-dot pass"><Check size={12} /></span>
            ) : (
              <span className="indicator-dot fail"><X size={12} /></span>
            )}
          </div>
          <div className="audit-detail">
            <span className="audit-label">Monthly Repayment Capacity</span>
            <span className="audit-desc">
              {totalIncome >= (loanAmount / 40) ? 'Monthly household income is stable relative to terms.' : 'High debt-to-income profile detected.'}
            </span>
          </div>
        </div>

        <div className="audit-row">
          <div className="audit-indicator">
            {coIncome > 0 ? (
              <span className="indicator-dot pass"><Check size={12} /></span>
            ) : (
              <span className="indicator-dot neutral">•</span>
            )}
          </div>
          <div className="audit-detail">
            <span className="audit-label">Co-Applicant Guarantee</span>
            <span className="audit-desc">
              {coIncome > 0 ? `Active support - Co-applicant contributes $${coIncome.toLocaleString()}/mo.` : 'Secondary borrower was not supplied.'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Centers */}
      <div className="loan-action-footer">
        {isApproved ? (
          <>
            <button 
              onClick={() => setShowSignModal(true)} 
              className={`btn btn-sign-contract ${isSigned ? 'signed' : ''}`}
            >
              <PenTool size={16} />
              {isSigned ? 'Digitally Signed ✓' : 'Digitally Sign Contract'}
            </button>
            <button onClick={handlePrintOffer} className="btn btn-print-offer">
              <Download size={16} />
              Export Offer Term Sheet
            </button>
          </>
        ) : (
          <>
            <button onClick={handleOpenChatbot} className="btn btn-open-help">
              <HelpCircle size={16} />
              Explain Rejection with AI
            </button>
            <button 
              onClick={() => {
                document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('input[name="CoapplicantIncome"]')?.focus();
              }} 
              className="btn btn-secondary-outline"
            >
              <RefreshCw size={16} />
              Add Co-Applicant & Recalculate
            </button>
          </>
        )}
      </div>

      {/* Signature Pad Modal Popup */}
      {showSignModal && (
        <div className="signature-modal-overlay">
          <div className="signature-modal-box">
            <div className="signature-modal-header">
              <h3>Secure Digital E-Sign</h3>
              <button onClick={() => setShowSignModal(false)} className="btn-close-modal">
                <X size={16} />
              </button>
            </div>
            
            <p className="sig-modal-desc">
              By signing below, you agree to the verified interest rate terms sheet generated by Smart Lender under the risk model guidelines.
            </p>

            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="signature-canvas"
              />
              <div className="canvas-guides">
                <span>Draw your signature above</span>
              </div>
            </div>

            <div className="signature-modal-actions">
              <button type="button" onClick={handleClearSignature} className="btn btn-clear-sig">
                Clear
              </button>
              <button type="button" onClick={handleSaveSignature} className="btn btn-save-sig">
                Save & Apply Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionCard;
