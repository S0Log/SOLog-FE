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

export default function Sample() {
  //   const canvasContext = useContext(ChartCanvasContext);
  const chartContext = useContext(ChartContext);
  //   console.log(canvasContext);
  //   console.log(chartContext);

  useEffect(() => {
    chartContext.subscribe(`chart_${chartContext}`, {
      listener: (type, moreProps, _, e) => {
        // console.log('ABAB');
        switch (type) {
          case 'click':
            console.log('sdfsdfsdfsdfsdf');
            console.log(moreProps);
            console.log(_);
            console.log(e);
        }
        // console.log(type);
        // console.log(moreProps);
        // console.log(_);
        // console.log(e);
      },
    });
    return () => chartContext.unsubscribe(`chart_${chartContext}`);
  }, []);

  //   useEffect(() => {
  //     console.log('new');
  //     context.subscribe('chart_2', (type, moreProps, _, e) => {
  //       console.log('-'.repeat(10));
  //       console.log(type);
  //       console.log(moreProps);
  //       console.log(_);
  //       console.log(e);
  //     });
  //     return () => {
  //       context.unsubscribe('chart_2');
  //     };
  //   }, [rest.subscribe, rest.unsubscribe, rest.chartId]);

  return <div>Sample</div>;
}
