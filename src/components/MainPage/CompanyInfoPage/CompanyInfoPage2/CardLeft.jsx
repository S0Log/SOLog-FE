import React from 'react';

export default function CardLeft() {
  const stackedData = [
    { year: '2020/12', dx: 0, os: 0, soc: 0, harman: 3.88, other: 96.12 },
    { year: '2021/12', dx: 0, os: 0, soc: 0, harman: 2.59, other: 96.41 },
    { year: '2022/12', dx: 60.38, os: 32.58, soc: 11.38, harman: 4.37, other: -8.71 },
    { year: '2023/12', dx: 65.65, os: 25.72, soc: 11.96, harman: 5.56, other: -8.89 },
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
      {/* Chart */}
      <div className="h-[100px] w-full">
        <div className="relative h-full w-full">
          {stackedData.map((data, index) => (
            <div
              key={data.year}
              className="absolute bottom-0 flex h-full w-[60px] flex-col justify-end"
              style={{ left: `${index * 80 + 40}px` }}
            >
              {data.dx > 0 && <div style={{ height: `${data.dx}%` }} className="w-full bg-blue-500" />}
              {data.os > 0 && <div style={{ height: `${data.os}%` }} className="w-full bg-green-500" />}
              {data.soc > 0 && <div style={{ height: `${data.soc}%` }} className="w-full bg-yellow-500" />}
              {data.harman > 0 && <div style={{ height: `${data.harman}%` }} className="w-full bg-purple-500" />}
              {Math.abs(data.other) > 0 && (
                <div style={{ height: `${Math.abs(data.other)}%` }} className="w-full bg-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">연월</th>
            <th className="px-4 py-2 text-left">DX</th>
            <th className="px-4 py-2 text-left">OS</th>
            <th className="px-4 py-2 text-left">SOC/OLED</th>
            <th className="px-4 py-2 text-left">Harman</th>
            <th className="px-4 py-2 text-left">기타</th>
          </tr>
        </thead>
        <tbody>
          {stackedData.map((data) => (
            <tr key={data.year} className="border-b">
              <td className="px-4 py-2">{data.year}</td>
              <td className="px-4 py-2">{data.dx.toFixed(2)}</td>
              <td className="px-4 py-2">{data.os.toFixed(2)}</td>
              <td className="px-4 py-2">{data.soc.toFixed(2)}</td>
              <td className="px-4 py-2">{data.harman.toFixed(2)}</td>
              <td className="px-4 py-2">{data.other.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
