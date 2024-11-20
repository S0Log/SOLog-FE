import { createContext, useState } from 'react';
import IndexPage from './components/IndexPage/IndexPage';
import Search from './components/Search';

import React from 'react';
import { RouterProvider } from 'react-router-dom';

import mainRouter from './routers/main-router';
import { CompanyProvider } from './contexts/companyContext';

function App() {
  return (
    <CompanyProvider>
      <RouterProvider router={mainRouter} future={{ v7_startTransition: true }} />
    </CompanyProvider>
  );
}

export default App;
