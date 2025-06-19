import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
};

export const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-24 mx-auto"></div>
          <div className="flex justify-center gap-2 mt-3">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};