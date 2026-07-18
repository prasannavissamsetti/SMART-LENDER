import React from 'react';
import { useLanguage } from './LanguageContext';

export const Translate = ({ id, fallback = '' }) => {
  const { t } = useLanguage();
  return <>{t[id] || fallback || id}</>;
};

export const TranslationProvider = ({ children }) => {
  return <>{children}</>;
};

export default TranslationProvider;
