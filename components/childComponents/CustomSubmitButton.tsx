/**
 * Renders a submit button with custom styling and behavior.
 *
 * @param onClick - Click handler function.
 * @param disabled - Whether button is disabled.
 * @param loading - Whether button shows loading state.
 * @param text - Button text.
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
      type="submit"
      className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "A processar..." : text}
    </button>
  );
};

export default CustomButton;
