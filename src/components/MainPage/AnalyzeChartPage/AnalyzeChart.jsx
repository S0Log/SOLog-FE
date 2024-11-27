import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  ChartContext,
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
  HoverTooltip,
  ChartCanvasContext,
} from 'react-financial-charts';
import { timeParse } from 'd3-time-format';
import Sample from './Sample';

export default function AnalyzeChart({ isBarClick, setIsBarClick }) {
  /** 차트 크기 */
  const chartContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const { offsetWidth, offsetHeight } = chartContainerRef.current;
        setDimensions({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    };

    // 초기 크기 설정
    updateDimensions();

    // 창 크기 변경 시 업데이트
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const { width, height } = dimensions;

  /** 데이터 가져오기 */
  const DATA_URL =
    'https://raw.githubusercontent.com/reactivemarkets/react-financial-charts/master/packages/stories/src/data/DAILY.tsv';
  const [initialData, setInitialData] = useState([]);

  const parseDate = timeParse('%Y-%m-%d');

  const parseData = () => {
    return (d) => {
      const date = parseDate(d.date);
      if (date === null) {
        d.date = new Date(Number(d.date));
      } else {
        d.date = new Date(date);
      }

      for (const key in d) {
        if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
          d[key] = +d[key];
        }
      }

      return d;
    };
  };

  /** Backend에다가 요청 보내기 */
  useEffect(() => {
    const getData = async () => {
      const url = '/api/chart/company-detail?durationType=day&companyName=삼성전자';
      try {
        const res = await axios.get(url);
        // console.log(res.data);
        setInitialData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date));
  const margin = { left: 12, right: 72, top: 24, bottom: 24 };

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => {
      d.ema12 = c;
    })
    .accessor((d) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => {
      d.ema26 = c;
    })
    .accessor((d) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(initialData)));
  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialData);
  const pricesDisplayFormat = format('.0f');
  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight];
  const chartHeight = gridHeight;
  // const yExtents = (data) => {
  //   return [data.high, data.low];
  // };
  const dateTimeFormat = '%d %b';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = (data) => {
    return data.volume;
  };

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

  const volumeColor = (data) => {
    return data.close > data.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)';
  };

  const volumeSeries = (data) => {
    return data.volume;
  };

  const openCloseColor = (data) => {
    return data.close > data.open ? '#26a69a' : '#ef5350';
  };

  // ChartContext를 사용하여 이벤트 추적
  const { currentItem, ...rest } = useContext(ChartContext);

  // console.log(currentItem, rest);

  return (
    <div ref={chartContainerRef} className="w-full h-full">
      {width > 0 && height > 0 && (
        <ChartCanvas
          height={height}
          ratio={3}
          width={width}
          margin={margin}
          data={data}
          displayXAccessor={displayXAccessor}
          seriesName="Data"
          xScale={xScale}
          xAccessor={xAccessor}
          xExtents={xExtents}
          zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
          <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={barChartExtents}>
            <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
            <Sample />
          </Chart>
          <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
            <XAxis showGridLines showTickLabel={true} />
            <YAxis showGridLines tickFormat={pricesDisplayFormat} />
            <CandlestickSeries />
            {/* <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} /> */}
            {/* <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} /> */}
            {/* <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} /> */}
            {/* <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} /> */}
            <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
            <EdgeIndicator
              itemType="last"
              rectWidth={margin.right}
              fill={openCloseColor}
              lineStroke={openCloseColor}
              displayFormat={pricesDisplayFormat}
              yAccessor={yEdgeIndicator}
            />

            {/* 기본 HoverTooltip 추가 */}
            <HoverTooltip
              yAccessor={ema12.accessor()}
              tooltip={{
                content: ({ currentItem, xAccessor }) => {
                  if (!currentItem)
                    return {
                      x: [],
                      y: [],
                    }; // currentItem이 null이면 tooltip을 표시하지 않음

                  return {
                    x: currentItem.date,
                    y: [
                      { label: 'open', value: currentItem.open },
                      { label: 'high', value: currentItem.high },
                      { label: 'low', value: currentItem.low },
                      { label: 'close', value: currentItem.close },
                    ],
                  };
                },
              }}
            />
            {/* <ZoomButtons /> */}
          </Chart>

          <CrossHairCursor />
        </ChartCanvas>
      )}
    </div>
  );
}
