import React from 'react';
import { useLanguage } from './LanguageContext';
import { Check } from 'lucide-react';

const LanguageMenu = ({ onClose }) => {
  const { languages, selectedLanguage, changeLanguage } = useLanguage();

  const handleSelect = (langName) => {
    changeLanguage(langName);
    if (onClose) onClose();
  };

  return (
    <div className="language-dropdown-menu">
      <div className="lang-menu-header">
        <span>Select Language</span>
      </div>
      <div className="lang-menu-list">
        {languages.map((lang) => {
          const isSelected = lang.name === selectedLanguage;
          return (
            <button
              key={lang.name}
              type="button"
              className={`lang-menu-item ${isSelected ? 'active' : ''}`}
              onClick={() => handleSelect(lang.name)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-label">{lang.label}</span>
              {isSelected && <Check size={14} className="lang-check-icon" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageMenu;
