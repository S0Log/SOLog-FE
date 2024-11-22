import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import {
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
} from 'react-financial-charts';
import { tsvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';

// URL: UniformResourceLocation
// URI: UniformResourceIdentification

const DATA_URL =
  'https://raw.githubusercontent.com/reactivemarkets/react-financial-charts/master/packages/stories/src/data/DAILY.tsv';
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

class StockChart extends React.Component {
  margin = { left: 0, right: 48, top: 0, bottom: 24 };
  pricesDisplayFormat = format('.2f');
  xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date);
  hoverDateFormat = timeFormat('%Y-%m-%d');
  numberFormat = format('.2f');
  render() {
    const { data: initialData, dateTimeFormat = '%d %b', height, ratio, width } = this.props;

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

    const { margin, xScaleProvider } = this;

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom;

    const elderRayHeight = 100;
    const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
    const chartHeight = gridHeight - elderRayHeight;

    const timeDisplayFormat = timeFormat(dateTimeFormat);
    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
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
        <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={this.barChartExtents}>
          <BarSeries fillStyle={this.volumeColor} yAccessor={this.volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
          <HoverTooltip
            yAccessor={ema12.accessor()}
            tooltip={{
              content: ({ currentItem, xAccessor }) => ({
                x: this.hoverDateFormat(xAccessor(currentItem)),
                y: [
                  {
                    label: 'open',
                    value: currentItem.open && this.numberFormat(currentItem.open),
                  },
                  {
                    label: 'high',
                    value: currentItem.high && this.numberFormat(currentItem.high),
                  },
                  {
                    label: 'low',
                    value: currentItem.low && this.numberFormat(currentItem.low),
                  },
                  {
                    label: 'close',
                    value: currentItem.close && this.numberFormat(currentItem.close),
                  },
                ],
              }),
            }}
          />
          <XAxis showGridLines showTicks={false} showTickLabel={false} />
          <YAxis showGridLines tickFormat={this.pricesDisplayFormat} />
          <CandlestickSeries />
          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />

          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={this.pricesDisplayFormat} />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />

          <ElderRaySeries yAccessor={elder.accessor()} />

          {/* <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d) => `${this.pricesDisplayFormat(d.bullPower)}, ${this.pricesDisplayFormat(d.bearPower)}`}
            origin={[8, 16]}
          /> */}
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }

  barChartExtents = (data) => {
    return data.volume;
  };

  candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  yEdgeIndicator = (data) => {
    return data.close;
  };

  volumeColor = (data) => {
    return data.close > data.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)';
  };

  volumeSeries = (data) => {
    return data.volume;
  };

  openCloseColor = (data) => {
    return data.close > data.open ? '#26a69a' : '#ef5350';
  };
}

export default function MyChart() {
  const [initialData, setInitialData] = useState([]);
  const dateTimeFormat = '%d %b';
  const width = '600';
  const height = (width * 3) / 4;
  // const height = '600';
  const ratio = 1;

  useEffect(() => {
    fetch(DATA_URL)
      .then((response) => response.text())
      .then((data) => tsvParse(data, parseData()))
      .then((data) => {
        setInitialData(data);
      });
  }, []);

  const RChart = useMemo(() => {
    return initialData.length > 0 ? (
      <StockChart data={initialData} dateTimeFormat={dateTimeFormat} width={width} height={height} ratio={ratio} />
    ) : (
      'Loading...'
    );
  }, [initialData]);

  return <div>{RChart}</div>;
}
