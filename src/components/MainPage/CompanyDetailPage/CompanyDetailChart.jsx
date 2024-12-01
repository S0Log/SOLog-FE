import React, { useState, useEffect, useContext } from 'react';

import { CompanyContext } from '../../../contexts/CompanyContext';

export default function CompanyDetailChart() {
  const [chartData, setChartData] = useState([]); //백엔드에서 가져온 주가 데이터
  return (
    <div className="flex flex-row">
      <div>
        <button
          type="button"
          className="text-gray-500 p-2 mr-3 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-200"
        >
          &lt;
        </button>
      </div>
      <div className="text-center">Stock Chart Image</div>
      <div>
        <button
          type="button"
          className="text-gray-500 p-2 ml-3 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
