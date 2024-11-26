import React from 'react';
import CompanySummaryInfo from './CompanySummaryInfo';
import PastInfos from './PastInfos';

export default function TotalInfo(isBarClick) {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="bg-white h-1/5 rounded-md overflow-y-auto gap-0 shadow-md">
        <CompanySummaryInfo />
      </div>
      <div className="bg-white h-4/5 rounded-md shadow-md">
        <PastInfos isBarClick={isBarClick} />
      </div>
    </div>
  );
}
