import magnifier from "../../public/img/magnifier.png";

const Search = () => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="종목을 입력해주세요."
        className="w-[55%] py-3 pl-5 rounded-l-3xl placeholder-gray-400 focus:outline-none"
        style={{
          boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
        }}
      />
      <button
        className="h-12 p-2 bg-white rounded-r-3xl -ml-[1px] flex items-center justify-center"
        style={{
          boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img src={magnifier} alt="검색 아이콘" className="h-full" />
      </button>
    </div>
  );
};

export default Search;
