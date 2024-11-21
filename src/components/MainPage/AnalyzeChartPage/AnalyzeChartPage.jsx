import React from 'react';
import { useState } from 'react';

import DurationSelectBar from './DurationSelectBar';
import AnalyzeChart from './AnalyzeChart';
import TotalInfo from './TotalInfo';

export default function AnalyzeChartPage() {
  const [isBarClick, setIsBarClick] = useState(false);

  return (
    <div className="flex justify-between w-[88vw] h-[88vh] px-[51.356px] py-3">
      <div className="w-3/4 h-full">
        <DurationSelectBar />
        <AnalyzeChart />
      </div>
      <div className="w-1/4 h-full">
        <TotalInfo />
      </div>
    </div>
  );
}
