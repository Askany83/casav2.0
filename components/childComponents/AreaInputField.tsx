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
        className="my-3 border border-gray-200 py-2 px-6 sm:w-[224px] md:w-[320px]"
        placeholder="m&sup2;"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        id="area"
      />
    </div>
  );
};

export default AreaInputField;
