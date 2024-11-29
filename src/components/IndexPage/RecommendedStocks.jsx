import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyContext } from '../../contexts/CompanyContext';

const RecommendedStocks = () => {
  const { userInputCompany, setUserInputCompany } = useContext(CompanyContext);
  const navigate = useNavigate();
  const getStocks = () => ['삼성전자', 'SK하이닉스', 'LG에너지솔루션', '신한지주'];
  const stocks = getStocks();

  const handleSearch = (stock) => {
    setUserInputCompany(stock);
    if (userInputCompany.trim) {
      navigate(`/main/companyInfo`);
    }
  };
  return (
    <div className="flex justify-center pt-7">
      <ul className="flex space-x-4 pl-0">
        {[{ label: '추천종목', isHeader: true }, ...stocks.map((stock) => ({ label: stock }))].map(
          ({ label, isHeader }, index) => (
            <li
              key={index}
              className={`flex items-center justify-center ${
                isHeader
                  ? 'font-extrabold text-lg'
                  : 'font-base p-3 h-10 bg-white rounded-3xl text-sm shadow-md text-gray-800 hover:scale-105 transition-transform'
              }`}
            >
              {isHeader ? (
                label
              ) : (
                <a
                  href=""
                  onClick={() => handleSearch(label)}
                  className="block w-full text-center text-gray-800 no-underline"
                >
                  {label}
                </a>
              )}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default RecommendedStocks;
