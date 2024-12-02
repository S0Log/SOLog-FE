import React, { useState } from 'react';
import Calendar from './Calendar';
import PastCompareInfos from './PastCompareInfos';
import compare_sol_friends from '../../../../public/img/compare_sol_friends_.png';
import PastCompareChart from './PastCompareChart';

const ComparePage = () => {
  const [isBarClick, setIsBarClick] = useState(true);
  const [isTrue, setIsTrue] = useState(false);

  const compareSolFriends = '/img/compare_sol_friends.png'; // 정적 파일 경로 사용

  return (
    <div className="flex w-full h-full flex-row gap-3">
      <div className="shadow-md rounded-3xl bg-gray-100 w-3/5 h-full flex flex-col">
        <div className="w-[10vw] h-[15%]">
          <Calendar />
        </div>
        <div className="w-full h-[85%]">
          <PastCompareChart />
        </div>
        {/* <div className="flex justify-between items-center bg-gray-200 h-[230px] relative">
          <button
            type="button"
            className="text-gray-500 p-2 mr-3 rounded-lg border border-gray-300 bg-white shadow hover:bg-gray-200"
          >
            &lt;
          </button>
          <div className="flex flex-col items-center justify-start h-full w-full">
            {isTrue ? (
              <div>Stock Chart Image</div>
            ) : (
              <>
                <img
                  className="mt-5 h-[70%] object-contain -translate-y-4"
                  src={compare_sol_friends}
                  alt="compare sol friends"
                />
                <div className="text-gray-800 font-bold">비교할 기간을 설정해 주세요.</div>
              </>
            )}
          </div>
          <button
            type="button"
            className="text-gray-500 p-2 mr-3 rounded-lg border border-gray-300 bg-white shadow hover:bg-gray-200"
          >
            &gt;
          </button>
        </div> */}
      </div>
      <div className="w-2/5 h-full">
        <PastCompareInfos isBarClick={isBarClick} />
      </div>
    </div>
  );
};

export default ComparePage;
