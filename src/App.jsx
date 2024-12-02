import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';

import mainRouter from './routers/main-router';
import { CompanyProvider } from './contexts/CompanyContext';

function App() {
  return (
    <CompanyProvider>
      <RouterProvider router={mainRouter} future={{ v7_startTransition: true }} />
    </CompanyProvider>
  );
}

export default App;
