const TermSelect = ({ userSelectTerm, setUserSelectTerm }) => {
  return (
    <div className="relative w-full max-w-xs">
      <select
        onChange={(e) => {
          setUserSelectTerm(e.target.value);
        }}
        className="block w-full pl-3 pr-5 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={userSelectTerm}
      >
        <option value="one">1주</option>
        <option value="two">2주</option>
        <option value="else">한달</option>
      </select>
    </div>
  );
};

export default TermSelect;
