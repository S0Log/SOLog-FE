-SideBar.jsx;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const [navItems, setNavItems] = useState([
    { name: '기업상세', route: '/main/CompanyDetail', isActive: true },
    { name: '차트분석', route: '/main/analyzeChart', isActive: false },
    { name: '과거비교', route: '/main/pastCompare', isActive: false },
    { name: '기업정보', route: '/main/companyInfo', isActive: false },
  ]);
  const navigate = useNavigate();

  const handleClick = (index) => {
    const updatedNavItems = navItems.map((item, idx) => ({
      ...item,
      isActive: idx === index,
    }));

    setNavItems(updatedNavItems);

    navigate(navItems[index].route);
  };

  return (
    <div className="w-[12vw] h-full py-3">
      <div className="w-full h-full flex flex-col items-center justify-start border-r-2 border-[#c5c6c7] py-3">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor pointer text-xl mb-7 transition-all duration-200 ease-in-out z-10 relative`}
          >
            {item.name}
            <div
              className={`absolute left-0 bottom-0 w-full h-[12px] ${item.isActive ? 'bg-[#8CD7F5]/50' : 'bg-transparent'} transition-all duration-200 ease-in-out z-0`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
