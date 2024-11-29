import { createContext, useEffect, useState } from 'react';

export const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [userInputCompany, setUserInputCompany] = useState(() => {
    return localStorage.getItem('userInputCompany') || '';
  });

  useEffect(() => {
    localStorage.setItem('userInputCompany', userInputCompany);
  }, [userInputCompany]);

  const contextValue = {
    userInputCompany,
    setUserInputCompany,
  };

  return <CompanyContext.Provider value={contextValue}>{children}</CompanyContext.Provider>;
}
