/**
 * ErrorMessage component displays an error message if one is passed in props.
 * It is used to display any error messages from the app in a consistent style.
 */
import { ErrorMessageProps } from "@/interfaces/interfaces";
import { TbAlertTriangle } from "react-icons/tb";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="text-red-500 flex flex-row justify-center mb-4 -mt-3">
          <TbAlertTriangle size={19} className="mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
