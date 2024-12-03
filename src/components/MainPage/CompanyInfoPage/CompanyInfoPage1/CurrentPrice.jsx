import React, { useContext, useState, useEffect } from 'react';
import { CompanyContext } from '../../../../contexts/CompanyContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function CurrentPrice() {
  const location = useLocation();
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );
  const { userInputCompany } = useContext(CompanyContext);
  const [pastData, setPastData] = useState({
    companyNum: '',
    marketType: '',
    companyName: '',
    yesterday: 0,
    diff: 0,
    percentage: 0.0,
  });

  const fetchPast = async () => {
    const url = `/api/companyInfo/${userInputCompany}/daily`;
    const res = await axios.get(url, { userInputCompany });
    const data = res.data;
    console.log(data);
    setPastData((prev) => ({ ...prev, ...data }));
  };
  useEffect(() => {
    async function loadData() {
      await fetchPast();
    }
    if (location.pathname === '/main/companyInfo') {
      loadData();
    }
  }, [location]);

  return (
    <div>
      <Card className="p-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">
            {pastData.companyNum} {pastData.marketType}
          </div>
          <h1 className="text-2xl font-bold">{pastData.companyName}</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{pastData.yesterday.toLocaleString()} KRW</span>
          </div>

          <div>
            <span className={`flex items-center ${pastData.diff >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
              <span className="mr-1">{pastData.diff >= 0 ? '↑' : '↓'}</span>
              {pastData.diff >= 0 ? `+${pastData.diff.toLocaleString()} ` : `${pastData.diff.toLocaleString()} `}(
              {Math.abs(pastData.percentage * 100).toFixed(2)}%)
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
