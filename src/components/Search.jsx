import magnifier from "../../public/img/magnifier.png";

const Search = () => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="종목을 입력해주세요."
        className="shadow-lg focus:outline-none w-[55%] py-3 pl-5 rounded-l-3xl placeholder-gray-400"
      />
      <button className="h-12 p-2 bg-white rounded-r-3xl shadow-lg flex items-center justify-center">
        <img src={magnifier} alt="검색 아이콘" className="h-full" />
      </button>
    </div>
  );
};

export default Search;
