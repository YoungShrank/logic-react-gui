import { createContext, useContext, useState } from 'react';

export const DeductionContext = createContext();

export const useDeduction = () => {
  return useContext(DeductionContext);
};

export const DeductionProvider = ({ children }) => {
  const [selectedConclusions, setSelectedConclusions] = useState([]);
  const [currentMode, setCurrentMode] = useState('Global');
  const [inferenceParams, setInferenceParams] = useState({});

  return (
    <DeductionContext.Provider value={{
      selectedConclusions,
      setSelectedConclusions,
      currentMode,
      setCurrentMode,
      inferenceParams,
      setInferenceParams
    }}>
      {children}
    </DeductionContext.Provider>
  );
};