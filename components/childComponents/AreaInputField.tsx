/**
 * AreaInputField component.
 * Accepts area and setArea props to manage state for an input field.
 * Renders an input field to capture area data (e.g. in square meters).
 */
const AreaInputField: React.FC<{ area: string; setArea: Function }> = ({
  area,
  setArea,
}) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="my-1 input input-bordered w-full max-w-xs"
        placeholder="m&sup2;"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        id="area"
      />
    </div>
  );
};

export default AreaInputField;
