import React from "react";

import SOLog from "../../assets/img/SOLog.png";

export default function UpSideBar() {
  return (
    <div className="flex items-center h-[10vh]">
      <div className=" h-[10vh] w-[12vw] p-[1vw]">
        <img
          src={SOLog}
          alt="logo img"
          className="h-full w-full object-contain"
        />
      </div>
      <div>입력받는 곳</div>
    </div>
  );
}
