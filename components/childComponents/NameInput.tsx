/**
 * NameInput component.
 * Renders an input field for capturing a name.
 */
import { InputProps } from "@/interfaces/interfaces";

export const NameInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <label className="input input-bordered input-primary rounded-box flex items-center gap-2 input-sm md:input-md">
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
    </label>
  );
};

export default NameInput;
