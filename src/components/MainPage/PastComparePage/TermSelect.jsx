const TermSelect = () => {
  return (
    <div className="relative w-full max-w-xs">
      <select
        defaultValue=""
        className="block w-full pl-3 pr-5 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="" disabled>
          선택
        </option>
        <option value="1">1주</option>
        <option value="2">2주</option>
        <option value="3">한달</option>
      </select>
    </div>
  );
};

export default TermSelect;
