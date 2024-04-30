/**
 * MunicipalityInput component.
 * Renders an input field for capturing a name.
 */
import { InputProps } from "@/interfaces/interfaces";
import { FaHouse } from "react-icons/fa6";
import ErrorMessage from "@/components/childComponents/ErrorMessage";

export const MunicipalityInput: React.FC<InputProps> = ({
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <FaHouse className="w-4 h-4 opacity-70" />

        <input
          type="text"
          placeholder="Entidade"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="municipalityInput"
          className="grow"
        />
      </label>
      {errorMessage && (
        <div className="mt-5">
          <ErrorMessage error={errorMessage} />
        </div>
      )}
    </>
  );
};

export default MunicipalityInput;
