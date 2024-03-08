export const AreaInputField: React.FC<{ area: string; setArea: Function }> = ({
  area,
  setArea,
}) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="my-3"
        placeholder="m&sup2;"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        id="area"
      />
    </div>
  );
};
