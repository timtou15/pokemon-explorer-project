import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:scale-105 hover:shadow-xl group"
      title={`${t('language.current')}: ${language === 'pt' ? t('language.portuguese') : t('language.english')} - ${t('language.clickToToggle')}`}
    >
      {/* Bandeira minimalista */}
      <div className="relative w-7 h-5 rounded-sm overflow-hidden shadow-sm border border-gray-200">
        {language === 'pt' ? (
          // Bandeira do Brasil - minimalista e elegante
          <div className="w-full h-full bg-gradient-to-b from-green-500 to-green-600 relative">
            {/* Losango amarelo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 transform rotate-45 rounded-sm shadow-sm"></div>
            </div>
            {/* Círculo azul central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-sm"></div>
          </div>
        ) : (
          // Bandeira dos EUA - minimalista e elegante
          <div className="w-full h-full relative">
            {/* Listras vermelhas e brancas */}
            <div className="absolute inset-0">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-gradient-to-r from-red-500 to-red-600"></div>
              </div>
            </div>
            {/* Cantão azul */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-gradient-to-br from-blue-700 to-blue-800 rounded-br-sm">
              {/* Estrelas minimalistas */}
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Texto do idioma */}
      <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
        {language === 'pt' ? 'PT' : 'EN'}
      </span>
      
      {/* Seta de troca sutil */}
      <div className="flex flex-col gap-0.5">
        <div className="w-1 h-0.5 bg-gray-400 group-hover:bg-blue-500 transition-colors transform group-hover:translate-x-0.5 duration-200"></div>
        <div className="w-1 h-0.5 bg-gray-400 group-hover:bg-blue-500 transition-colors transform group-hover:-translate-x-0.5 duration-200"></div>
      </div>
    </button>
  );
};
