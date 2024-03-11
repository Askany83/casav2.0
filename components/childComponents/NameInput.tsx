/**
 * NameInput component.
 * Renders an input field for capturing a name.
 */
import { InputProps } from "@/interfaces/interfaces";

export const NameInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Nome"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      id="nameInput"
      className="w-[400px] border border-gray-200 py-2 px-6 sm:w-[224px] md:w-[350px]"
    />
  );
};

export default NameInput;
