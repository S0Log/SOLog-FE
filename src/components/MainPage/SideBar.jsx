import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="w-[12vw] h-full py-3">
      <div className="w-full h-full flex flex-col items-center justify-start border-r-2 border-[#c5c6c7] py-3">
        <div
          onClick={() => {
            navigate('/main/analyzeChart');
          }}
          className="cursor-pointer text-xl mb-7"
        >
          차트분석
        </div>
        <div
          onClick={() => {
            navigate('/main/companyDetail');
          }}
          className="cursor-pointer text-xl mb-7"
        >
          기업상세
        </div>
        <div
          onClick={() => {
            navigate('/main/pastCompare');
          }}
          className="cursor-pointer text-xl mb-7"
        >
          과거비교
        </div>
        <div
          onClick={() => {
            navigate('/main/companyInfo');
          }}
          className="cursor-pointer text-xl mb-7"
        >
          기업정보
        </div>
      </div>
    </div>
  );
}
