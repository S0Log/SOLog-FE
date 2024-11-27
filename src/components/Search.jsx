import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyContext } from '../contexts/companyContext';
import magnifier from '/img/magnifier.png?url';
import * as hangul from 'hangul-js';

const top50Companies = [
  '삼성전자',
  'SK하이닉스',
  'LG에너지솔루션',
  '삼성바이오로직스',
  '현대차',
  '삼성전자우',
  '기아',
  '셀트리온',
  'KB금융',
  'NAVER',
  '신한지주',
  '현대모비스',
  'POSCO홀딩스',
  '삼성물산',
  '삼성생명',
  '고려아연',
  'LG화학',
  'HD현대중공업',
  '메리츠금융지주',
  '삼성SDI',
  '한화에어로스페이스',
  '삼성화재',
  '하나금융지주',
  'HMM',
  '카카오',
  '한국전력',
  'KT&G',
  'LG전자',
  '크래프톤',
  '두산에너빌리티',
  'HD한국조선해양',
  '포스코퓨처엠',
  'HD현대일렉트릭',
  '우리금융지주',
  'SK텔레콤',
  '한화오션',
  'LG',
  '삼성에스디에스',
  '기업은행',
  'SK스퀘어',
  'KT',
  '삼성중공업',
  'SK',
  '카카오뱅크',
  'SK이노베이션',
  '유한양행',
  '대한항공',
  '현대글로비스',
  'KODEX CD금리액티브',
  '하이브',
];

const Search = () => {
  const { setUserInputCompany } = useContext(CompanyContext);
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    const input = e.target.value;
    setUserInput(input);

    if (input.trim() === '') {
      setResults([]);
      return;
    }

    const searcher = new hangul.Searcher(input);
    const filtered = top50Companies.filter((item) => {
      const groupedDisassembled = hangul.disassemble(item, true).map((char) => char[0]);
      const jaum = groupedDisassembled.join('');

      /**
       * 기업명에 포함되거나 기업명의 초성에 포함되면 해당 기업명을 결과에 포함
       * searcher.search(item) - 입력값이 포함된 위치(첫 인덱스)를 반환, ex. -1,0,2...
       * jaum.includes(input) - 초성 문자열에 입력값이 포함되어 있는 지 여부를 반환 ex. true, false */
      return searcher.search(item) >= 0 || jaum.toLowerCase().includes(input.toLowerCase());
    });

    setResults(filtered);
  };

  const handleSearch = () => {
    if (top50Companies.includes(userInput)) {
      setUserInputCompany(userInput);
      navigate('/main/analyzeChart');
    } else if (userInput !== '' && !top50Companies.includes(userInput)) {
      alert('해당 기업에 대한 정보를 제공하지 않습니다. 다른 기업으로 검색해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[35vw] px-[51.356px] bg-white rounded-3xl py-3 pl-5 shadow-md">
        <input
          type="text"
          placeholder="종목을 입력해주세요."
          className="w-full  placeholder-gray-400 focus:outline-none"
          onChange={handleChange}
          value={userInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 top-0 h-full rounded-r-3xl px-3 bg-white  flex items-center justify-center"
        >
          <img src={magnifier} alt="검색 아이콘" className="h-[65%]" />
        </button>

        {results.length > 0 && (
          <ul
            className="absolute left-0 w-full bg-white border-gray-300 rounded-3xl max-h-80 overflow-y-auto mt-2 z-10 scrollbar-hide pl-0"
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            {results.map((company, index) => (
              <li
                key={index}
                className="pl-5 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setUserInput(company);
                  setResults([]);
                }}
              >
                {company}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
