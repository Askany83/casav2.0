export const HouseTypeRadioGroup: React.FC<{
  setTypeOfHouse: Function;
  typeOfHouse: string;
  selectedOption: string;
  handleOptionChange: React.ChangeEventHandler<HTMLSelectElement>;
}> = ({ setTypeOfHouse, typeOfHouse, selectedOption, handleOptionChange }) => {
  return (
    <div>
      <div className="flex items-center my-1">
        <input
          type="radio"
          name="houseType"
          value="apartamento"
          onChange={() => setTypeOfHouse("apartamento")}
          className="form-radio h-4 w-4 text-black "
          id="apartamento"
          defaultChecked={typeOfHouse === "apartamento"}
        />
        <label htmlFor="apartamento" className="flex items-center ml-2">
          Apartamento
        </label>
      </div>
      <div className="flex items-center my-1">
        <input
          type="radio"
          name="houseType"
          value="moradia"
          onChange={() => setTypeOfHouse("moradia")}
          className="form-radio h-4 w-4 text-black "
          id="moradia"
        />
        <label htmlFor="moradia" className="flex items-center ml-2">
          Moradia
        </label>
      </div>
      {typeOfHouse && (
        <div className="mt-2 h-30 w-210">
          <select
            className="px-3 py-2 border"
            value={selectedOption}
            onChange={handleOptionChange}
            id="selectedOption"
          >
            {typeOfHouse === "apartamento" ? (
              <>
                <option value="t1" id="t1">
                  T1
                </option>
                <option value="t2" id="t2">
                  T2
                </option>
              </>
            ) : (
              <>
                <option value="m1" id="m1">
                  M1
                </option>
                <option value="m2" id="m2">
                  M2
                </option>
              </>
            )}
          </select>
        </div>
      )}
    </div>
  );
};
