import React from "react";

export default function SideBar() {
  return (
    <div className="w-[12vw] h-full py-10">
      <div className="w-full h-full flex flex-col items-center justify-start border-r-2 border-[#c5c6c7] py-3">
        <div className="cursor-pointer text-xl mb-7">차트분석</div>
        <div className="cursor-pointer text-xl mb-7">기업상세</div>
        <div className="cursor-pointer text-xl mb-7">과거비교</div>
        <div className="cursor-pointer text-xl mb-7">기업정보</div>
      </div>
    </div>
  );
}
