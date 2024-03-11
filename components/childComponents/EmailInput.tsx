/**
 * EmailInput component.
 * Renders an input field for entering an email address.
 * Accepts value and onChange props to control state.
 */
import { InputProps } from "@/interfaces/interfaces";

export const EmailInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      id="emailInput"
      className="w-[400px] border border-gray-200 py-2 px-6 sm:w-[224px] md:w-[350px]"
    />
  );
};

export default EmailInput;
