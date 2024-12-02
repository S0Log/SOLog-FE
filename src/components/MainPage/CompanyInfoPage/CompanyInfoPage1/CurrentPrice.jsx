import React, { useContext } from 'react';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function CurrentPrice() {
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );
  const { userInputCompany } = useContext(CompanyContext);
  const companyName = userInputCompany;
  // fetch 후 수정

  return (
    <div>
      <Card className="p-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">005930 코스피</div>
          <h1 className="text-2xl font-bold">삼성전자</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">51,000 KRW</span>
          </div>
          <div>
            <span className="text-red-500 flex items-center">
              <span className="mr-1">↑</span> {/* 유니코드 화살표 사용 */}
              +400 (0.79%)
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
