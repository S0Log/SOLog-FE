import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyContext } from '../App';
import magnifier from '/img/magnifier.png?url';

const Search = () => {
  const { userInput, setUserInput } = useContext(CompanyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = () => {
    if (userInput.trim) {
      navigate('/main/analyzeChart');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="종목을 입력해주세요."
        className="w-[55%] py-3 pl-5 rounded-l-3xl placeholder-gray-400 focus:outline-none"
        value={userInput}
        onChange={handleChange}
        style={{
          boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
        }}
      />
      <button
        onClick={handleSearch}
        className="h-12 p-2 bg-white rounded-r-3xl -ml-[1px] flex items-center justify-center"
        style={{
          boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img src={magnifier} alt="검색 아이콘" className="h-full" />
      </button>
    </div>
  );
};

export default Search;
