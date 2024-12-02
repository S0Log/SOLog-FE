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
  }, [userInputCompany]);

  const getChartData = () => {
    switch (activeTab) {
      case 'price':
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
    xAxis: {
      categories: price.map((item) => item.companyName), // X축에 회사 이름 표시
      title: {},
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    plotOptions: {
      column: {
        borderRadius: '15%',
      },
    },
    series: getChartData(),
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <div className="mt-2 font-black flex justify-between items-center border-b pb-2">
        <span className="text-sm text-muted-foreground ml-auto">기준: 2023.12</span>
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
