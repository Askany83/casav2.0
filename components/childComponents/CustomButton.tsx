/**
 * A custom React button component that renders a button with provided props.
 *
 * @param onClick - Click handler function for the button.
 * @param disabled - Whether the button should be disabled. Default false.
 * @param loading - Whether to show a loading indicator. Default false.
 * @param text - The text to display in the button.
 */

import { ButtonProps } from "@/interfaces/interfaces";

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  text,
}) => {
  return (
    <button
      type="button"
      className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white w-32"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "A processar..." : text}
    </button>
  );
};

export default CustomButton;
