import React from 'react';
import { useState } from 'react';

import DurationSelectBar from './DurationSelectBar';
import AnalyzeChart from './AnalyzeChart';
import TotalInfo from './TotalInfo';

export default function AnalyzeChartPage() {
  const [isBarClick, setIsBarClick] = useState(false);

  return (
    <div className="flex justify-between w-[88vw] h-[88vh] px-[51.356px] py-3 gap-3">
      <div className="w-3/5 h-full bg-white rounded-md shadow-md flex flex-col">
        <div className="w-full flex-[1] p-2">
          <DurationSelectBar />
        </div>
        <div className="h-full w-full flex-[14] p-2">
          <AnalyzeChart isBarClick={isBarClick} setIsBarClick={setIsBarClick} />
        </div>
      </div>
      <div className="w-2/5 h-full">
        <TotalInfo isBarClick={isBarClick} />
      </div>
    </div>
  );
}
