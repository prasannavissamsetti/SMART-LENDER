import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  History,
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { checkHealth } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Menu overlays
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Poll server health
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkHealth();
        setIsOnline(data && data.status === 'healthy');
      } catch (err) {
        setIsOnline(false);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Update body theme
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('themeChanged'));
  }, [theme]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const mockNotifications = [
    { id: 1, type: 'success', msg: 'Loan Assessment Approved: ID #208', time: '10 mins ago' },
    { id: 2, type: 'warning', msg: 'System limit flagged on High Term proposal', time: '1 hr ago' },
    { id: 3, type: 'info', msg: 'Model classification matrix successfully updated', time: '1 day ago' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Branding Logo */}
        <NavLink to="/" className="navbar-brand">
          <Landmark size={24} className="bank-logo-spin" />
          <span className="brand-text">Smart<span className="brand-highlight">Lender</span></span>
        </NavLink>

        {/* Navigation links */}
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
            <span className="link-indicator"></span>
          </NavLink>
          <NavLink to="/predict" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Predict
            <span className="link-indicator"></span>
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Dashboard
            <span className="link-indicator"></span>
          </NavLink>
        </div>

        {/* Action Widgets */}
        <div className="navbar-actions">
          
          {/* Health Status Indicator */}
          <div className="api-health-badge" title={isOnline ? "XGBoost Engine Online" : "Connecting to Model Server..."}>
            <Activity size={14} className={isOnline ? 'text-success animate-pulse' : 'text-error animate-spin'} />
            <span className="health-text">{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* Theme Toggler */}
          <button 
            type="button" 
            onClick={toggleTheme} 
            className="btn-nav-widget theme-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications Bell */}
          <div className="navbar-dropdown-wrapper" ref={notifRef}>
            <button 
              type="button" 
              onClick={() => setShowNotifications(!showNotifications)} 
              className={`btn-nav-widget ${showNotifications ? 'active' : ''}`}
              title="View Alerts"
            >
              <Bell size={18} />
              <span className="badge-unread-count"></span>
            </button>

            {showNotifications && (
              <div className="nav-dropdown-panel notifications-dropdown">
                <div className="panel-header">
                  <span>System Activity Logs</span>
                </div>
                <div className="panel-list">
                  {mockNotifications.map(n => (
                    <div key={n.id} className="panel-list-item notif-item">
                      {n.type === 'success' && <CheckCircle size={14} className="text-success" />}
                      {n.type === 'warning' && <AlertTriangle size={14} className="text-warning" />}
                      {n.type === 'info' && <Settings size={14} className="text-primary" />}
                      <div className="notif-content">
                        <p className="notif-msg">{n.msg}</p>
                        <span className="notif-time">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div className="navbar-dropdown-wrapper" ref={profileRef}>
            <button 
              type="button" 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="btn-nav-profile"
            >
              <div className="nav-avatar">
                <span>SO</span>
              </div>
              <ChevronDown size={14} className={`chevron-rotate ${showProfileMenu ? 'active' : ''}`} />
            </button>

            {showProfileMenu && (
              <div className="nav-dropdown-panel profile-dropdown">
                <div className="panel-profile-info">
                  <span className="profile-name">Smart Officer</span>
                  <span className="profile-role">Senior Auditor</span>
                </div>
                <div className="panel-list">
                  <button 
                    onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} 
                    className="panel-menu-btn"
                  >
                    <User size={14} />
                    Account Profile
                  </button>
                  <button 
                    onClick={() => { navigate('/dashboard'); setShowProfileMenu(false); }} 
                    className="panel-menu-btn"
                  >
                    <History size={14} />
                    Audit Logs
                  </button>
                  <div className="panel-divider"></div>
                  <button 
                    onClick={() => alert("Mock Sign-Out completed.")} 
                    className="panel-menu-btn text-error"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
