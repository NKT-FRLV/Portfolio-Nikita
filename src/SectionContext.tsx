import { createContext, useContext } from 'react';

export type SectionIndex = 0 | 1 | 2 | 3;

export const SectionContext = createContext<SectionIndex>(0);

// Хук для использования контекста
export const useSection = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};