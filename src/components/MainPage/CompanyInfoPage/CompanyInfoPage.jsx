import React from 'react';
import { useState } from 'react';

import CompanyInfoPage1 from './CompanyInfoPage1/CompanyInfoPage1';
import CompanyInfoPage2 from './CompanyInfoPage2/CompanyInfoPage2';
import CompanyInfoPage3 from './CompanyInfoPage3/CompanyInfoPage3';

export default function CompanyInfoPage() {
  const [pageNum, setPageNum] = useState(1);

  const clickPrevBtn = () => {
    setPageNum(pageNum - 1);
  };
  const clickNextBtn = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <div className="w-[88vw] h-[88vh]">
      <div className="w-full h-full px-[51.356px] py-3">
        <div className="w-full h-full bg-white rounded-3xl flex flex-col">
          {/* 페이지 내용 */}
          <div className="flex-grow overflow-hidden px-7 py-3">
            {pageNum === 1 ? <CompanyInfoPage1 /> : pageNum === 2 ? <CompanyInfoPage2 /> : <CompanyInfoPage3 />}
          </div>
          {/* 이동 버튼과 페이지 표시기*/}
          <div className="mt-auto flex items-center justify-between px-7 pb-3 relative">
            {/* 왼쪽 버튼 */}
            {pageNum !== 1 ? (
              <button onClick={clickPrevBtn} className="w-10 h-10 p-2 border rounded-xl text-black border-gray-600">
                ←
              </button>
            ) : (
              <div className="w-10 h-10"></div> // 버튼의 자리 차지
            )}

            {/* 페이지 표시기 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: 3 }, (_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full ${pageNum === index + 1 ? 'bg-[#003fcb]' : 'bg-gray-300'}`}
                ></span>
              ))}
            </div>

            {/* 오른쪽 버튼 */}
            {pageNum !== 3 ? (
              <button onClick={clickNextBtn} className="w-10 h-10 p-2 border rounded-xl text-black border-gray-600">
                →
              </button>
            ) : (
              <div className="w-10 h-10"></div> // 버튼의 자리 차지
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
