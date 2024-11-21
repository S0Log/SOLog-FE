import { createContext, useState } from 'react';

export const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [userInput, setUserInput] = useState('');

  const contextValue = {
    userInput,
    setUserInput,
  };

  return <CompanyContext.Provider value={contextValue}>{children}</CompanyContext.Provider>;
}
