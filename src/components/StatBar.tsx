import React from 'react';
import { getStatColor, translateStat } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue = 255 }) => {
  const { language } = useLanguage();
  const percentage = (value / maxValue) * 100;
  const color = getStatColor(value);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">
          {translateStat(label, language)}
        </span>
        <span className="text-sm font-bold text-gray-800">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};