import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function CompanyIntro() {
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );
  const [companyOverview, setCompanyOverview] = useState([]);
  const [companyOverviewDate, setCompanyOverviewDate] = useState();
  const { userInputCompany } = useContext(CompanyContext);

  useEffect(() => {
    const getData = async () => {
      const url = `/api/companyInfo/${userInputCompany}/companyOverview`;
      try {
        const res = await axios.get(url);

        setCompanyOverviewDate(res.data.companyOverviewDate);

        setCompanyOverview(res.data.companyOverview.split('.').slice(0, 5));
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
          <div className="flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">기업개요</h2>
            <span className="text-sm text-muted-foreground">기준: {companyOverviewDate}</span>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed">
            {companyOverview.map((item, index) =>
              index < companyOverview.length - 1 ? <li key={index}>• {item.trim()}</li> : null,
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
}
