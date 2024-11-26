import React from 'react';

export default function CompanySummaryInfo() {
  return (
    <div
      className="h-full flex flex-col justify-between p-2"
      style={{
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex flex-row justify-between">
        <p className="m-0 font-semibold">삼성전자</p>
        <p className="m-0 text-sm">2024.11.22</p>
      </div>
      <div>
        <div className="flex flex-row justify-between">
          <p className="m-0 text-sm">PER</p>
          <p className="m-0 text-sm">61,500</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="m-0 text-sm">ROE</p>
          <p className="m-0 text-sm">61,500</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="m-0 text-sm">거래량</p>
          <p className="m-0 text-sm">100,000</p>
        </div>
      </div>
    </div>
  );
}
