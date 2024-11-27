// import React from 'react';
import React, { useState,useEffect } from 'react';
export default function CardLeft() {
  
  const [stackedData, setStackedData] = useState([]);
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/companyInfo/삼성전자/salesTrendRatio");
        const data = await response.json();

        // Extract unique product names
        const uniqueProductNames = [...new Set(data.map((item) => item.productName))];
        setProductNames(uniqueProductNames);

        // Extract unique years
        const years = [...new Set(data.map((item) => item.salesTrendRatioDate.split("-")[0]))];

        // Create a structured format for stackedData
        const processedData = years.map((year) => {
          const yearData = data.filter((item) => item.salesTrendRatioDate.startsWith(year));
          const yearEntry = { year: `${year}/12` };

          uniqueProductNames.forEach((productName) => {
            const productData = yearData.find((item) => item.productName === productName);
            yearEntry[productName] = parseFloat(productData?.salesPercent || 0); // Default to 0 if no data
          });

          return yearEntry;
        });

        setStackedData(processedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="h-full">
      {/* 전체 제목 */}
      <div className="flex items-center justify-between border-y p-2 mb-4 bg-[#f6f7f9]">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 font-semibold">매출비중 추이</span>
        </div>
        <span className="text-gray-500 text-sm">단위 : %</span>
      </div>
      {/* 그래프 */}
      <div className="h-[200px] w-full mt-6">
        <div className="relative h-full w-full">
          {stackedData.map((data, index) => (
            <div
              key={data.year}
              className="absolute bottom-0 flex h-full w-[60px] flex-col justify-end"
              style={{ left: `${index * 80 + 40}px` }}
            >
              {productNames.map((name, idx) => (
                <div
                  key={name + idx}
                  style={{
                    height: `${(data[name] || 0) * 0.5}%`, // Y축 비율로 차트 높이 설정
                    backgroundColor: `rgba(${(idx * 50) % 255}, ${(idx * 100) % 255}, ${(idx * 150) % 255}, 0.7)`, // 색상 설정
                    marginBottom: "2px",
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <table className="w-full mt-4 border" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-2 text-left" style={{ width: "32%" }}>제품명</th>
            {stackedData.map((data) => (
              <th
                key={data.year}
                className="px-2 py-2 text-left"
                style={{ width: `${68 / stackedData.length}%` }}
              >
                {data.year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productNames.map((name) => (
            <tr key={name} className="border-b">
              <td className="px-2 py-2" style={{ width: "32%" }}>{name}</td>
              {stackedData.map((data) => (
                <td
                  key={data.year}
                  className="px-2 py-2"
                  style={{ width: `${68 / stackedData.length}%` }}
                >
                  {data[name]?.toFixed(2) || "0.00"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
