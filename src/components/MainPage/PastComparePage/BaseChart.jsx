import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

export default function BaseChart({ baseData, userSelectDt, periodCnt, setIsBarClick, setClickDt }) {
  const [coreData, setCoreData] = useState([]); //하이라이트되는 데이터
  const [exteriorData, setExteriorData] = useState([]); //이외의 데이터
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);

  /**coreData, exteriorData 채우기 */
  useEffect(() => {
    const coreDataTmp = [];
    const exteriorDataTmp = [];

    let targetIndex = -1;
    // formattedDate가 userSelectDt이거나 가장 가까운 이전 날짜를 가진 항목 찾기
    baseData?.forEach((item, index) => {
      const formattedDate = item.date.split(' ')[0];
      if (formattedDate <= userSelectDt) {
        if (targetIndex === -1 || formattedDate > baseData[targetIndex].date.split(' ')[0]) {
          targetIndex = index;
        }
      }
    });

    // coreDataTmp와 exteriorDataTmp 채우기
    baseData?.forEach((item, index) => {
      const formattedDate = item.date.split(' ')[0];
      const open = item.open;
      const high = item.high;
      const low = item.low;
      const close = item.close;

      if (targetIndex !== -1 && index >= targetIndex - (periodCnt - 1) && index <= targetIndex) {
        coreDataTmp.push({ x: formattedDate, y: [open, high, low, close] });
        exteriorDataTmp.push({ x: formattedDate, y: [null, null, null, null] });
      } else {
        exteriorDataTmp.push({ x: formattedDate, y: [open, high, low, close] });
        coreDataTmp.push({ x: formattedDate, y: [null, null, null, null] });
      }
    });

    setCoreData(coreDataTmp);
    setExteriorData(exteriorDataTmp);
    setMaxVal(Math.max(...baseData.map((obj) => obj.high)));
    setMinVal(Math.min(...baseData.map((obj) => obj.low)));
  }, [baseData]);

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
    dataLabels: { enabled: false },
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
          const dataPointIndex = config.dataPointIndex;
          if (dataPointIndex !== -1) {
            setIsBarClick(true);
            const clickedBarData = coreData[dataPointIndex];
            const clickedDate = clickedBarData?.x;
            setClickDt(clickedDate);
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
      tickAmount: 5,
      labels: {
        rotate: 0,
      },
    },
    yaxis: {
      tickAmount: 4,
      tooltip: {
        enabled: false,
      },
      min: minVal,
      max: maxVal,
    },
  };

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="candlestick" height="100%" width="100%" />
    </div>
  );
}
