import React from 'react';
import CompanySummaryInfo from './CompanySummaryInfo';
import PastInfos from './PastInfos';

export default function TotalInfo({ isBarClick, durationType, date }) {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="bg-white h-1/5 rounded-3xl overflow-y-auto gap-0 shadow-md">
        <CompanySummaryInfo isBarClick={isBarClick} durationType={durationType} date={date} />
      </div>
      <div className="bg-white h-4/5 rounded-3xl shadow-md">
        <PastInfos isBarClick={isBarClick} date={date} />
      </div>
    </div>
  );
}
