import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center">
          <div className="p-3 bg-blue-500 text-white">
            <Globe size={20} />
          </div>
          <div className="flex">
            <button
              onClick={() => setLanguage('pt')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                language === 'pt'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={t('language.portuguese')}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={t('language.english')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};