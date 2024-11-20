import React from 'react';
import CardLeft from './CardLeft';
import CardRight from './CardRight';

export default function CompanyInfoPage2() {
  return (
    <div className="container mx-auto space-y-4 h-full flex flex-row gap-4 bg-yellow-200">
      <div className="flex-1">
        <CardLeft />
      </div>
      <div className="flex-1">
        <CardRight />
      </div>
    </div>
  );
}
