import React from 'react';

export default function CardRight() {
  const marketShareData = [
    { category: '스마트폰 패널', value: 50.7 },
    { category: 'DRAM', value: 42.2 },
    { category: 'TV', value: 30.1 },
    { category: '스마트폰', value: 19.7 },
    { category: '디지털 패널', value: 16.5 },
  ];

  return (
    <div className="h-full">
      {/* 전체 제목 */}
      <div className="flex items-center justify-between border-y p-2 mb-4 bg-[#f6f7f9]">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 font-semibold">매출비중 추이</span>
          <span className="text-gray-500 text-sm">[2023/12]</span>
        </div>
        <span className="text-gray-500 text-sm">단위 : %</span>
      </div>
      <div className="h-[100px] w-full">
        <div className="relative h-full w-full">
          {marketShareData.map((data, index) => (
            <div
              key={data.category}
              className="absolute bottom-0 flex h-full w-[60px] flex-col justify-end"
              style={{ left: `${index * 80 + 40}px` }}
            >
              <div style={{ height: `${data.value}%` }} className="w-full bg-blue-500" />
            </div>
          ))}
        </div>
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">제품</th>
            <th className="px-4 py-2 text-left">점유율</th>
          </tr>
        </thead>
        <tbody>
          {marketShareData.map((data) => (
            <tr key={data.category} className="border-b">
              <td className="px-4 py-2">{data.category}</td>
              <td className="px-4 py-2">{data.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
