import React from 'react';
import { Nav } from 'react-bootstrap';
import { ResponsiveBar } from '@nivo/bar';

export default function CompanyInfoPage3() {
  const data = [
    {
      company: 'LG전자',
      ROE: 3,
      영업이익률: 2,
      매출액증가율: 1,
    },
    {
      company: '삼성전자',
      ROE: 2,
      영업이익률: 2,
      매출액증가율: -12,
    },
    {
      company: 'SK하이닉스',
      ROE: -15,
      영업이익률: -22,
      매출액증가율: -25,
    },
    {
      company: 'LG디스플레이',
      ROE: -30,
      영업이익률: -10,
      매출액증가율: -17,
    },
  ];

  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="price" onSelect={(selectedKey) => console.log(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="price">Price</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="balance sheet">Balance Sheet</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profitability">Profitability</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="valuation">Valuation</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="h-[400px] w-full">
        <ResponsiveBar
          data={data}
          keys={['ROE', '영업이익률', '매출액증가율']}
          indexBy="company"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#36A2EB', '#7C4DFF', '#2ECC71']}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Values',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          role="application"
          ariaLabel="Bar chart comparing company metrics"
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in company: ${e.indexValue}`}
        />
      </div>
    </>
  );
}
