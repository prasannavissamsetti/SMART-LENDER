import React from 'react';
import { Download, CheckSquare, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const EligibilityReport = ({ reportData, applicantData }) => {
  const { selectedLanguage, t } = useLanguage();

  if (!reportData) return null;

  const handleDownloadPDF = () => {
    // Generate clean printable report HTML matching chosen language
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('Pop-up blocker is preventing PDF download. Please enable pop-ups.');
      return;
    }

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const reasonsList = reportData.major_reasons.map(r => `<li>${r}</li>`).join('');
    const suggestionsList = reportData.suggestions.map(s => `<li>${s}</li>`).join('');
    const checklistItems = reportData.checklist.map(c => `
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 16px; margin-right: 8px;">${c.checked ? '☑' : '☐'}</span>
        <span style="${c.checked ? 'text-decoration: line-through; color: #64748b;' : ''}">${c.item}</span>
      </div>
    `).join('');

    const htmlContent = `
      <html>
        <head>
          <title>${t.report_title}</title>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              color: #0f172a;
              margin: 40px;
              line-height: 1.6;
            }
            .header {
              border-bottom: 2px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              font-size: 24px;
              color: #2563eb;
              margin: 0 0 5px 0;
            }
            .header p {
              margin: 0;
              color: #64748b;
              font-size: 14px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
            }
            .card {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 15px;
              background-color: #f8fafc;
            }
            .card h3 {
              margin-top: 0;
              border-bottom: 1px solid #cbd5e1;
              padding-bottom: 8px;
              color: #1e3a8a;
            }
            .badge {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 9999px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .badge-risk {
              background-color: ${reportData.risk_level === 'High' ? '#fee2e2' : '#fef3c7'};
              color: ${reportData.risk_level === 'High' ? '#b91c1c' : '#b45309'};
            }
            .badge-status {
              background-color: #e0f2fe;
              color: #0369a1;
            }
            ul {
              margin: 0;
              padding-left: 20px;
            }
            li {
              margin-bottom: 6px;
            }
            .disclaimer {
              font-size: 12px;
              color: #64748b;
              border-top: 1px dashed #cbd5e1;
              padding-top: 15px;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${t.report_title}</h1>
            <p>AI-Generated Assessment & Guidance | Dated: ${today}</p>
          </div>

          <div class="grid">
            <div class="card">
              <h3>${t.report_status}</h3>
              <p style="font-weight: 600; font-size: 16px; margin: 0 0 10px 0;">${reportData.current_status}</p>
              <div style="margin-bottom: 10px;">
                <span style="font-size: 13px; color: #475569;">${t.report_risk}:</span>
                <span class="badge badge-risk">${reportData.risk_level} Risk</span>
              </div>
            </div>
            <div class="card">
              <h3>Eligibility Projection</h3>
              <p style="font-size: 14px; margin-top: 0;">Potential status after addressing current recommendations:</p>
              <span class="badge badge-status">${reportData.estimated_eligibility}</span>
            </div>
          </div>

          <div class="card" style="margin-bottom: 20px;">
            <h3>${t.report_friction}</h3>
            <ul>${reasonsList}</ul>
          </div>

          <div class="card" style="margin-bottom: 20px;">
            <h3>Action Steps</h3>
            <ul>${suggestionsList}</ul>
          </div>

          <div class="card" style="margin-bottom: 20px;">
            <h3>${t.report_checklist}</h3>
            <div style="font-size: 14px; margin-top: 5px;">
              ${checklistItems}
            </div>
          </div>

          <div class="disclaimer">
            <strong>Disclaimer:</strong> This report is AI-generated based on the submitted application parameters. It is an eligibility projection only and does not constitute a legally binding approval commitment. All loans are subject to final banking audits and verification checks.
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="report-card-container">
      <div className="report-header">
        <div className="report-title-row">
          {reportData.risk_level === 'High' ? (
            <AlertTriangle className="text-error animate-pulse" size={20} />
          ) : (
            <ShieldCheck className="text-success" size={20} />
          )}
          <h3>{t.report_title}</h3>
        </div>
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="btn btn-pdf-download"
          title="Download Report as PDF"
        >
          <Download size={14} />
          {t.report_download}
        </button>
      </div>

      <div className="report-body">
        <div className="report-meta-row">
          <div className="report-meta-item">
            <span className="meta-label">{t.report_status}</span>
            <span className="meta-value status-badge">{reportData.current_status}</span>
          </div>
          <div className="report-meta-item">
            <span className="meta-label">{t.report_risk}</span>
            <span className={`meta-value risk-badge ${reportData.risk_level.toLowerCase()}`}>
              {reportData.risk_level}
            </span>
          </div>
        </div>

        <div className="report-section">
          <h4>{t.report_friction}</h4>
          <ul className="report-list">
            {reportData.major_reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>

        <div className="report-section">
          <h4>{t.report_estimate}</h4>
          <p className="report-estimate-text">
            {reportData.estimated_eligibility}
            <span className="estimate-subtext"> ({t.report_projection})</span>
          </p>
        </div>

        <div className="report-section">
          <h4>{t.report_checklist}</h4>
          <div className="checklist-container">
            {reportData.checklist.map((item, idx) => (
              <div key={idx} className="checklist-item">
                <CheckSquare
                  size={16}
                  className={item.checked ? 'text-success' : 'text-muted'}
                  style={{ minWidth: '16px' }}
                />
                <span className={item.checked ? 'checked-item' : ''}>{item.item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityReport;
