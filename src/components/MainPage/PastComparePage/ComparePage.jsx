import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import PastCompareInfos from './PastCompareInfos';
import CompareChart from './CompareChart';

const ComparePage = ({ compareDatas, compareMarkingDatas, periodCnt, compareDataIdx, setCompareDataIdx }) => {
  const [isBarClick, setIsBarClick] = useState(true);
  const [clickDt, setClickDt] = useState(null);

  useEffect(() => {
    setClickDt(compareMarkingDatas[compareDataIdx]);
  }, [compareDatas, compareMarkingDatas, periodCnt, compareDataIdx]);

  return (
    <div className="flex w-full h-full flex-row gap-3">
      <div className="shadow-md rounded-3xl bg-gray-100 w-3/5 h-full flex flex-col">
        <div className="w-[9vw] h-[13%]">
          <input
            type="text"
            placeholder="날짜 선택"
            value={compareMarkingDatas[compareDataIdx]?.slice(0, 10) || ''}
            className="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none bg-gray-100"
            readOnly
          />
        </div>
        <div className="w-full h-[87%]">
          <CompareChart
            compareDatas={compareDatas}
            compareMarkingDatas={compareMarkingDatas}
            periodCnt={periodCnt}
            compareDataIdx={compareDataIdx}
            setCompareDataIdx={setCompareDataIdx}
            setIsBarClick={setIsBarClick}
            setClickDt={setClickDt}
          />
        </div>
      </div>
      <div className="w-2/5 h-full">
        <PastCompareInfos isBarClick={isBarClick} date={clickDt} />
      </div>
    </div>
  );
};

export default ComparePage;
