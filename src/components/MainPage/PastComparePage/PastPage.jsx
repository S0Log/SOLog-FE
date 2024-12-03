import React, { useState } from 'react';
import Calendar from './Calendar';
import TermSelect from './TermSelect';
import PastCompareInfos from './PastCompareInfos';
import BaseChart from './BaseChart';

const PastPage = ({
  baseData,
  userSelectDt,
  setUserSelectDt,
  userSelectTerm,
  setUserSelectTerm,
  periodCnt,
  getData,
}) => {
  const [isBarClick, setIsBarClick] = useState(true);
  const [clickDt, setClickDt] = useState(userSelectDt);

  /** 검색 버튼을 눌렀을 때 */
  const onClick = (e) => {
    setClickDt(userSelectDt);
    setIsBarClick(true);
    getData();
  };

  return (
    <div className="flex w-full h-full flex-row gap-3">
      <div className="shadow-md rounded-3xl bg-white w-3/5 h-full flex flex-col">
        <div className="w-full h-[13%] flex justify-between">
          <div className="flex h-full gap-2">
            <div className="w-[10vw] h-full">
              <Calendar userSelectDt={userSelectDt} setUserSelectDt={setUserSelectDt} />
            </div>
            <div className="h-full">
              <TermSelect userSelectTerm={userSelectTerm} setUserSelectTerm={setUserSelectTerm} />
            </div>
          </div>
          <div>
            <button
              onClick={onClick}
              className="block h-full w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm"
            >
              검색
            </button>
          </div>
        </div>
        <div className="h-[87%] w-full">
          <BaseChart
            baseData={baseData}
            userSelectDt={userSelectDt}
            periodCnt={periodCnt}
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

export default PastPage;
