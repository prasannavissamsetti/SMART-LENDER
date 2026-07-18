import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../components/ChatBot/LanguageContext';
import { 
  User, 
  Settings, 
  Sun, 
  Moon, 
  Globe, 
  History, 
  Award, 
  FileText, 
  MapPin, 
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

const Profile = () => {
  const { selectedLanguage, changeLanguage, languages } = useLanguage();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [recentCount, setRecentCount] = useState(0);

  // Sync theme changes locally
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load prediction stats from cache
  useEffect(() => {
    try {
      const historyStr = localStorage.getItem('latest_prediction_result');
      if (historyStr) {
        setRecentCount(1); // Track cached sessions
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLangChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="profile-container"
    >
      <div className="workspace-header-row">
        <div>
          <h1 className="page-main-title">User Account Profile</h1>
          <p className="page-subtitle">Manage staff preferences, credentials, and digital audit signatures.</p>
        </div>
      </div>

      <div className="profile-layout-grid">
        
        {/* Left Side: Avatar Details Card */}
        <div className="profile-detail-side">
          <div className="profile-card glassmorphic-panel text-center">
            
            {/* Avatar Photo Frame */}
            <div className="profile-avatar-frame">
              <div className="avatar-placeholder">
                <span>SO</span>
              </div>
              <div className="avatar-edit-badge" title="Upload New Profile Photo">
                <UserCheck size={12} />
              </div>
            </div>

            <h2 className="profile-title font-poppins">Smart Officer</h2>
            <div className="badge-role-gold">
              <Award size={12} />
              <span>Senior Underwriter Auditor</span>
            </div>

            <div className="profile-meta-list">
              <div className="profile-meta-row">
                <Building size={14} className="text-muted" />
                <span>Department: Credit Risk</span>
              </div>
              <div className="profile-meta-row">
                <MapPin size={14} className="text-muted" />
                <span>Region: North America Hub</span>
              </div>
              <div className="profile-meta-row">
                <ShieldCheck size={14} className="text-muted" />
                <span>Auditor Status: Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Account Settings Preferences */}
        <div className="profile-settings-side">
          
          {/* Panel 1: Preferences Settings */}
          <div className="profile-card glassmorphic-panel">
            <div className="card-header-iconic">
              <Settings size={18} className="text-primary" />
              <h3>Interface Configurations</h3>
            </div>
            
            <div className="settings-options-list">
              
              {/* Option 1: Theme Toggler */}
              <div className="settings-option-item">
                <div className="option-details">
                  <span className="option-title">Visual Layout Theme</span>
                  <p className="option-desc">Toggle between high-contrast light theme and energy-saving dark theme.</p>
                </div>
                <button 
                  type="button" 
                  onClick={toggleTheme} 
                  className="btn-nav-widget theme-profile-btn"
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={14} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={14} />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>

              {/* Option 2: Multilingual Language */}
              <div className="settings-option-item">
                <div className="option-details">
                  <span className="option-title">System Assessment Language</span>
                  <p className="option-desc">Updates all interface placeholders, lists, checklists, reports, and AI chatbot prompts.</p>
                </div>
                
                <select 
                  value={selectedLanguage} 
                  onChange={handleLangChange}
                  className="form-input settings-lang-select"
                >
                  {languages.map(l => (
                    <option key={l.name} value={l.name}>
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Panel 2: Underwriting Stats Logs */}
          <div className="profile-card glassmorphic-panel" style={{ marginTop: '1.5rem' }}>
            <div className="card-header-iconic">
              <History size={18} className="text-primary" />
              <h3>Current Session Activity Summary</h3>
            </div>
            
            <div className="profile-stats-grid">
              <div className="profile-stat-box">
                <span className="box-val">{recentCount}</span>
                <span className="box-lbl">Audits Done</span>
              </div>
              <div className="profile-stat-box">
                <span className="box-val">100%</span>
                <span className="box-lbl">Completion Rate</span>
              </div>
              <div className="profile-stat-box">
                <span className="box-val">1</span>
                <span className="box-lbl">Signed Contract</span>
              </div>
            </div>

            <div className="profile-activities-bullets" style={{ marginTop: '1.25rem' }}>
              <h4 className="checklist-title">Recent Activity Logs</h4>
              <div className="activity-bullet-row">
                <FileText size={14} className="text-primary" />
                <p>Downloaded official loan assessment PDF terms sheet - <strong>5m ago</strong></p>
              </div>
              <div className="activity-bullet-row">
                <Award size={14} className="text-success" />
                <p>Verified digital signature confirmation coordinates - <strong>10m ago</strong></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Profile;
