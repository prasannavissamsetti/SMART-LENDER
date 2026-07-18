import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const SuggestionCards = ({ suggestions }) => {
  const { t } = useLanguage();
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestion-cards-wrapper">
      <p className="suggestion-section-title">
        <TrendingUp size={14} style={{ color: 'var(--color-success)' }} />
        {t.suggs_title || "Actionable Recommendations to Improve Eligibility"}
      </p>
      <div className="suggestion-grid">
        {suggestions.map((sugg, idx) => (
          <div key={idx} className="suggestion-card">
            <div className="suggestion-card-header">
              <h4>{sugg.title}</h4>
              <ArrowUpRight size={16} className="text-muted" />
            </div>
            <p>{sugg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionCards;
