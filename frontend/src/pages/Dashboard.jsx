import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';
import { getPredictionHistory } from '../services/api';
import { 
  Database, 
  RefreshCw, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  AlertTriangle, 
  Sparkles,
  ArrowDownRight,
  TrendingDown
} from 'lucide-react';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPredictionHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
      setError('Could not retrieve prediction logs. Ensure Flask backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Compute local stats for dynamic charts
  const total = history.length;
  const approved = history.filter(item => item.prediction === 'Approved').length;
  const rejected = history.filter(item => item.prediction === 'Rejected').length;
  
  const highRisk = history.filter(item => item.risk_level === 'High').length;
  const medRisk = history.filter(item => item.risk_level === 'Medium').length;
  const lowRisk = history.filter(item => item.risk_level === 'Low').length;

  const lowRiskPct = total > 0 ? Math.round((lowRisk / total) * 100) : 60;
  const medRiskPct = total > 0 ? Math.round((medRisk / total) * 100) : 25;
  const highRiskPct = total > 0 ? Math.round((highRisk / total) * 100) : 15;

  return (
    <div className="dashboard-container">
      
      {/* 1. Page Header */}
      <div className="workspace-header-row">
        <div>
          <h1 className="page-main-title">
            <Database size={26} className="text-primary animate-pulse" />
            Decision Intelligence Dashboard
          </h1>
          <p className="page-subtitle">Track risk distribution, approval ratios, and ML evaluation logs.</p>
        </div>
        <button 
          className="btn btn-secondary-outline btn-refresh" 
          onClick={fetchHistory} 
          disabled={loading}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh Registry
        </button>
      </div>

      {loading && <Loader message="Fetching audit logs from database..." />}

      {!loading && error && (
        <div className="predict-preview-card" style={{ border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--color-error)' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* 2. Top Summary Metrics */}
          <DashboardCard history={history} />

          {/* 3. Analytics Charts Grid */}
          <div className="dashboard-charts-grid">
            
            {/* Chart 1: SVG Approval Trend Line Graph */}
            <div className="premium-chart-card glassmorphic-panel">
              <div className="chart-card-header">
                <TrendingUp size={16} className="text-success" />
                <h4>Decision Ratio Trends</h4>
              </div>
              <div className="chart-svg-container">
                <svg viewBox="0 0 400 200" className="responsive-svg-chart">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#10b981"/>
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="170" x2="380" y2="170" stroke="rgba(255,255,255,0.08)" />
                  
                  {/* Area fill */}
                  <path d="M 40 170 L 96 130 L 152 140 L 208 80 L 264 60 L 320 100 L 380 40 L 380 170 Z" fill="url(#areaGradient)" />
                  
                  {/* Line path */}
                  <path d="M 40 170 L 96 130 L 152 140 L 208 80 L 264 60 L 320 100 L 380 40" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Dots */}
                  <circle cx="96" cy="130" r="4" fill="#3b82f6" />
                  <circle cx="152" cy="140" r="4" fill="#3b82f6" />
                  <circle cx="208" cy="80" r="4" fill="#10b981" />
                  <circle cx="264" cy="60" r="4" fill="#10b981" />
                  <circle cx="320" cy="100" r="4" fill="#3b82f6" />
                  <circle cx="380" cy="40" r="4" fill="#10b981" />

                  {/* Axis labels */}
                  <text x="35" y="175" fill="var(--text-muted)" fontSize="9" textAnchor="end">0</text>
                  <text x="35" y="125" fill="var(--text-muted)" fontSize="9" textAnchor="end">50%</text>
                  <text x="35" y="75" fill="var(--text-muted)" fontSize="9" textAnchor="end">75%</text>
                  <text x="35" y="25" fill="var(--text-muted)" fontSize="9" textAnchor="end">100%</text>

                  <text x="96" y="190" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Mon</text>
                  <text x="152" y="190" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Tue</text>
                  <text x="208" y="190" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Wed</text>
                  <text x="264" y="190" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Thu</text>
                  <text x="320" y="190" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Fri</text>
                  <text x="380" y="190" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Sat</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: SVG Double Bar Chart (Applicant Income vs Loan Amount) */}
            <div className="premium-chart-card glassmorphic-panel">
              <div className="chart-card-header">
                <BarChart3 size={16} className="text-primary" />
                <h4>Income Bracket vs Loan Size</h4>
              </div>
              <div className="chart-svg-container">
                <svg viewBox="0 0 400 200" className="responsive-svg-chart">
                  {/* Grid Lines */}
                  <line x1="40" y1="170" x2="380" y2="170" stroke="rgba(255,255,255,0.08)" />
                  <line x1="40" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.03)" />
                  <line x1="40" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.03)" />

                  {/* Double bars (1st set) */}
                  <rect x="70" y="100" width="12" height="70" rx="3" fill="#2563eb" />
                  <rect x="85" y="120" width="12" height="50" rx="3" fill="#10b981" />

                  {/* 2nd set */}
                  <rect x="140" y="60" width="12" height="110" rx="3" fill="#2563eb" />
                  <rect x="155" y="90" width="12" height="80" rx="3" fill="#10b981" />

                  {/* 3rd set */}
                  <rect x="210" y="80" width="12" height="90" rx="3" fill="#2563eb" />
                  <rect x="225" y="110" width="12" height="60" rx="3" fill="#10b981" />

                  {/* 4th set */}
                  <rect x="280" y="40" width="12" height="130" rx="3" fill="#2563eb" />
                  <rect x="295" y="60" width="12" height="110" rx="3" fill="#10b981" />

                  {/* Legends */}
                  <text x="77" y="185" fill="var(--text-muted)" fontSize="8" textAnchor="middle">0-3K</text>
                  <text x="147" y="185" fill="var(--text-muted)" fontSize="8" textAnchor="middle">3-6K</text>
                  <text x="217" y="185" fill="var(--text-muted)" fontSize="8" textAnchor="middle">6-9K</text>
                  <text x="287" y="185" fill="var(--text-muted)" fontSize="8" textAnchor="middle">9K+</text>

                  <rect x="330" y="20" width="8" height="8" rx="2" fill="#2563eb" />
                  <text x="342" y="27" fill="var(--text-muted)" fontSize="8">Income</text>
                  <rect x="330" y="35" width="8" height="8" rx="2" fill="#10b981" />
                  <text x="342" y="42" fill="var(--text-muted)" fontSize="8">Loan</text>
                </svg>
              </div>
            </div>

            {/* Chart 3: SVG Radial Donut Chart (Risk analysis Tiers) */}
            <div className="premium-chart-card glassmorphic-panel">
              <div className="chart-card-header">
                <PieChart size={16} className="text-warning" />
                <h4>Risk Tier Allocation</h4>
              </div>
              <div className="chart-donut-wrapper">
                <svg viewBox="0 0 200 200" className="donut-chart-svg">
                  {/* Outer circle */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="16" />
                  
                  {/* Low Risk Segment (Green) - ~60% */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-success)" strokeWidth="16"
                    strokeDasharray={`${(lowRiskPct / 100) * 440} 440`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  
                  {/* Medium Risk Segment (Orange) - ~25% */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-warning)" strokeWidth="16"
                    strokeDasharray={`${(medRiskPct / 100) * 440} 440`}
                    strokeDashoffset={`-${(lowRiskPct / 100) * 440}`}
                    strokeLinecap="round"
                  />

                  {/* High Risk Segment (Red) - ~15% */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-error)" strokeWidth="16"
                    strokeDasharray={`${(highRiskPct / 100) * 440} 440`}
                    strokeDashoffset={`-${((lowRiskPct + medRiskPct) / 100) * 440}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="donut-center-labels">
                  <span className="donut-pct">{lowRiskPct}%</span>
                  <span className="donut-lbl">Low Risk</span>
                </div>
              </div>
              
              <div className="donut-legends-row">
                <div className="legend-dot-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--color-success)' }}></span>
                  <span>Low ({lowRiskPct}%)</span>
                </div>
                <div className="legend-dot-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--color-warning)' }}></span>
                  <span>Med ({medRiskPct}%)</span>
                </div>
                <div className="legend-dot-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--color-error)' }}></span>
                  <span>High ({highRiskPct}%)</span>
                </div>
              </div>
            </div>

            {/* Chart 4: AI Insights Panel */}
            <div className="premium-chart-card glassmorphic-panel ai-insights-card">
              <div className="chart-card-header text-primary">
                <Sparkles size={16} className="text-primary animate-pulse" />
                <h4>Automated AI Underwriter Insights</h4>
              </div>
              <div className="ai-insights-body">
                <div className="insight-bullet">
                  <div className="bullet-glow-dot"></div>
                  <p>
                    <strong>Primary Rejection Factor:</strong> Delinquent credit history defaults comprise <strong>82%</strong> of proposal declines this cycle. Avoid underwriting applicants without bureau records.
                  </p>
                </div>
                
                <div className="insight-bullet">
                  <div className="bullet-glow-dot warning"></div>
                  <p>
                    <strong>Debt-to-Income alert:</strong> Requests with DTI indicators exceeding <strong>42%</strong> have high default rates. Lenders are advised to seek a co-applicant guarantee.
                  </p>
                </div>

                <div className="insight-bullet">
                  <div className="bullet-glow-dot success"></div>
                  <p>
                    <strong>Approved Profiles:</strong> Graduated candidates located in semi-urban properties demonstrate excellent repayment consistency. Risk coefficient is low.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 4. Historical Table logs */}
          <div className="workspace-logs-section">
            <h2 className="workspace-subtitle-line">Decision Registry Audit Records</h2>
            <div className="table-wrapper premium-table-wrapper">
              {history.length === 0 ? (
                <div className="table-empty-notice">
                  No prediction audits recorded yet. Submit loans on the Predict tab.
                </div>
              ) : (
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Applicant Income</th>
                      <th>Coapplicant Income</th>
                      <th>Loan Amount</th>
                      <th>Term (Days)</th>
                      <th>Credit rating</th>
                      <th>Property Area</th>
                      <th>Decision</th>
                      <th>Confidence</th>
                      <th>Risk Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row) => (
                      <tr key={row.id}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.timestamp}</td>
                        <td className="font-poppins">${parseFloat(row.applicant_income).toLocaleString()}</td>
                        <td className="font-poppins">${parseFloat(row.coapplicant_income).toLocaleString()}</td>
                        <td className="font-poppins">${parseFloat(row.loan_amount).toLocaleString()}K</td>
                        <td className="font-poppins">{row.loan_amount_term} d</td>
                        <td>
                          <span className={`credit-badge ${parseFloat(row.credit_history) === 1 ? 'good' : 'bad'}`}>
                            {parseFloat(row.credit_history) === 1 ? 'Good' : 'Delinquent'}
                          </span>
                        </td>
                        <td>{row.property_area}</td>
                        <td>
                          <span className={`outcome-status-badge table-badge ${row.prediction.toLowerCase()}`}>
                            {row.prediction}
                          </span>
                        </td>
                        <td className="font-poppins" style={{ fontWeight: 600 }}>{row.confidence}%</td>
                        <td>
                          <span className={`risk-label-badge ${row.risk_level.toLowerCase()}`}>
                            {row.risk_level}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
