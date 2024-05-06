/**
 * ErrorMessage component displays an error message if one is passed in props.
 * It is used to display any error messages from the app in a consistent style.
 */
import { ErrorMessageProps } from "@/interfaces/interfaces";

const InputErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="text-red-500 flex flex-row justify-start items-center">
          <span className="text-xs">{error}</span>
        </div>
      )}
    </>
  );
};

export default InputErrorMessage;
