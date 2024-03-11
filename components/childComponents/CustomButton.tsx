/**
 * CustomButton component.
 *
 * Renders a custom styled button with props for onClick,
 * disabled, loading, and text. Shows loading text
 * when loading prop is true.
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
      className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "A processar..." : text}
    </button>
  );
};

export default CustomButton;
