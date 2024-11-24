import React from 'react';
import CompanyDetailChart from './CompanyDetailChart';
import CompanyDetail from './CompanyDetail';

export default function CompanyDetailPage() {
  return (
    <div className="flex-grow items-center justify-center w-[88vw] h-[88vh]">
      <CompanyDetailChart />
      <CompanyDetail />
    </div>
  );
}
