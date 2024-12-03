import React, { useState, useEffect, useContext } from 'react';
import Chart from 'react-apexcharts';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function CardLeft() {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [stackedData, setStackedData] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const { userInputCompany } = useContext(CompanyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/companyInfo/${userInputCompany}/salesTrendRatio`);
        const data = await response.json();

        // Extract unique product names
        const uniqueProductNames = [...new Set(data.map((item) => item.productName))];
        setProductNames(uniqueProductNames);

        // Extract unique years
        const years = [...new Set(data.map((item) => item.salesTrendRatioDate.split('-')[0]))];

        // Filter 2023-12 data and handle NaN or null
        const latestData = data
          .filter((item) => item.salesTrendRatioDate === '2023-12')
          .map((item) => ({
            ...item,
            salesPercent: isNaN(item.salesPercent) || item.salesPercent === null ? 0 : item.salesPercent,
            additionalMetric:
              isNaN(item.additionalMetric) || item.additionalMetric === null ? 0 : item.additionalMetric,
          }));

        // Format data for the chart
        const pieData = uniqueProductNames.map((productName) => {
          const productData = latestData.find((item) => item.productName === productName);
          return {
            name: productName,
            y: parseFloat(productData?.salesPercent || 0),
            z: parseFloat(productData?.additionalMetric || 0),
          };
        });

        // Filter out data with all zeros
        const filteredPieData = pieData.filter((item) => item.y > 0);

        setChartOptions({
          chart: {
            type: 'donut',
          },
          labels: filteredPieData.map((d) => d.name),
          tooltip: {
            y: {
              formatter: (val) => `${val}%`,
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontWeight: '200', // 글자 두께 (300은 얇은 두께)
              colors: ['#FFFFFF'], // 글자 색상
            },
          },
          plotOptions: {
            pie: {
              donut: {
                size: '65%',
              },
            },
          },
          colors: ['#4caefe', '#3dc3e8', '#2dd9db', '#1feeaf', '#0ff3a0', '#00e887', '#23e274'],
        });

        setChartSeries(filteredPieData.map((d) => d.y));

        // Prepare table data
        const processedData = years.map((year) => {
          const yearData = data.filter((item) => item.salesTrendRatioDate.startsWith(year));
          const yearEntry = { year };

          uniqueProductNames.forEach((productName) => {
            const productData = yearData.find((item) => item.productName === productName);
            yearEntry[productName] = parseFloat(productData?.salesPercent || 0);
          });

          return yearEntry;
        });

        setStackedData(processedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 font-semibold">매출비중 추이</span>
        </div>
      </div>

      <div className="h-[280px] w-full mb-6">
        {chartSeries.length > 0 && <Chart options={chartOptions} series={chartSeries} type="donut" height="100%" />}
        <div
          className="mr-2 float-right bottom-2 right-2 text-xs font-medium text-gray-700"
          style={{ pointerEvents: 'none' }}
        >
          단위: %, 기준: 2023
        </div>
      </div>

      <table className="text-xs shadow-md rounded-lg w-full border-none" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className="px-1 py-1 text-left" style={{ width: '32%' }}>
              제품명
            </th>
            {stackedData.map((data) => (
              <th key={data.year} className="px-2 py-2 text-left" style={{ width: `${68 / stackedData.length}%` }}>
                {data.year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productNames.map((name) => (
            <tr key={name}>
              <td className="px-1 py-1" style={{ width: '32%' }}>
                {name}
              </td>
              {stackedData.map((data) => (
                <td key={data.year} className="px-1 py-1" style={{ width: `${68 / stackedData.length}%` }}>
                  {isNaN(data[name]) ? '-' : data[name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
