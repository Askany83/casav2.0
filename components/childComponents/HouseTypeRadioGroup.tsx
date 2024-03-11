/**
 * Radio button group to select house type (apartment vs house).
 * Also renders a dropdown to select specific apartment/house size based on selection.
 * Handles change events to update selected type and size.
 */
export const HouseTypeRadioGroup: React.FC<{
  setTypeOfHouse: Function;
  typeOfHouse: string;
  selectedOption: string;
  handleOptionChange: React.ChangeEventHandler<HTMLSelectElement>;
}> = ({ setTypeOfHouse, typeOfHouse, selectedOption, handleOptionChange }) => {
  return (
    <div className="flex flex-row mt-1">
      <div className="flex items-center my-1 mr-5">
        <input
          type="radio"
          name="houseType"
          value="Apartamento"
          onChange={() => setTypeOfHouse("Apartamento")}
          className="form-radio h-4 w-4 text-black"
          id="apartamento"
          defaultChecked={typeOfHouse === "Apartamento"}
        />
        <label htmlFor="apartamento" className="flex items-center ml-2">
          Apartamento
        </label>
      </div>
      <div className="flex items-center my-1 mr-6">
        <input
          type="radio"
          name="houseType"
          value="Moradia"
          onChange={() => setTypeOfHouse("Moradia")}
          className="form-radio h-4 w-4 text-black "
          id="moradia"
        />
        <label htmlFor="moradia" className="flex items-center ml-2">
          Moradia
        </label>
      </div>
      {typeOfHouse && (
        <div className=" h-30 w-210">
          <select
            className="px-3 py-1 border"
            value={selectedOption}
            onChange={handleOptionChange}
            id="selectedOption"
          >
            {typeOfHouse === "Apartamento" ? (
              <>
                <option value="T0" id="t0">
                  T0
                </option>
                <option value="T1" id="t1">
                  T1
                </option>
                <option value="T2" id="t2">
                  T2
                </option>
                <option value="T3" id="t3">
                  T3
                </option>
                <option value="T4" id="t4">
                  T4
                </option>
                <option value="T5" id="t5">
                  T5
                </option>
              </>
            ) : (
              <>
                <option value="V0" id="v0">
                  V0
                </option>
                <option value="V1" id="v1">
                  V1
                </option>
                <option value="V2" id="v2">
                  V2
                </option>
                <option value="V3" id="v3">
                  V3
                </option>
                <option value="V4" id="v4">
                  V4
                </option>
              </>
            )}
          </select>
        </div>
      )}
    </div>
  );
};
