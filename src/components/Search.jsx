import { useContext, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CompanyContext } from '../contexts/CompanyContext';
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
  const { userInputCompany, setUserInputCompany } = useContext(CompanyContext);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const listRefs = useRef([]);
  const location = useLocation();

  const handleChange = (e) => {
    const input = e.target.value;
    setUserInputCompany(input);

    if (input.trim() === '') {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const searcher = new hangul.Searcher(input);
    const filtered = top50Companies.filter((item) => {
      const groupedDisassembled = hangul.disassemble(item, true).map((char) => char[0]);
      const jaum = groupedDisassembled.join('');
      return searcher.search(item) >= 0 || jaum.toLowerCase().includes(input.toLowerCase());
    });

    setResults(filtered);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) => {
        const nextIndex = Math.min(prevIndex + 1, results.length - 1);
        scrollToItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) => {
        const nextIndex = Math.max(prevIndex - 1, 0);
        scrollToItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < results.length) {
        setUserInputCompany(results[activeIndex]);
        setResults([]);
      } else {
        handleSearch();
      }
    }
  };

  const scrollToItem = (index) => {
    if (listRefs.current[index]) {
      listRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  const handleSearch = () => {
    if (top50Companies.includes(userInputCompany)) {
      setUserInputCompany(userInputCompany);

      // index 페이지인지 확인
      if (location.pathname === '/' || location.pathname === '') {
        window.location.href = window.location.origin + '/main/companyInfo'; // index 페이지로 이동
      } else {
        window.location.href = window.location.origin + location.pathname; // 페이지 새로고침
      }
    } else {
      alert('해당 기업에 대한 정보를 제공하지 않습니다. 다른 기업으로 검색해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[35vw] px-[51.356px] bg-white rounded-3xl py-3 pl-5 shadow-md">
        <input
          type="text"
          placeholder="종목을 입력해주세요."
          className="w-full placeholder-gray-400 focus:outline-none"
          onChange={handleChange}
          value={userInputCompany}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 top-0 h-full rounded-r-3xl px-3 bg-white flex items-center justify-center"
        >
          <img src={magnifier} alt="검색 아이콘" className="h-[65%]" />
        </button>

        {results.length > 0 && (
          <ul
            className="absolute left-0 w-full bg-white border-gray-300 rounded-3xl max-h-80 overflow-y-auto mt-4 z-10 scrollbar-hide pl-0"
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            {results.map((company, index) => (
              <li
                key={index}
                ref={(el) => (listRefs.current[index] = el)}
                className={`pl-5 py-3 cursor-pointer ${activeIndex === index ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  setUserInputCompany(company);
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
