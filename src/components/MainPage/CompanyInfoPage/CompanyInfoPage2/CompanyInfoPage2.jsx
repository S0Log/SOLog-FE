import React from 'react';
import CardLeft from './CardLeft';
import CardRight from './CardRight';

export default function CompanyInfoPage2() {
  return (
    <div className="grid gap-7 md:grid-cols-2 h-full">
      {/* Left Chart */}
      <CardLeft />
      {/* Right Chart */}
      <CardRight />
    </div>
  );
}
