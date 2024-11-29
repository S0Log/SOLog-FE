import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DurationSelectBar from './DurationSelectBar';
import AnalyzeChart from './AnalyzeChart';
import TotalInfo from './TotalInfo';
import { CompanyContext } from '../../../contexts/CompanyContext';

export default function AnalyzeChartPage() {
  const [isBarClick, setIsBarClick] = useState(false);
  const [durationType, setDurationType] = useState('day'); //일봉, 주봉, 월봉 중에 선택
  const [chartData, setChartData] = useState([]); //백엔드에서 가져온 주가 데이터
  const { userInputCompany } = useContext(CompanyContext);

  /** Backend에다가 요청 보내기 */
  useEffect(() => {
    const getData = async () => {
      const url = `/api/chart/company-detail?durationType=${durationType}&companyName=${userInputCompany}`;
      try {
        const res = await axios.get(url);
        console.log(res.data);

        const data = [];
        res.data.forEach((item, idx) => {
          data.push({ x: item.date, y: [item.open, item.high, item.low, item.close] });
        });

        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (location.pathname === '/main/analyzeChart') {
      console.log('backend로 요청을 보내요');
      getData();
    }
  }, [location, durationType]);

  return (
    <div className="w-[88vw] h-[88vh] px-[51.356px] py-3">
      {!isBarClick ? (
        <div className="w-full h-full bg-white rounded-3xl shadow-md flex flex-col">
          <div className="w-full flex-[1] p-2">
            <DurationSelectBar durationType={durationType} setDurationType={setDurationType} />
          </div>
          <div className="h-full w-full flex-[14] p-2">
            <AnalyzeChart
              isBarClick={isBarClick}
              setIsBarClick={setIsBarClick}
              durationType={durationType}
              chartData={chartData}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full h-full gap-3">
          <div className="w-3/5 h-full bg-white rounded-3xl shadow-md flex flex-col">
            <div className="w-full flex-[1] p-2">
              <DurationSelectBar durationType={durationType} setDurationType={setDurationType} />
            </div>
            <div className="h-full w-full flex-[14] p-2">
              <AnalyzeChart
                isBarClick={isBarClick}
                setIsBarClick={setIsBarClick}
                durationType={durationType}
                chartData={chartData}
              />
            </div>
          </div>
          <div className="w-2/5 h-full">
            <TotalInfo isBarClick={isBarClick} />
          </div>
        </div>
      )}
    </div>
  );
}
