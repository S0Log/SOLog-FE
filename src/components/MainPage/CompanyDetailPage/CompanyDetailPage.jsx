import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import CompanyDetailChart from './CompanyDetailChart';
import CompanyDetail from './CompanyDetail';
import { CompanyContext } from '../../../contexts/CompanyContext';

export default function CompanyDetailPage() {
  const [chartData, setChartData] = useState([]); //백엔드에서 가져온 주가 데이터
  const { userInputCompany } = useContext(CompanyContext); //회사명
  const [year, setYear] = useState(0); //그래프가 그려진 연도 값
  const [quarter, setQuarter] = useState(0); //그래프가 그려진 분기 값

  /** Backend에다가 요청 보내기 */
  useEffect(() => {
    const getData = async () => {
      const url = `/api/chart/company-detail?companyName=${userInputCompany}&durationType=week`;
      try {
        const res = await axios.get(url);

        // 현재 날짜 기준으로 현재 분기 계산
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentQuarter = Math.ceil((now.getMonth() + 1) / 3);

        const data = res.data.map((item) => ({
          x: item.date,
          y: [item.open, item.high, item.low, item.close],
        }));

        // 현재 분기 데이터 필터링
        const filteredData = data.filter((item) => {
          const itemDate = new Date(item.x);
          const itemYear = itemDate.getFullYear();
          const itemQuarter = Math.ceil((itemDate.getMonth() + 1) / 3);

          // 현재 분기가 아닌 데이터만 유지
          return !(itemYear === currentYear && itemQuarter === currentQuarter);
        });

        setChartData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (location.pathname === '/main/companyDetail') {
      getData();
    }
  }, [location]);

  return (
    <div className="flex flex-col w-[88vw] h-[88vh] px-[51.356px] py-3 gap-4 justify-center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1 }}
        className="flex-[6]"
      >
        <CompanyDetailChart
          chartData={chartData}
          year={year}
          setYear={setYear}
          quarter={quarter}
          setQuarter={setQuarter}
        />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1 }}
        className="flex-[4]"
      >
        <CompanyDetail year={year} quarter={quarter} />
      </motion.div>
    </div>
  );
}
