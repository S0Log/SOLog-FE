import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import IndexPage from '~/components/IndexPage/IndexPage';
import BoardLayout from '~/routes/layout';
import AnalyzeChartPage from '../components/MainPage/AnalyzeChartPage/AnalyzeChartPage';
import CompanyDetailPage from '../components/MainPage/CompanyDetailPage/CompanyDetailPage';
import CompanyInfoPage from '../components/MainPage/CompanyInfoPage/CompanyInfoPage';
import PastComparePage from '../components/MainPage/PastComparePage/PastComparePage';

import Test from '../components/Test/Test';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <IndexPage />,
      index: true,
    },
    {
      path: '/main',
      element: <BoardLayout />,
      children: [
        { path: 'analyzeChart', element: <AnalyzeChartPage /> },
        { path: 'companyDetail', element: <CompanyDetailPage /> },
        { path: 'pastCompare', element: <PastComparePage /> },
        { path: 'companyInfo', element: <CompanyInfoPage /> },
      ],
    },
    {
      path: '/test',
      element: <Test />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
