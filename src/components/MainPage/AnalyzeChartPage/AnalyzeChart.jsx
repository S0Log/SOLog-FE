import React, { useState, useEffect, useContext, useCallback, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { CompanyContext } from '../../../contexts/CompanyContext';
import _ from 'lodash';

// Chart를 React.memo로 감싸기
const MemoizedChart = memo(({ options, series }) => {
  return <Chart options={options} series={series} type="candlestick" height="100%" width="100%" />;
});

export default function AnalyzeChart({ isBarClick, setIsBarClick, durationType, chartData, setDate }) {
  const location = useLocation();
  const { userInputCompany } = useContext(CompanyContext);

  const [startIndex, setStartIndex] = useState(0); // 현재 시작 인덱스
  const [endIndex, setEndIndex] = useState(100); // 현재 종료 인덱스
  const [cumulativeScroll, setCumulativeScroll] = useState(0); // 누적 스크롤 거리
  const [isMouseOverChart, setIsMouseOverChart] = useState(false); // 차트 위에 마우스 상태

  const SCROLL_THRESHOLD = 200; // 화면 이동을 트리거하는 스크롤 임계값
  const DATA_CHUNK_SIZE = 100; // 한 번에 보여줄 데이터 개수

  // 렌더링 데이터 계산
  const renderData = useMemo(() => {
    return chartData.slice(startIndex, endIndex);
  }, [chartData, startIndex, endIndex]);

  // 초기 데이터 설정
  useEffect(() => {
    if (chartData.length > 0) {
      const initialEndIndex = chartData.length;
      const initialStartIndex = Math.max(0, initialEndIndex - DATA_CHUNK_SIZE);
      setStartIndex(initialStartIndex);
      setEndIndex(initialEndIndex);
    }
  }, [chartData]);

  // 팬(pan) 동작에 따라 데이터 이동
  const handlePan = (direction) => {
    if (direction === 'next' && endIndex < chartData.length) {
      const newStartIndex = Math.min(chartData.length - DATA_CHUNK_SIZE, startIndex + DATA_CHUNK_SIZE);
      const newEndIndex = Math.min(chartData.length, endIndex + DATA_CHUNK_SIZE);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    } else if (direction === 'previous' && startIndex > 0) {
      const newStartIndex = Math.max(0, startIndex - DATA_CHUNK_SIZE);
      const newEndIndex = Math.max(DATA_CHUNK_SIZE, endIndex - DATA_CHUNK_SIZE);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  // Wheel 이벤트 핸들러
  const handleWheel = useCallback(
    _.throttle((e) => {
      if (isMouseOverChart && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const delta = e.deltaX;
        setCumulativeScroll((prev) => {
          const newScroll = prev + delta;

          // 이동 방향에 따라 팬 트리거
          if (newScroll > SCROLL_THRESHOLD) {
            handlePan('next');
            return 0; // 누적 거리 초기화
          } else if (newScroll < -SCROLL_THRESHOLD) {
            handlePan('previous');
            return 0; // 누적 거리 초기화
          }

          return newScroll; // 누적 스크롤 업데이트
        });
      }
    }, 300), // throttle 간격을 300ms로 설정
    [isMouseOverChart, startIndex, endIndex, chartData],
  );

  // 차트 series와 options를 메모이제이션
  const series = useMemo(() => {
    return [
      {
        name: 'data',
        data: renderData,
      },
    ];
  }, [renderData]);

  const options = useMemo(() => {
    return {
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: ['#DF0101'],
            downward: ['#0404B4'],
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      chart: {
        animations: {
          enabled: false,
        },
        type: 'candlestick',
        zoom: {
          enabled: true,
          type: 'x', // X축만 확대/축소 가능
          autoScaleYaxis: true, // Y축 자동 스케일링
        },
        pan: {
          enabled: true, // 팬 기능 활성화
          mode: 'x', // X축만 팬 가능
        },
        toolbar: {
          show: false, // 도구 표시 제거
        },
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
      legend: {
        show: false,
      },
      xaxis: {
        type: 'category',
        tickAmount: 10,
      },
      yaxis: {
        tickAmount: 8,
        tooltip: {
          enabled: false,
        },
      },
    };
  }, [renderData, setIsBarClick, setDate]);

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setIsMouseOverChart(true)} // 마우스가 차트 위로 들어갈 때
      onMouseLeave={() => setIsMouseOverChart(false)} // 마우스가 차트 밖으로 나갈 때
      onWheel={handleWheel} // 두 손가락 스크롤 동작 감지
    >
      <MemoizedChart options={options} series={series} />
    </div>
  );
}
