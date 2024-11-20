import { createContext, useState } from 'react';
import IndexPage from './components/IndexPage/IndexPage';
import Search from './components/Search';

import React from 'react';
import { RouterProvider } from 'react-router-dom';

import mainRouter from './routers/main-router';

export const CompanyContext = createContext();

function App() {
  const [userInput, setUserInput] = useState('');

  const contextValue = {
    userInput,
    setUserInput,
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      <RouterProvider router={mainRouter} future={{ v7_startTransition: true }} />
    </CompanyContext.Provider>
  );
}

export default App;
