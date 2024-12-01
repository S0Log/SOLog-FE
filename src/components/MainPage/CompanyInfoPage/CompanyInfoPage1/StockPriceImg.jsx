import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function StockPriceImg() {
  const { userInputCompany } = useContext(CompanyContext);
  const [chartData, setChartData] = useState([]);
  const [series, setSeries] = useState([
    {
      name: userInputCompany.toUpperCase(),
      data: [],
    },
  ]);
  const [xAxisCategories, setXAxisCategories] = useState([]);

  const fetchCompanyChart = async () => {
    const url = '/api/chart/select-duration-type';
    const params = {
      durationType: 'day',
      companyName: userInputCompany,
    };
    try {
      const res = await axios.get(url, { params });

      const closePrices = res.data.map((entry) => entry.close ?? 0);
      const dates = res.data.map((entry) => entry.date || '1970-01-01');

      setChartData(closePrices);
      setXAxisCategories(dates);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  useEffect(() => {
    fetchCompanyChart();
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      setSeries((prev) => [
        {
          ...prev[0],
          data: chartData,
        },
      ]);
    }
  }, [chartData]);

  if (chartData.length === 0 || xAxisCategories.length === 0) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      type: 'area',
      height: 275,
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.75,
        type: 'vertical',
        stops: [0, 100],
      },
    },
    colors: ['#91df5f'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    xaxis: {
      type: 'datetime',
      categories: xAxisCategories,
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: 'left',
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={275} />
    </div>
  );
}
