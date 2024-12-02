import React, { useState, useEffect, useContext, useCallback, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { CompanyContext } from '../../../contexts/CompanyContext';
import _ from 'lodash';

const MemoizedChart = memo(({ options, series }) => {
  return <Chart options={options} series={series} type="candlestick" height="100%" width="100%" />;
});

export default function AnalyzeChart({ isBarClick, setIsBarClick, durationType, chartData, setDate }) {
  const location = useLocation();
  const { userInputCompany } = useContext(CompanyContext);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(100);
  const [cumulativeScroll, setCumulativeScroll] = useState(0);
  const [isMouseOverChart, setIsMouseOverChart] = useState(false);

  const SCROLL_THRESHOLD = 70;
  const DATA_CHUNK_SIZE = 30;

  const renderData = useMemo(() => chartData.slice(startIndex, endIndex), [chartData, startIndex, endIndex]);

  useEffect(() => {
    if (chartData.length > 0) {
      const initialEndIndex = chartData.length;
      const initialStartIndex = Math.max(0, initialEndIndex - DATA_CHUNK_SIZE);
      setStartIndex(initialStartIndex);
      setEndIndex(initialEndIndex);
    }
  }, [chartData]);

  const handlePan = (direction) => {
    if (direction === 'next' && endIndex < chartData.length) {
      const newStartIndex = Math.min(chartData.length - DATA_CHUNK_SIZE, startIndex + 10);
      const newEndIndex = Math.min(chartData.length, endIndex + 10);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    } else if (direction === 'previous' && startIndex > 0) {
      const newStartIndex = Math.max(0, startIndex - 10);
      const newEndIndex = Math.max(DATA_CHUNK_SIZE, endIndex - 10);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const handleWheel = useCallback(
    _.throttle((e) => {
      if (isMouseOverChart) {
        setCumulativeScroll((prev) => {
          const delta = e.deltaY;
          const newScroll = prev + delta;

          if (newScroll > SCROLL_THRESHOLD) {
            handlePan('previous');
            return 0;
          } else if (newScroll < -SCROLL_THRESHOLD) {
            handlePan('next');
            return 0;
          }

          return newScroll;
        });
      }
    }, 300),
    [isMouseOverChart, startIndex, endIndex, chartData],
  );

  const series = useMemo(() => [{ name: 'data', data: renderData }], [renderData]);

  const options = useMemo(
    () => ({
      dataLabels: { enabled: false },
      plotOptions: {
        candlestick: {
          colors: { upward: ['#DF0101'], downward: ['#0404B4'] },
          wick: { useFillColor: true },
        },
      },
      chart: {
        animations: { enabled: false },
        type: 'candlestick',
        zoom: { enabled: false },
        pan: { enabled: false },
        toolbar: { show: false },
        events: {
          click: (event, chartContext, config) => {
            const dataPointIndex = config.dataPointIndex;
            if (dataPointIndex !== -1) {
              setIsBarClick(true);
              const clickedBarData = renderData[dataPointIndex];
              const clickedDate = clickedBarData?.x;
              setDate(clickedDate);
            }
          },
        },
      },
      legend: { show: false },
      xaxis: { type: 'category', tickAmount: 10 },
      yaxis: { tickAmount: 8, tooltip: { enabled: false } },
    }),
    [renderData, setIsBarClick, setDate],
  );

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setIsMouseOverChart(true)}
      onMouseLeave={() => setIsMouseOverChart(false)}
      onWheel={handleWheel}
    >
      <MemoizedChart options={options} series={series} />
    </div>
  );
}
