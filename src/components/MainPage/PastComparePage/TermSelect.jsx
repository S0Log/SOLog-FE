import Form from 'react-bootstrap/Form';

const TermSelect = ({ userSelectTerm, setUserSelectTerm }) => {
  return (
    <div className="relative w-full h-full max-w-xs">
      <Form.Select
        value={userSelectTerm}
        onChange={(e) => setUserSelectTerm(e.target.value)}
        className="w-full h-full shadow-sm !rounded-xl bg-white border border-gray-300"
      >
        <option value="one">1주</option>
        <option value="two">2주</option>
        <option value="else">한달</option>
      </Form.Select>
    </div>
  );
};

export default TermSelect;
