import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LanguageCode,
  LanguageOption,
  AVAILABLE_LANGUAGES,
  TRANSLATIONS,
} from '../translations/languages';
import { sound } from '../utils/sound';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (typeof TRANSLATIONS)['en'];
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Load persisted language from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    if (TRANSLATIONS[lang]) {
      sound.playClick(900);
      setLanguageState(lang);
      try {
        localStorage.setItem('portfolio_lang', lang);
      } catch {}
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages: AVAILABLE_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};