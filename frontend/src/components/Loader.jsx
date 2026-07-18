import React from 'react';

const Loader = ({ message = 'Analyzing parameters and estimating risk...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{message}</p>
    </div>
  );
};

export default Loader;
