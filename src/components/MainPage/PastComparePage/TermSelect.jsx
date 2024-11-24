const TermSelect = () => {
  return (
    <div className="input-group pl-4 pr-4 pt-1 pb-1 rounded-lg shadow-md">
      <select className="custom-select" id="inputGroupSelect04">
        <option selected>선택</option>
        <option value="1">1주</option>
        <option value="2">2주</option>
        <option value="3">한달</option>
      </select>
    </div>
  );
};

export default TermSelect;
