import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import frTranslation from './locales/fr/translation.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en', // Default language
  fallbackLng: 'en',
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
    fr: { translation: frTranslation },
  },
  interpolation: {
    escapeValue: false, // React already safes from XSS
  },
});

export default i18n;