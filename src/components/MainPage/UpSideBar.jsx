import React from 'react';
import { useNavigate } from 'react-router-dom';

import SOLog from '/img/SOLog.png?url';
import Search from '../Search';

export default function UpSideBar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center h-[12vh] pt-3">
      <div className=" h-[10vh] w-[12vw] p-[1vw]">
        <img
          src={SOLog}
          alt="logo img"
          className="h-full w-full object-contain cursor-pointer"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <div className=" px-[51.356px]">
        <Search />
      </div>
    </div>
  );
}
