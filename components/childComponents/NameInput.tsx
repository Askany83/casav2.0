/**
 * NameInput component.
 * Renders an input field for capturing a name.
 */
import { InputProps } from "@/interfaces/interfaces";
import InputErrorMessage from "@/components/childComponents/InputErrorMessage";
import { TbAlertTriangle } from "react-icons/tb";

export const NameInput: React.FC<InputProps> = ({
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>

        <input
          type="text"
          placeholder="Nome"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="nameInput"
          className="grow"
        />
        {errorMessage && <TbAlertTriangle size={20} className="text-red-500" />}
      </label>
      {errorMessage && (
        <div className="mt-1">
          <InputErrorMessage error={errorMessage} />
        </div>
      )}
    </>
  );
};

export default NameInput;
