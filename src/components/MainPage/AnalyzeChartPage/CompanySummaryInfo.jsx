import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { use } from 'framer-motion/client';

import { CompanyContext } from '../../../contexts/CompanyContext';

export default function CompanySummaryInfo({ isBarClick, durationType, date }) {
  const { userInputCompany } = useContext(CompanyContext);
  const [renderedData, setRenderedData] = useState({
    companyName: userInputCompany,
    date: date,
    open: 0,
    close: 0,
    volume: 0,
  });

  useEffect(() => {
    if (isBarClick === true) {
      const fetchSummary = async () => {
        const url = `/api/${userInputCompany}/companySummary`;
        const params = { companyName: userInputCompany, date: date, durationType: durationType };
        try {
          const res = await axios.get(url, { params });
          const data = res.data;
          setRenderedData({
            companyName: userInputCompany,
            date: data.date,
            open: data.openPrice,
            close: data.closePrice,
            volume: data.volume,
          });
        } catch (error) {
          console.error('');
        }
      };
      fetchSummary();
    }
  }, [isBarClick, durationType, date]);

  if (renderedData.volume === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="h-full flex flex-col justify-between p-2"
      style={{
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex flex-row justify-between">
        <p className="m-0 text-sm font-semibold">{renderedData.companyName.toUpperCase()}</p>
        <p className="m-0 text-sm">{renderedData.date}</p>
      </div>
      <div>
        <div className="flex flex-row justify-between">
          <p className="m-0 text-sm">시가</p>
          <p className="m-0 text-sm">{renderedData.open != null ? `${renderedData.open.toLocaleString()}원` : '-'}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="m-0 text-sm">종가</p>{' '}
          <p className="m-0 text-sm">{renderedData.close != null ? `${renderedData.close.toLocaleString()}원` : '-'}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="m-0 text-sm">거래량</p>
          <p className="m-0 text-sm">{renderedData.volume != null ? `${renderedData.volume.toLocaleString()}` : '-'}</p>
        </div>
      </div>
    </div>
  );
}
