import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationState {
  currentPage: number;
  searchQuery: string;
  showFavorites: boolean;
  filters: any;
  scrollPosition: number;
}

interface NavigationContextType {
  navigationState: NavigationState;
  updateNavigationState: (state: Partial<NavigationState>) => void;
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPage: 1,
    searchQuery: '',
    showFavorites: false,
    filters: {
      types: [],
      generations: [],
      stats: {
        hp: { min: 0, max: 255 },
        attack: { min: 0, max: 255 },
        defense: { min: 0, max: 255 },
        speed: { min: 0, max: 255 },
      }
    },
    scrollPosition: 0
  });

  const updateNavigationState = (state: Partial<NavigationState>) => {
    setNavigationState(prev => ({ ...prev, ...state }));
  };

  const saveScrollPosition = () => {
    const scrollY = window.scrollY;
    setNavigationState(prev => ({ ...prev, scrollPosition: scrollY }));
  };

  const restoreScrollPosition = () => {
    setTimeout(() => {
      window.scrollTo(0, navigationState.scrollPosition);
    }, 100);
  };

  return (
    <NavigationContext.Provider value={{
      navigationState,
      updateNavigationState,
      saveScrollPosition,
      restoreScrollPosition
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};