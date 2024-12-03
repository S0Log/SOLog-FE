import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const [navItems, setNavItems] = useState([
    { name: '기업 분석', route: '/main/companyInfo', isActive: false },
    { name: '분기 리포트', route: '/main/companyDetail', isActive: false },
    { name: '차트 Log', route: '/main/analyzeChart', isActive: false },
    { name: '과거 Log', route: '/main/pastCompare', isActive: false },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedNavItems = navItems.map((item) => ({
      ...item,
      isActive: location.pathname === item.route,
    }));
    setNavItems(updatedNavItems);
  }, [location.pathname]);

  const handleClick = (index) => {
    navigate(navItems[index].route);
  };

  return (
    <div className="w-[12vw] h-full py-3">
      <div className="w-full h-full flex flex-col items-center justify-start border-r-2 border-[#c5c6c7] py-3">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="cursor-pointer text-xl mb-7 transition-all duration-200 ease-in-out relative"
          >
            <span className="relative z-10">{item.name}</span>
            <div
              className={`absolute left-[-10%] bottom-0 w-[120%] h-[12px] ${item.isActive ? 'bg-[#8CD7F5]/60' : 'bg-transparent'} transition-all duration-200 ease-in-out z-0`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
