/**
 * ErrorMessage component displays an error message if one is passed in props.
 * It is used to display any error messages from the app in a consistent style.
 */
import { ErrorMessageProps } from "@/interfaces/interfaces";
import { GoAlertFill } from "react-icons/go";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="text-red-500 flex flex-row justify-center">
          <GoAlertFill size={28} className="mr-2" />
          <span className="text-xs lg:text-base lg:mt-1">{error}</span>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
