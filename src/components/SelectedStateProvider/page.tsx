"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SelectedStateContextType {
  selectedState: string|undefined;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedStateContext = createContext<SelectedStateContextType | undefined>(undefined);

export const SelectedStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedState, setSelectedState] = useState("Pending");

  return (
    <SelectedStateContext.Provider value={{ selectedState, setSelectedState }}>
      {children}
    </SelectedStateContext.Provider>
  );
};

export const useSelectedState = () => {
  const context = useContext(SelectedStateContext);
  if (!context) {
    throw new Error('useSelectedState must be used within a SelectedStateProvider');
  }
  return context;
};
