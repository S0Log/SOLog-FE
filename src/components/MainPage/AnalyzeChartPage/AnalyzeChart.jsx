import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';
import axios from 'axios';

import { CompanyContext } from '../../../contexts/CompanyContext';

export default function AnalyzeChart({ isBarClick, setIsBarClick, durationType, chartData }) {
  const location = useLocation();
  const { userInputCompany } = useContext(CompanyContext);

  const series = [
    {
      name: 'data',
      data: chartData,
    },
  ];

  const options = {
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
      events: {
        click: (event, chartContext, config) => {
          if (config.seriesIndex === 0) {
            setIsBarClick(true);
            alert('You clicked on a "core" series point!');
          }
        },
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
      tickAmount: 8,
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="candlestick" height="100%" width="100%" />
    </div>
  );
}
