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
      className="btn btn-primary mt-3"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "A processar..." : text}
    </button>
  );
};

export default CustomButton;
