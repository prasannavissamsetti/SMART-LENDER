import React from 'react';
import { Landmark, Github, Linkedin, Twitter, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and brief brand text */}
        <div className="footer-brand-section">
          <div className="footer-logo">
            <Landmark size={22} className="text-primary" />
            <span>Smart<span className="text-muted">Lender</span></span>
          </div>
          <p className="footer-brand-desc">
            Autonomous credit scoring and loan risk modeling built on pre-trained classification neural frameworks and XGBoost classification models.
          </p>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <Linkedin size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Columns Grid */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="#predictions">Eligibility Assessor</a></li>
              <li><a href="#dashboard">Decision Analytics</a></li>
              <li><a href="#api">Underwriting APIs</a></li>
              <li><a href="#comparisons">Simulators</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#faqs">Knowledge FAQs</a></li>
              <li><a href="#developer">Documentation</a></li>
              <li><a href="#audit">Risk Guidelines</a></li>
              <li><a href="#pricing">Institutional Tiers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Agreement</a></li>
              <li><a href="#compliance">FCRA Compliance</a></li>
              <li><a href="#disclaimer">Model Audits</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Compliance / Disclaimer segment */}
      <div className="footer-bottom-compliance">
        <div className="compliance-container">
          <div className="compliance-row">
            <Shield size={14} className="text-primary" style={{ flexShrink: 0 }} />
            <p>
              <strong>Regulatory Notice:</strong> Smart Lender AI classification projections are simulated guidelines matching statistical risk categories. Assessment outputs do not constitute binding loan commitments or legal credit denials. All final approvals require banking review audits.
            </p>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-copyright-row">
            <span>&copy; {currentYear} Smart Lender Inc. All Rights Reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={12} />
              Region: Global USD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
