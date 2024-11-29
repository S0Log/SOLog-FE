import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

export default function PastCompareChart({ setIsBarClick }) {
  // const highlightStart = 13; // 강조 시작 인덱스
  // const highlightEnd = 23; // 강조 끝 인덱스
  // const [selected, setSelected] = useState(null);

  const [coreData, setCoreData] = useState([]); //하이라이트되는 데이터
  const [exteriorData, setExteriorData] = useState([]); //이외의 데이터
  const [yaxisMin, setYaxisMin] = useState(0);
  const [yaxisMax, setYaxisMax] = useState(0);
  const startDate = '2024-11-27';
  const periodCnt = 5;
  const period = 'one';
  const companyNm = '삼성전자';

  /** Backend에다가 요청 보내기 */
  useEffect(() => {
    const getData = async () => {
      const url = `/api/chart/trend-match?companyName=${companyNm}&period=${period}&baseDate=${startDate}&startDate=${startDate}`;
      try {
        const res = await axios.get(url);

        const coreDataTmp = [];
        const exteriorDataTmp = [];

        let targetIndex = -1;
        console.log(res.data[0]);
        // formattedDate가 startDate이거나 가장 가까운 이전 날짜를 가진 항목 찾기
        res.data[0].forEach((item, index) => {
          const formattedDate = item.date.split(' ')[0];
          if (formattedDate <= startDate) {
            if (targetIndex === -1 || formattedDate > res.data[0][targetIndex].date.split(' ')[0]) {
              targetIndex = index;
            }
          }
        });

        // coreDataTmp와 exteriorDataTmp 채우기
        res.data[0].forEach((item, index) => {
          const formattedDate = item.date.split(' ')[0];
          const open = item.open;
          const high = item.high;
          const low = item.low;
          const close = item.close;

          if (targetIndex !== -1 && index >= targetIndex - (periodCnt - 1) && index <= targetIndex) {
            coreDataTmp.push({ x: formattedDate, y: [open, high, low, close] });
            exteriorData.push({ x: formattedDate, y: [null, null, null, null] });
          } else {
            exteriorDataTmp.push({ x: formattedDate, y: [open, high, low, close] });
            coreDataTmp.push({ x: formattedDate, y: [null, null, null, null] });
          }
        });

        console.log('core', coreDataTmp);
        console.log('exterior', exteriorDataTmp);
        setCoreData(coreDataTmp);
        setExteriorData(exteriorDataTmp);
        setYaxisMax(Math.max(...res.data[0].map((item) => item.high)));
        setYaxisMin(Math.min(...res.data[0].map((item) => item.low)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const series = [
    {
      name: 'core',
      data: coreData,
    },
    {
      name: 'else',
      data: exteriorData,
    },
  ];

  const options = {
    plotOptions: {
      candlestick: {
        colors: {
          upward: ['#DF0101', '#F5A9A9'],
          downward: ['#0404B4', '#A9D0F5'],
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    chart: {
      type: 'candlestick',
      events: {
        click: (event, chartContext, config) => {
          if (config.seriesIndex === 0) {
            alert('You clicked on a "core" series point!');
          }
        },
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'category',
      tickAmount: 10,
    },
    yaxis: {
      min: yaxisMin,
      max: yaxisMax,
      tickAmount: 4,
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Chart
        options={{
          ...options,
          grid: {},
        }}
        series={series}
        type="candlestick"
        height="100%"
        width="100%"
      />
    </div>
  );
}
