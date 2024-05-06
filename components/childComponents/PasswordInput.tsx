/**
 * PasswordInput component.
 * Renders an input element of type "password" with placeholder text.
 * Accepts value and onChange props to handle state.
 */
import { InputProps } from "@/interfaces/interfaces";
import InputErrorMessage from "@/components/childComponents/InputErrorMessage";
import { TbAlertTriangle } from "react-icons/tb";

export const PasswordInput: React.FC<InputProps> = ({
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
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          type="password"
          placeholder="Password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="passwordInput"
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

export default PasswordInput;
