import React, { useState } from 'react';
import Calendar from './Calendar';
import TermSelect from './TermSelect';
import PastArticle from './PastArticle';
import PastCompareInfos from './PastCompareInfos';
import PastCompareChart from './PastCompareChart';

const PastPage = () => {
  const [isBarClick, setIsBarClick] = useState(true);

  return (
    <div className="flex w-full h-full flex-row gap-3">
      <div className="shadow-md rounded-3xl bg-white w-3/5 h-full flex flex-col">
        <div className="w-full h-[15%] flex justify-between">
          <div className="w-[10vw] h-full">
            <Calendar />
          </div>
          <div>
            <TermSelect />
          </div>
        </div>
        <div className="h-[85%] w-full">
          <PastCompareChart setIsBarClick={setIsBarClick} />
        </div>
      </div>
      <div className="w-2/5 h-full">
        <PastCompareInfos isBarClick={isBarClick} />
      </div>
    </div>
  );
};

export default PastPage;
