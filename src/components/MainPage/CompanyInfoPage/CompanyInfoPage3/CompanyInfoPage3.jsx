import React, { useEffect, useState, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Nav } from 'react-bootstrap';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function CompanyInfoPage3() {
  const [activeTab, setActiveTab] = useState('price');
  const [price, setPrice] = useState([]);
  const [balance, setBalance] = useState([]);
  const [profitability, setProfitability] = useState([]);
  const [valuation, setValuation] = useState([]);
  const { userInputCompany } = useContext(CompanyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceData = await fetch(`/api/competitorInfo/${userInputCompany}/price`).then((res) => res.json());
        setPrice(priceData);

        const balanceData = await fetch(`/api/competitorInfo/${userInputCompany}/balanceSheet`).then((res) =>
          res.json(),
        );
        setBalance(balanceData);

        const profitabilityData = await fetch(`/api/competitorInfo/${userInputCompany}/profitability`).then((res) =>
          res.json(),
        );
        setProfitability(profitabilityData);

        const valuationData = await fetch(`/api/competitorInfo/${userInputCompany}/valuation`).then((res) =>
          res.json(),
        );
        setValuation(valuationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getChartData = () => {
    switch (activeTab) {
      case 'price':
        console.log(price);
        return price.map((item) => ({
          name: item.companyName,
          data: [Number(item.marketCapital.replace(/,/g, ''))],
        }));
      case 'balance sheet':
        return [
          {
            name: '부채총계',
            data: balance.map((item) => parseFloat(item.totalEquity || 0)),
          },
          {
            name: '자본총계',
            data: balance.map((item) => parseFloat(item.totalLiabilities || 0)),
          },
          {
            name: '자산총계',
            data: balance.map((item) => parseFloat(item.totalEquity + item.totalLiabilities || 0)),
          },
        ];
      case 'profitability':
        return [
          {
            name: '영업이익률',
            data: profitability.map((item) => parseFloat(item.operatingMargin || 0)),
          },
          {
            name: '매출증가율',
            data: profitability.map((item) => parseFloat(item.revenueGrowthRate || 0)),
          },
          {
            name: 'ROE',
            data: profitability.map((item) => parseFloat(item.roe || 0)),
          },
        ];
      case 'valuation':
        return [
          {
            name: 'PBR',
            data: valuation.map((item) => parseFloat(item.pbr || 0)),
          },
          {
            name: 'PER',
            data: valuation.map((item) => (item.per !== 'null' ? parseFloat(item.per || 0) : null)),
          },
        ];
      default:
        return [];
    }
  };

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    subtitle: {
      text:
        activeTab === 'price' || activeTab === 'balance sheet'
          ? '단위: 억 원'
          : activeTab === 'profitability'
            ? '단위: %'
            : activeTab === 'valuation'
              ? '단위: 배'
              : '',
      align: 'right',
      verticalAlign: 'bottom',
      x: 0,
      y: -30,
      style: {
        fontSize: '12px',
        color: '#666666',
      },
    },
    legend: {
      align: 'left',
    },
    xAxis: {
      categories: price.map((item) => item.companyName),
      title: {},
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    plotOptions: {
      column: {
        borderRadius: '15%',
      },
    },
    series:
      activeTab === 'price'
        ? [
            {
              name: '시가총액',
              data: price.map((item, index) => ({
                y: Number(item.marketCapital.replace(/,/g, '')), // 데이터 값
                color: Highcharts.getOptions().colors[index % Highcharts.getOptions().colors.length], // Highcharts 기본 색상 순환
              })),
            },
          ]
        : getChartData(),
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <div className="pt-2 pb-2 font-black flex justify-between items-center">
        <span className="text-sm font-medium ml-auto">기준: 2023.12</span>
      </div>
      <Nav
        fill
        variant="tabs"
        className="custom-tabs"
        defaultActiveKey="price"
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="price" className={activeTab === 'price' ? 'active-tab' : ''}>
            Price
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="balance sheet" className={activeTab === 'balance sheet' ? 'active-tab' : ''}>
            Balance Sheet
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profitability" className={activeTab === 'profitability' ? 'active-tab' : ''}>
            Profitability
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="valuation" className={activeTab === 'valuation' ? 'active-tab' : ''}>
            Valuation
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-14">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
}
