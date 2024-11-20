import React from 'react';
import CurrentPrice from './CurrentPrice';
import StockPriceImg from './StockPriceImg';
import CompanyIntro from './CompanyIntro';

export default function CompanyInfoPage1() {
  return (
    <div className="container mx-auto space-y-4 h-full flex flex-col">
      <div className="flex-4 grid md:grid-cols-2 gap-4 items-center justify-center px-5">
        <CurrentPrice />
        <StockPriceImg />
      </div>
      <div className="flex-6">
        <CompanyIntro />
      </div>
    </div>
  );
}
