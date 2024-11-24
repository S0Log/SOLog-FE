import React from 'react';

const CompanyDetail = () => {
  const tableData = [
    [
      { label: '시가총액', value: '581,000' },
      { label: '표준업종분류코드', value: '1' },
      { label: '자본금', value: '641,000' },
      { label: '상장일', value: '594,000' },
    ],
    [
      { label: '매출액', value: '212,699' },
      { label: '영업이익', value: '103,100' },
      { label: '당기순이익', value: '4조 5,424억' },
      { label: '주당 배당금', value: '13.13%' },
    ],
    [
      { label: '분기 최고가', value: '31,068원' },
      { label: '분기 최저가', value: '26.65배' },
      { label: 'PER', value: '22,627원' },
      { label: 'ROE', value: '19.41배' },
    ],
    [
      { label: 'PBR', value: '2,100원' },
      { label: 'EPS', value: '7.21배' },
      { label: 'BPS', value: '83,636원' },
      { label: 'ROA', value: '2,100원' },
    ],
  ];

  return (
    <div className="mt-0 ml-14 mr-14 mb-2">
      <table className="table border border-gray-300 rounded-2xl overflow-hidden">
        <tbody className="border border-gray-600">
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <React.Fragment key={colIndex}>
                  <td className="!text-gray-500 font-extrabold p-3 text-[0.8em]" scope="col">
                    {col.label}
                  </td>
                  <th className="p-3 font-medium" scope="col">
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
