// import React, { useState, useEffect } from 'react';
// import { Nav } from 'react-bootstrap';
// import { ResponsiveBar } from '@nivo/bar';

// export default function CompanyInfoPage3() {
//   const [activeTab, setActiveTab] = useState('price');
//   const [price, setPrice] = useState([]);
//   const [balance, setBalance] = useState([]);
//   const [profitability, setProfitability] = useState([]);
//   const [valuation, setValuation] = useState([]);
//   useEffect(() => {
//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/price')
//       .then((response) => response.json())
//       .then((data) => setPrice(data))
//       .catch((error) => console.error('Error fetching data: ', error));
//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/balanceSheet')
//       .then((response) => response.json())
//       .then((data) => setBalance(data))
//       .catch((error) => console.error('Error fetching data: ', error));
//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/profitability')
//       .then((response) => response.json())
//       .then((data) => setProfitability(data))
//       .catch((error) => console.error('Error fetching data: ', error));
//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/valuation')
//       .then((response) => response.json())
//       .then((data) => setValuation(data))
//       .catch((error) => console.error('Error fetching data: ', error));
//   }, []);
//   const getChartData = () => {
//     switch (activeTab) {
//       case 'price':
//         return price.map((item) => ({
//           companyName: item.companyName,
//           시가총액: Number(item.marketCapital.replace(/,/g, '')), // 숫자로 변환
//         }));
//       case 'balance sheet':
//         return balance.map((item) => ({
//           companyName: item.companyName,
//           자본총계: item.totalEquity,
//           부채총계: item.totalLiabilities,
//         }));
//       case 'profitability':
//         return profitability.map((item) => ({
//           companyName: item.companyName,
//           영업이익률: parseFloat(item.operatingMargin),
//           매출증가율: parseFloat(item.revenueGrowthRate),
//           ROE: parseFloat(item.roe),
//         }));
//       case 'valuation':
//         return valuation.map((item) => ({
//           companyName: item.companyName,
//           PBR: parseFloat(item.pbr),
//           PER: item.per !== 'null' ? parseFloat(item.per) : null, // null 값 처리
//         }));
//       default:
//         return [];
//     }
//   };
//   console.log(price);
//   console.log(balance);
//   console.log(profitability);
//   console.log(valuation);

//   //   return (
//   //     <>
//   //       <Nav fill variant="tabs" defaultActiveKey="price" onSelect={(selectedKey) => console.log(selectedKey)}>
//   //         <Nav.Item>
//   //           <Nav.Link eventKey="price" onClick={() => {}}>
//   //             Price
//   //           </Nav.Link>
//   //         </Nav.Item>
//   //         <Nav.Item>
//   //           <Nav.Link eventKey="balance sheet">Balance Sheet</Nav.Link>
//   //         </Nav.Item>
//   //         <Nav.Item>
//   //           <Nav.Link eventKey="profitability">Profitability</Nav.Link>
//   //         </Nav.Item>
//   //         <Nav.Item>
//   //           <Nav.Link eventKey="valuation">Valuation</Nav.Link>
//   //         </Nav.Item>
//   //       </Nav>

//   //       <div className="h-[400px] w-full">
//   //         <ResponsiveBar

//   //           indexBy="companyName"
//   //           margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
//   //           padding={0.3}
//   //           valueScale={{ type: 'linear' }}
//   //           indexScale={{ type: 'band', round: true }}
//   //           colors={['#36A2EB', '#7C4DFF', '#2ECC71']}
//   //           borderColor={{
//   //             from: 'color',
//   //             modifiers: [['darker', 1.6]],
//   //           }}
//   //           axisTop={null}
//   //           axisRight={null}
//   //           axisBottom={{
//   //             tickSize: 5,
//   //             tickPadding: 5,
//   //             tickRotation: 0,
//   //           }}
//   //           axisLeft={{
//   //             tickSize: 5,
//   //             tickPadding: 5,
//   //             tickRotation: 0,
//   //             legend: 'Values',
//   //             legendPosition: 'middle',
//   //             legendOffset: -40,
//   //           }}
//   //           labelSkipWidth={12}
//   //           labelSkipHeight={12}
//   //           role="application"
//   //           ariaLabel="Bar chart comparing company metrics"
//   //           barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in company: ${e.indexValue}`}
//   //         />
//   //       </div>
//   //     </>
//   //   );
//   // }
//   return (
//     <>
//       <div className="flex justify-between items-center border-b pb-2">
//         <span className="text-sm text-muted-foreground ml-auto">기준: 2023.12</span>
//       </div>

//       <Nav fill variant="tabs" defaultActiveKey="price" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
//         <Nav.Item>
//           <Nav.Link eventKey="price">Price</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="balance sheet">Balance Sheet</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="profitability">Profitability</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="valuation">Valuation</Nav.Link>
//         </Nav.Item>
//       </Nav>

//       <div className="h-[400px] w-full">
//         <ResponsiveBar
//           data={getChartData()}
//           keys={
//             activeTab === 'price'
//               ? ['시가총액']
//               : activeTab === 'balance sheet'
//                 ? ['자본총계', '부채총계']
//                 : activeTab === 'profitability'
//                   ? ['영업이익률', '매출증가율', 'ROE']
//                   : ['PBR', 'PER']
//           }
//           indexBy="companyName"
//           margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
//           padding={0.3}
//           valueScale={{ type: 'linear' }}
//           indexScale={{ type: 'band', round: true }}
//           colors={['#36A2EB', '#7C4DFF', '#2ECC71']}
//           borderColor={{
//             from: 'color',
//             modifiers: [['darker', 1.6]],
//           }}
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//           }}
//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             //legend: 'Values',
//             //legendPosition: 'middle',
//             //legendOffset: -40,
//           }}
//           labelSkipWidth={12}
//           labelSkipHeight={12}
//           role="application"
//           ariaLabel="Bar chart comparing company metrics"
//           //barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in company: ${e.indexValue}`}
//         />
//       </div>
//     </>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { Nav } from 'react-bootstrap';
// import { ResponsiveBar } from '@nivo/bar';

// export default function CompanyInfoPage3() {
//   const [activeTab, setActiveTab] = useState('price');
//   const [price, setPrice] = useState([]);
//   const [balance, setBalance] = useState([]);
//   const [profitability, setProfitability] = useState([]);
//   const [valuation, setValuation] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/price')
//       .then((response) => response.json())
//       .then((data) => setPrice(data))
//       .catch((error) => console.error('Error fetching data: ', error));

//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/balanceSheet')
//       .then((response) => response.json())
//       .then((data) => setBalance(data))
//       .catch((error) => console.error('Error fetching data: ', error));

//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/profitability')
//       .then((response) => response.json())
//       .then((data) => setProfitability(data))
//       .catch((error) => console.error('Error fetching data: ', error));

//     fetch('http://localhost:8080/api/competitorInfo/삼성전자/valuation')
//       .then((response) => response.json())
//       .then((data) => setValuation(data))
//       .catch((error) => console.error('Error fetching data: ', error));
//   }, []);

//   const getChartData = () => {
//     switch (activeTab) {
//       case 'price':
//         return price.map((item) => ({
//           companyName: item.companyName,
//           시가총액: Number(item.marketCapital.replace(/,/g, '')),
//         }));
//       case 'balance sheet':
//         return balance.map((item) => ({
//           companyName: item.companyName,
//           자본총계: item.totalEquity,
//           부채총계: item.totalLiabilities,
//         }));
//       case 'profitability':
//         return profitability.map((item) => ({
//           companyName: item.companyName,
//           영업이익률: parseFloat(item.operatingMargin),
//           매출증가율: parseFloat(item.revenueGrowthRate),
//           ROE: parseFloat(item.roe),
//         }));
//       case 'valuation':
//         return valuation.map((item) => ({
//           companyName: item.companyName,
//           PBR: parseFloat(item.pbr),
//           PER: item.per !== 'null' ? parseFloat(item.per) : null,
//         }));
//       default:
//         return [];
//     }
//   };

//   const nivoConfig = {
//     keys:
//       activeTab === 'price'
//         ? ['시가총액']
//         : activeTab === 'balance sheet'
//           ? ['자본총계', '부채총계']
//           : activeTab === 'profitability'
//             ? ['영업이익률', '매출증가율', 'ROE']
//             : ['PBR', 'PER'],
//     colors: { scheme: 'nivo' },
//     defs: [
//       { id: 'dots', type: 'patternDots', background: 'inherit', color: '#38bcb2', size: 4, padding: 1, stagger: true },
//       {
//         id: 'lines',
//         type: 'patternLines',
//         background: 'inherit',
//         color: '#eed312',
//         rotation: -45,
//         lineWidth: 6,
//         spacing: 10,
//       },
//     ],
//     fill: [
//       { match: { id: 'fries' }, id: 'dots' },
//       { match: { id: 'sandwich' }, id: 'lines' },
//     ],
//     axisBottom: {
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: activeTab === 'price' ? 'Market Capitalization' : activeTab === 'valuation' ? 'Metrics' : '',
//       legendPosition: 'middle',
//       legendOffset: 32,
//     },
//     axisLeft: {
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: activeTab === 'profitability' ? 'Percentages' : '',
//       legendPosition: 'middle',
//       legendOffset: -40,
//     },
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center border-b pb-2">
//         <span className="text-sm text-muted-foreground ml-auto">기준: 2023.12</span>
//       </div>

//       <Nav fill variant="tabs" defaultActiveKey="price" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
//         <Nav.Item>
//           <Nav.Link eventKey="price">Price</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="balance sheet">Balance Sheet</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="profitability">Profitability</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="valuation">Valuation</Nav.Link>
//         </Nav.Item>
//       </Nav>

//       <div className="h-[400px] w-full">
//         <ResponsiveBar
//           data={getChartData()}
//           {...nivoConfig}
//           indexBy="companyName"
//           margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//           padding={0.3}
//           groupMode="grouped"
//           labelSkipWidth={12}
//           labelSkipHeight={12}
//           role="application"
//           ariaLabel="Bar chart comparing company metrics"
//         />
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { ResponsiveBar } from '@nivo/bar';
import { CompanyContext } from '../../../../contexts/CompanyContext';

export default function CompanyInfoPage3() {
  const [activeTab, setActiveTab] = useState('price');
  const [price, setPrice] = useState([]);
  const [balance, setBalance] = useState([]);
  const [profitability, setProfitability] = useState([]);
  const [valuation, setValuation] = useState([]);
  const { userInputCompany } = useContext(CompanyContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/competitorInfo/${userInputCompany}/price`)
      .then((response) => response.json())
      .then((data) => setPrice(data))
      .catch((error) => console.error('Error fetching data: ', error));

    fetch(`http://localhost:8080/api/competitorInfo/${userInputCompany}/balanceSheet`)
      .then((response) => response.json())
      .then((data) => setBalance(data))
      .catch((error) => console.error('Error fetching data: ', error));

    fetch(`http://localhost:8080/api/competitorInfo/${userInputCompany}/profitability`)
      .then((response) => response.json())
      .then((data) => setProfitability(data))
      .catch((error) => console.error('Error fetching data: ', error));

    fetch(`http://localhost:8080/api/competitorInfo/${userInputCompany}/valuation`)
      .then((response) => response.json())
      .then((data) => setValuation(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const getChartData = () => {
    switch (activeTab) {
      case 'price':
        return price.map((item) => ({
          companyName: item.companyName.toUpperCase(),
          시가총액: Number(item.marketCapital.replace(/,/g, '')),
        }));
      case 'balance sheet':
        return balance.map((item) => ({
          companyName: item.companyName.toUpperCase(),
          자본총계: parseFloat(item.totalEquity),
          부채총계: parseFloat(item.totalLiabilities),
        }));
      case 'profitability':
        return profitability.map((item) => ({
          companyName: item.companyName.toUpperCase(),
          영업이익률: parseFloat(item.operatingMargin),
          매출증가율: parseFloat(item.revenueGrowthRate),
          ROE: parseFloat(item.roe),
        }));
      case 'valuation':
        return valuation.map((item) => ({
          companyName: item.companyName.toUpperCase(),
          PBR: parseFloat(item.pbr),
          PER: item.per !== 'null' ? parseFloat(item.per) : null,
        }));
      default:
        return [];
    }
  };

  const groupMode = activeTab === 'balance sheet' ? 'stacked' : 'grouped';

  return (
    <>
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-sm text-muted-foreground ml-auto">기준: 2023.12</span>
      </div>

      <Nav fill variant="tabs" defaultActiveKey="price" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="price">시가총액</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="balance sheet">자산총계</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profitability">수익성</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="valuation">가치 평가</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="h-[400px] w-full">
        <ResponsiveBar
          data={getChartData()}
          keys={
            activeTab === 'price'
              ? ['시가총액']
              : activeTab === 'balance sheet'
                ? ['자본총계', '부채총계']
                : activeTab === 'profitability'
                  ? ['영업이익률', '매출증가율', 'ROE']
                  : ['PBR', 'PER']
          }
          indexBy="companyName"
          margin={{ top: 50, right: 50, bottom: 80, left: 50 }} // bottom margin을 legend 높이에 맞게 조정
          padding={0.5}
          groupMode={groupMode} // 그룹 모드를 동적으로 설정
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-left', // 좌측 하단에 레전드 고정
              direction: 'row', // 가로 방향으로 아이템 배치
              justify: false, // 중앙 정렬을 하지 않음
              translateX: 0, // 왼쪽 끝에 위치
              translateY: 50, // Y축 위치 조정
              itemsSpacing: 10, // 아이템 간격
              itemWidth: 80,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              symbolShape: 'circle', // 네모를 동그라미로 변경
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Bar chart comparing company metrics"
        />
      </div>
    </>
  );
}
