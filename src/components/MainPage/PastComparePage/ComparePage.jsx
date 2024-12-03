import React, { useState } from 'react';
import Calendar from './Calendar';
import PastCompareInfos from './PastCompareInfos';
import PastCompareChart2 from './PastCompareChart2';

const ComparePage = ({ compareData, compareMarkingData, periodCnt }) => {
  const [isBarClick, setIsBarClick] = useState(true);
  const [isTrue, setIsTrue] = useState(false);

  return (
    <div className="flex w-full h-full flex-row gap-3">
      <div className="shadow-md rounded-3xl bg-gray-100 w-3/5 h-full flex flex-col">
        <div className="w-[10vw] h-[15%]">
          <Calendar />
        </div>
        <div className="w-full h-[85%]">
          <PastCompareChart2 compareData={compareData} compareMarkingData={compareMarkingData} periodCnt={periodCnt} />
        </div>
      </div>
      <div className="w-2/5 h-full">
        <PastCompareInfos isBarClick={isBarClick} />
      </div>
    </div>
  );
};

export default ComparePage;
