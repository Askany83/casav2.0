/**
 * AreaInputField component.
 * Accepts area and setArea props to manage state for an input field.
 * Renders an input field to capture area data (e.g. in square meters).
 */

import InputErrorMessage from "@/components/childComponents/InputErrorMessage";
import { TbAlertTriangle } from "react-icons/tb";
import { useState, useEffect } from "react";
import { validateArea } from "@/utils/validationUtils";

const AreaInputField: React.FC<{
  area: string;
  setArea: Function;
}> = ({ area, setArea }) => {
  const [areaError, setAreaError] = useState("");

  useEffect(() => {
    // Validate email input
    if (area && !validateArea(area)) {
      setAreaError("Área inválida");
    } else {
      setAreaError("");
    }
  }, [area]);

  return (
    <>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md w-full max-w-xs">
        <input
          type="text"
          className="grow"
          placeholder="m&sup2;"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          id="area"
        />
        {areaError && <TbAlertTriangle size={20} className="text-red-500" />}
      </label>
      {areaError && (
        <div className="mt-2">
          <InputErrorMessage error={areaError} />
        </div>
      )}
    </>
  );
};

export default AreaInputField;
