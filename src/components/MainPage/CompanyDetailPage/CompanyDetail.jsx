import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CompanyContext } from '../../../contexts/CompanyContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Tooltip CSS 파일 포함

const CompanyDetail = ({ year, quarter }) => {
  const location = useLocation();
  const [tableData, setTableData] = useState([]);
  const [glossary, setGlossary] = useState({});
  const { userInputCompany } = useContext(CompanyContext);

  const terms = [
    '시장 종류',
    '상장일',
    '자본금',
    '매출액',
    '매출액증가율',
    '영업이익',
    '당기순이익',
    '부채총계',
    '분기 최고가',
    '분기 최저가',
    'PER',
    'ROE',
    'PBR',
    'EPS',
    'BPS',
    'ROA',
  ];

  async function fetchGlossaryTerms() {
    const glossaryData = {};
    try {
      await Promise.all(
        terms.map(async (term) => {
          const response = await axios.get(`/api/glossary/${term}`);
          glossaryData[term] = response.data.definition;
        }),
      );
      setGlossary(glossaryData);
    } catch (error) {
      console.error('Error fetching glossary terms:', error);
    }
  }

  async function fetchCompanyInfo() {
    const getQuarterStartDate = () => {
      let startDate;

      switch (quarter) {
        case 1:
          startDate = new Date(year, 3, 1); // 1분기 (4월 1일)
          break;
        case 2:
          startDate = new Date(year, 6, 1); // 2분기 (7월 1일)
          break;
        case 3:
          startDate = new Date(year, 9, 1); // 3분기 (10월 1일)
          break;
        case 4:
          startDate = new Date(year + 1, 0, 1); // 4분기 (다음 해 1월 1일)
          break;
      }

      return startDate;
    };

    const url = '/api/companyInfo/detail';
    const params = {
      companyName: userInputCompany,
      date: getQuarterStartDate(),
    };

    try {
      const res = await axios.get(url, { params });
      const data = res.data;

      const updatedTableData = [
        [
          { label: '시장 종류', value: data.marketType ?? '-', tooltip: glossary['시장 종류'] ?? '' },
          { label: '상장일', value: data.listedDate?.split('T')[0] ?? '-', tooltip: glossary['상장일'] ?? '' },
          {
            label: '자본금',
            value: data.capitalAmount
              ? `${Math.floor(data.capitalAmount / 1_000_000).toLocaleString()} (백만 원)`
              : '-',
            tooltip: glossary['자본금'] ?? '',
          },
          {
            label: '매출액',
            value: data.revenue ? `${Math.floor(data.revenue).toLocaleString()} (백만 원)` : '-',
            tooltip: glossary['매출액'] ?? '',
          },
        ],
        [
          {
            label: '매출액증가율',
            value: data.revenueGrowthRate ? `${Math.floor(data.revenueGrowthRate)} (%)` : '-',
            tooltip: glossary['매출액증가율'] ?? '',
          },
          {
            label: '영업이익',
            value: data.operIncome ? `${Math.floor(data.operIncome).toLocaleString()} (백만 원)` : '-',
            tooltip: glossary['영업이익'] ?? '',
          },
          {
            label: '당기순이익',
            value: data.netIncome ? `${Math.floor(data.netIncome).toLocaleString()} (백만 원)` : '-',
            tooltip: glossary['당기순이익'] ?? '',
          },
          {
            label: '부채총계',
            value: data.totalLiabilities ? `${Math.floor(data.totalLiabilities).toLocaleString()} (백만 원)` : '-',
            tooltip: glossary['부채총계'] ?? '',
          },
        ],
        [
          {
            label: '분기 최고가',
            value: data.quarterlyHigh ? `${Math.floor(data.quarterlyHigh).toLocaleString()} (원)` : '-',
            tooltip: glossary['분기 최고가'] ?? '',
          },
          {
            label: '분기 최저가',
            value: data.quarterlyLow ? `${Math.floor(data.quarterlyLow).toLocaleString()} (원)` : '-',
            tooltip: glossary['분기 최저가'] ?? '',
          },
          {
            label: 'PER',
            value: data.per ? `${Math.floor(data.per)} (배)` : '-',
            tooltip: glossary['PER'] ?? '',
          },
          {
            label: 'ROE',
            value: data.roe ? `${Math.floor(data.roe)} (%)` : '-',
            tooltip: glossary['ROE'] ?? '',
          },
        ],
        [
          {
            label: 'PBR',
            value: data.pbr ? `${Math.floor(data.pbr)} (배)` : '-',
            tooltip: glossary['PBR'] ?? '',
          },
          {
            label: 'EPS',
            value: data.eps ? `${Math.floor(data.eps).toLocaleString()} (원)` : '-',
            tooltip: glossary['EPS'] ?? '',
          },
          {
            label: 'BPS',
            value: data.bps ? `${Math.floor(data.bps).toLocaleString()} (원)` : '-',
            tooltip: glossary['BPS'] ?? '',
          },
          {
            label: 'ROA',
            value: data.roa ? `${Math.floor(data.roa)} (%)` : '-',
            tooltip: glossary['ROA'] ?? '',
          },
        ],
      ];
      setTableData(updatedTableData);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchGlossaryTerms();
    }
    if (location.pathname === '/main/companyDetail') {
      loadData();
    }
  }, [location]);

  useEffect(() => {
    if (year !== 0) {
      fetchCompanyInfo();
    }
  }, [year, quarter, glossary]);

  return (
    <div className="w-full h-full">
      <table className="w-full h-full shadow-md bg-white border border-gray-300 rounded-3xl overflow-hidden">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <React.Fragment key={`${rowIndex}-${colIndex}`}>
                  <td className="border-none !text-gray-700 font-bold p-3 text-[0.9em]">
                    <a data-tooltip-id={`tooltip-${rowIndex}-${colIndex}`} data-tooltip-html={col.tooltip}>
                      <span>{col.label}</span>
                    </a>
                    <Tooltip id={`tooltip-${rowIndex}-${colIndex}`} className="tooltip" arrow={false} />
                  </td>
                  <td className="border-none p-3 !text-gray-800 font-medium text-[0.8em]">{col.value}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDetail;
