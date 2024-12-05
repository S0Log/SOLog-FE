import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import _ from 'lodash';

export default function CompareChart({
  compareDatas,
  compareMarkingDatas,
  periodCnt,
  compareDataIdx,
  setCompareDataIdx,
  setIsBarClick,
  setClickDt,
}) {
  const [cumulativeScroll, setCumulativeScroll] = useState(0);
  const [isMouseOverChart, setIsMouseOverChart] = useState(false);

  const [coreData, setCoreData] = useState([]); //하이라이트되는 데이터
  const [exteriorData, setExteriorData] = useState([]); //이외의 데이터
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);

  const SCROLL_THRESHOLD = 70;

  /**coreData, exteriorData 채우기 */
  useEffect(() => {
    const coreDataTmp = [];
    const exteriorDataTmp = [];

    let targetIndex = -1;
    // formattedDate가 compareMarkingDatas[compareDataIdx]이거나 가장 가까운 이전 날짜를 가진 항목 찾기
    compareDatas[compareDataIdx]?.forEach((item, index) => {
      const formattedDate = item.date.split(' ')[0];
      if (formattedDate <= compareMarkingDatas[compareDataIdx]) {
        if (targetIndex === -1 || formattedDate > compareDatas[compareDataIdx][targetIndex].date.split(' ')[0]) {
          targetIndex = index;
        }
      }
    });

    // coreDataTmp와 exteriorDataTmp 채우기
    compareDatas[compareDataIdx]?.forEach((item, index) => {
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
    setMaxVal(Math.max(...(compareDatas?.[compareDataIdx]?.map((obj) => obj.high) || [])));
    setMinVal(Math.min(...(compareDatas?.[compareDataIdx]?.map((obj) => obj.low) || [])));
  }, [compareDatas, compareMarkingDatas, periodCnt, compareDataIdx]);

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

  const handlePan = (direction) => {
    if (direction === 'next' && compareDataIdx > 0) {
      //지금보다 최신 비슷한 데이터로
      setCompareDataIdx(compareDataIdx - 1);
    } else if (direction === 'previous' && compareDataIdx < compareDatas.length - 1) {
      //지금보다 과거 비슷한 데이터로
      setCompareDataIdx(compareDataIdx + 1);
    }
  };

  const handleWheel = useCallback(
    _.throttle((e) => {
      if (isMouseOverChart) {
        setCumulativeScroll((prev) => {
          const delta = e.deltaY;
          const newScroll = prev + delta;

          if (newScroll > SCROLL_THRESHOLD) {
            //위로 움직일때
            handlePan('next');
            return 0;
          } else if (newScroll < -SCROLL_THRESHOLD) {
            //아래로 움직일때
            handlePan('previous');
            return 0;
          }

          return newScroll;
        });
      }
    }, 300),
    [isMouseOverChart, compareDataIdx],
  );

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
    <div
      className="w-full h-full"
      onMouseEnter={() => setIsMouseOverChart(true)}
      onMouseLeave={() => setIsMouseOverChart(false)}
      onWheel={handleWheel}
    >
      <Chart options={options} series={series} type="candlestick" height="100%" width="100%" />
    </div>
  );
}
