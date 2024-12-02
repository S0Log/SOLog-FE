import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function CardRight() {
  const [marketShareData, setMarketShareData] = useState([]);
  const { userInputCompany } = useContext(CompanyContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/companyInfo/${userInputCompany}/marketShare`)
      .then((response) => response.json())
      .then((data) => setMarketShareData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  // Prepare data for Highcharts
  const chartData = marketShareData.map((item) => ({
    name: item.mainProduct,
    y: parseFloat(item.sharePercent || 0),
    drilldown: item.mainProduct, // You can define drilldown data if needed
  }));

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: '시장 점유율 (%)',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}',
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>',
    },
    series: [
      {
        name: 'Market Share',
        colorByPoint: true,
        data: chartData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="h-full relative">
      <div className="flex items-center justify-between p-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 font-semibold">시장 점유율</span>
        </div>
        <span className="text-gray-500 text-sm">단위 : %</span>
      </div>

      <div className="absolute bottom-0 h-[375px] w-full">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
