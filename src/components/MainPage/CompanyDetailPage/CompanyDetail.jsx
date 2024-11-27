import React, { useEffect, useState, useContext } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CompanyContext } from '../../../contexts/companyContext';

const CompanyDetail = () => {
  const location = useLocation();
  const [tableData, setTableData] = useState([]); // 테이블 데이터 상태
  const [glossary, setGlossary] = useState({}); // 툴팁 데이터를 저장하는 상태
  const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 읽기
  const company = queryParams.get('company'); // 'label' 키의 값 가져오기
  // 요청할 항목 리스트
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

  // 1. 모든 용어의 툴팁 데이터를 가져오는 함수
  async function fetchGlossaryTerms() {
    const glossaryData = {}; // 각 term에 대한 데이터를 저장
    try {
      // 모든 term을 병렬로 요청
      await Promise.all(
        terms.map(async (term) => {
          const response = await axios.get(`/api/glossary/${term}`);
          glossaryData[term] = response.data.definition;
          // console.log('**', response.data.definition);
        }),
      );
      console.log('jw,', glossaryData);
      setGlossary(glossaryData); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching glossary terms:', error);
    }
  }

  // 2. 회사 데이터를 가져오는 함수
  async function fetchCompanyInfo() {
    const url = '/api/companyInfo/detail';

    const params = {
      companyName: company, // 검색된 회사명
      date: '2024-08-20', // 현재 날짜
    };

    try {
      const res = await axios.get(url, { params });
      const data = res.data;
      console.log(data);

      // glossary와 데이터를 연결하여 테이블 데이터 생성
      const updatedTableData = [
        [
          { label: '시장 종류', value: data.marketType ?? '-', tooltip: glossary['시장 종류'] ?? '' },
          { label: '상장일', value: data.listedDate?.split('T')[0] ?? '-', tooltip: glossary['상장일'] ?? '****' },
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

      setTableData(updatedTableData); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  }

  // 3. 데이터 로드 및 의존성 관리
  useEffect(() => {
    async function loadData() {
      await fetchGlossaryTerms(); // 툴팁 데이터 로드
      console.log('jiwon', glossary);
      // fetchCompanyInfo(); // glossary 로드 후 회사 데이터 로드
    }

    console.log(location.pathname);
    if (location.pathname === '/main/CompanyDetail' && company) {
      console.log('sdfsdfsdfsdf');
      loadData();
    }
  }, [location]); // pathname 변경 시 데이터 로드

  //fetchGlossaryTerms 함수를 실행하고 나서 fetchCompanyInfo를 수행한다
  useEffect(() => {
    // glossary가 변경되면 fetchCompanyInfo를 실행
    if (Object.keys(glossary).length > 0) {
      console.log('Updated glossary:', glossary);
      fetchCompanyInfo();
    }
  }, [glossary]);
  // 4. 테이블 렌더링
  return (
    <div className="mt-0 ml-14 mr-14 mb-2">
      <table className="shadow-md table border border-gray-300 rounded-2xl overflow-hidden">
        <tbody className="border border-gray-600">
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <React.Fragment key={colIndex}>
                  <td className="!text-gray-500 font-bold p-3 text-[0.9em]" scope="col">
                    <OverlayTrigger
                      delay={{ show: 250, hide: 400 }}
                      placement="bottom"
                      overlay={<Tooltip id={`tooltip-${colIndex}`}>{col.tooltip}</Tooltip>}
                    >
                      <span>{col.label}</span>
                    </OverlayTrigger>
                  </td>
                  <th className="p-3 font-medium text-[0.8em]" scope="col">
                    {col.value}
                  </th>
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
