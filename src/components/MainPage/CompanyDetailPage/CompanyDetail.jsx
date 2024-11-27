import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CompanyDetail = () => {
  const tableData = [
    [
      { label: '시가총액', value: '581,000', tooltip: '기업의 총 가치를 나타내는 지표' },
      { label: '표준업종분류코드', value: '1', tooltip: '업종을 분류하는 코드' },
      { label: '자본금', value: '641,000', tooltip: '기업이 처음에 설립할 때 자본금' },
      { label: '상장일', value: '594,000', tooltip: '기업이 증권 거래소에 상장된 날짜' },
    ],
    [
      { label: '매출액', value: '212,699', tooltip: '기업이 일정 기간 동안 발생한 총 수입' },
      { label: '영업이익', value: '103,100', tooltip: '기업의 핵심 영업 활동으로부터 발생한 이익' },
      { label: '당기순이익', value: '4조 5,424억', tooltip: '세금과 비용을 제외한 순수 이익' },
      { label: '주당 배당금', value: '13.13%', tooltip: '주식 1주당 지급되는 배당금 비율' },
    ],
    [
      { label: '분기 최고가', value: '31,068원', tooltip: '분기 동안의 최고 주가' },
      { label: '분기 최저가', value: '26.65배', tooltip: '분기 동안의 최저 주가' },
      { label: 'PER', value: '22,627원', tooltip: '주가수익비율 (Price to Earnings Ratio)' },
      { label: 'ROE', value: '19.41배', tooltip: '자기자본이익률 (Return on Equity)' },
    ],
    [
      { label: 'PBR', value: '2,100원', tooltip: '주가순자산비율 (Price to Book Ratio)' },
      { label: 'EPS', value: '7.21배', tooltip: '주당순이익 (Earnings Per Share)' },
      { label: 'BPS', value: '83,636원', tooltip: '주당순자산 (Book Value Per Share)' },
      { label: 'ROA', value: '2,100원', tooltip: '자산이익률 (Return on Assets)' },
    ],
  ];

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
                  <th className="p-3 font-medium text-[1em]" scope="col">
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
