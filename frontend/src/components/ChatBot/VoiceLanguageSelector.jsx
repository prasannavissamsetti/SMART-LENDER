import React from 'react';
import { useLanguage } from './LanguageContext';
import { Volume2 } from 'lucide-react';

const VoiceLanguageSelector = () => {
  const { languageCode, selectedLanguage } = useLanguage();

  return (
    <div className="voice-language-badge" title={`Voice engine bound to: ${languageCode}`}>
      <Volume2 size={12} style={{ color: 'var(--color-success)' }} />
      <span>Voice: <strong>{languageCode}</strong></span>
    </div>
  );
};

export default VoiceLanguageSelector;
