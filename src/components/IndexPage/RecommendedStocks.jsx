const RecommendedStocks = () => {
  const getStocks = () => [
    "삼성전자",
    "SK하이닉스",
    "에너지솔루션",
    "엔비디아",
  ];
  const stocks = getStocks();

  return (
    <div className="flex justify-center pt-7">
      <ul className="flex space-x-4">
        {[
          { label: "추천종목", isHeader: true },
          ...stocks.map((stock) => ({ label: stock })),
        ].map(({ label, isHeader }, index) => (
          <li
            key={index}
            className={`flex items-center justify-center ${
              isHeader
                ? "font-extrabold text-lg"
                : "font-base p-4 h-10 bg-white rounded-3xl text-sm shadow-md text-gray-800 hover:scale-105 transition-transform"
            }`}
          >
            {isHeader ? (
              label
            ) : (
              <a href={`#${label}`} className="block w-full text-center">
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedStocks;