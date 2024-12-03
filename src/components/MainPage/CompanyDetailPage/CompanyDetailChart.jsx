import React, { useState, useEffect, useContext, useMemo, useCallback, memo } from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';

const MemoizedChart = memo(({ options, series }) => {
  return <Chart options={options} series={series} type="candlestick" height="100%" width="100%" />;
});

export default function CompanyDetailChart({ chartData, year, setYear, quarter, setQuarter }) {
  const [cumulativeScroll, setCumulativeScroll] = useState(0);
  const [isMouseOverChart, setIsMouseOverChart] = useState(false);
  const [groupedData, setGroupedData] = useState({});

  const SCROLL_THRESHOLD = 70;

  /** 현재 날짜로부터 이전 분기 값 구하기*/
  useEffect(() => {
    if (location.pathname === '/main/companyDetail') {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      if (currentMonth <= 3) {
        setYear(currentYear - 1);
        setQuarter(4);
      } else if (currentMonth <= 6) {
        setYear(currentYear);
        setQuarter(1);
      } else if (currentMonth <= 9) {
        setYear(currentYear);
        setQuarter(2);
      } else {
        setYear(currentYear);
        setQuarter(3);
      }
    }
  }, [location]);

  useEffect(() => {
    if (chartData.length > 0) {
      const groupedData = {};

      chartData.forEach((item, index) => {
        const date = new Date(item.x);
        const year = date.getFullYear();
        const quarter = Math.ceil((date.getMonth() + 1) / 3); // 1~3월: Q1, 4~6월: Q2, ...

        const key = `${year}-Q${quarter}`;
        if (!groupedData[key]) {
          groupedData[key] = [];
        }

        groupedData[key].push({ ...item, index });
      });

      setGroupedData(groupedData);
    }
  }, [chartData]);

  const renderData = useMemo(() => groupedData[`${year}-Q${quarter}`] || [], [groupedData, year, quarter]);
  const series = useMemo(() => [{ name: 'data', data: renderData }], [renderData]);

  const handlePan = (direction) => {
    const maxKey = Object.keys(groupedData).reduce(
      (max, current) =>
        new Date(current.replace(/-Q(\d)/, ' $1')) > new Date(max.replace(/-Q(\d)/, ' $1')) ? current : max,
      '2016-Q1',
    );

    const minKey = Object.keys(groupedData).reduce(
      (min, current) =>
        new Date(current.replace(/-Q(\d)/, ' $1')) < new Date(min.replace(/-Q(\d)/, ' $1')) ? current : min,
      '2025-Q4',
    );

    if (direction === 'next' && `${year}-Q${quarter}` < maxKey) {
      if (quarter == 4) {
        setYear(year + 1);
        setQuarter(1);
      } else {
        setQuarter(quarter + 1);
      }
    } else if (direction === 'previous' && `${year}-Q${quarter}` > minKey) {
      if (quarter == 1) {
        setYear(year - 1);
        setQuarter(4);
      } else {
        setQuarter(quarter - 1);
      }
    }
  };

  const handleWheel = useCallback(
    _.throttle((e) => {
      if (isMouseOverChart) {
        setCumulativeScroll((prev) => {
          const delta = e.deltaY;
          const newScroll = prev + delta;

          if (newScroll > SCROLL_THRESHOLD) {
            //아래로 움직일때
            handlePan('previous');
            return 0;
          } else if (newScroll < -SCROLL_THRESHOLD) {
            //위로 움직일때
            handlePan('next');
            return 0;
          }

          return newScroll;
        });
      }
    }, 300),
    [isMouseOverChart, year, quarter, chartData],
  );

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
        animations: { enabled: true },
        type: 'candlestick',
        zoom: { enabled: false },
        pan: { enabled: false },
        toolbar: { show: false },
        events: {
          click: (event, chartContext, config) => {
            const dataPointIndex = config.dataPointIndex;
            if (dataPointIndex !== -1) {
              const clickedBarData = renderData[dataPointIndex];
              const clickedDate = clickedBarData?.x;
            }
          },
        },
      },
      title: {
        text: `${year}-Q${quarter}`,
        align: 'right',
        style: {
          fontSize: '16px',
          fontWeight: 'light',
          color: 'black',
        },
      },
      legend: { show: false },
      xaxis: { type: 'category', tickAmount: 10 },
      yaxis: { tickAmount: 8, tooltip: { enabled: false } },
    }),
    [renderData, year, quarter],
  );

  return (
    <div
      className="w-full h-full bg-white shadow-md rounded-3xl p-2"
      onMouseEnter={() => setIsMouseOverChart(true)}
      onMouseLeave={() => setIsMouseOverChart(false)}
      onWheel={handleWheel}
    >
      <MemoizedChart options={options} series={series} />
    </div>
  );
}
