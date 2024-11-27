import React, { useState,useEffect } from 'react';
import axios from 'axios'; // 이 줄을 추가하세요
export default function CompanyIntro() {
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );
  const [companyOverview,setCompanyOverview] = useState([]);
  const [companyOverviewDate,setCompanyOverviewDate] = useState();
  useEffect(() => {
    const getData = async () => {
      const url = '/api/companyInfo/삼성전자/companyOverview';
      try {
        const res = await axios.get(url);
        // companyOverviewDate는 날짜만 설정
        setCompanyOverviewDate(res.data.companyOverviewDate);
        // companyOverview는 '.'으로 split해서 배열로 설정
        setCompanyOverview(res.data.companyOverview.split('.'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">기업개요</h2>
            <span className="text-sm text-muted-foreground">기준: {companyOverviewDate}</span>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed">
            {companyOverview.map((item, index) => (
              // 마지막 항목을 제외하고 li를 렌더링
              index < companyOverview.length - 1 ? (
                <li key={index}>• {item.trim()}</li>
              ) : null
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
