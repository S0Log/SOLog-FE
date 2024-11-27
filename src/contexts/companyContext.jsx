import { createContext, useState } from 'react';

export const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [userInputCompany, setUserInputCompany] = useState('');

  const contextValue = {
    userInputCompany,
    setUserInputCompany,
  };

  return <CompanyContext.Provider value={contextValue}>{children}</CompanyContext.Provider>;
}
