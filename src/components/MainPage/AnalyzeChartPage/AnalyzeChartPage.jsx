import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import DurationSelectBar from './DurationSelectBar';
import AnalyzeChart from './AnalyzeChart';
import TotalInfo from './TotalInfo';
import { CompanyContext } from '../../../contexts/CompanyContext';

export default function AnalyzeChartPage() {
  const [isBarClick, setIsBarClick] = useState(false);
  const [durationType, setDurationType] = useState('day'); //일봉, 주봉, 월봉 중에 선택
  const [chartData, setChartData] = useState([]); //백엔드에서 가져온 주가 데이터
  const [date, setDate] = useState('');
  const { userInputCompany } = useContext(CompanyContext);
  const [startIndex, setStartIndex] = useState(0); //그려진 차트의 시작 날짜
  const [endIndex, setEndIndex] = useState(100); //그려진 차트의 끝 날짜

  /** Backend에다가 요청 보내기 */
  useEffect(() => {
    const getData = async () => {
      const url = `/api/chart/company-detail?durationType=${durationType}&companyName=${userInputCompany}`;
      try {
        const res = await axios.get(url);

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
      getData();
    }
  }, [location, durationType]);

  /** 차트 시작 & 끝 날짜 정하기 */
  useEffect(() => {
    if (chartData.length > 0) {
      setStartIndex(Math.max(0, chartData.length - 30));
      setEndIndex(chartData.length);
    }
  }, [chartData]);

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
              setDate={setDate}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              endIndex={endIndex}
              setEndIndex={setEndIndex}
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
                setDate={setDate}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
                endIndex={endIndex}
                setEndIndex={setEndIndex}
              />
            </div>
          </div>
          {/* <div className="w-2/5 h-full">
            <TotalInfo isBarClick={isBarClick} durationType={durationType} date={date} />
          </div> */}
          <motion.div
            className="w-2/5 h-full"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <TotalInfo isBarClick={isBarClick} durationType={durationType} date={date} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
