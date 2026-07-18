import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import LanguageMenu from './LanguageMenu';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { languageLabel, languageFlag } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-selector-container" ref={containerRef}>
      <button
        type="button"
        className="btn-language-selector"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Language"
      >
        <Globe size={14} className="globe-icon-spin" />
        <span className="lang-selector-flag">{languageFlag}</span>
        <span className="lang-selector-text">{languageLabel}</span>
      </button>

      {isOpen && (
        <LanguageMenu onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageSelector;
