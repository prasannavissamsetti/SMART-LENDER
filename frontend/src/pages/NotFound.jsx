import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Landmark size={64} style={{ color: 'var(--color-primary)' }} />
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The requested security workbench endpoint could not be found.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
