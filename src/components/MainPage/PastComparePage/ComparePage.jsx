import React, { useState } from 'react';
import Calendar from './Calendar';
import PastCompareInfos from './PastCompareInfos';
import compare_sol_friends from '../../../../public/img/compare_sol_friends_.png';

const ComparePage = () => {
  const [isTrue, setIsTrue] = useState(false);

  const compareSolFriends = '/img/compare_sol_friends.png'; // 정적 파일 경로 사용

  return (
    <div className="flex mt-10">
      <div className="shadow-md  p-2 rounded-xl bg-gray-200 w-[55vw]">
        <div className="w-[10vw]">
          <Calendar />
        </div>

        <div className="flex justify-between items-center bg-gray-200 mt-1 h-[230px] relative">
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
        </div>
      </div>
      <PastCompareInfos />
    </div>
  );
};

export default ComparePage;
