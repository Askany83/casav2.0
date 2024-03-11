/**
 * PasswordInput component.
 * Renders an input element of type "password" with placeholder text.
 * Accepts value and onChange props to handle state.
 */
import { InputProps } from "@/interfaces/interfaces";

export const PasswordInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="password"
      placeholder="Password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      id="passwordInput"
      className="w-[400px] border border-gray-200 py-2 px-6 sm:w-[224px] md:w-[350px]"
    />
  );
};

export default PasswordInput;
