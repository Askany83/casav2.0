/**
 * ErrorMessage component displays an error message if one is passed in props.
 * It is used to display any error messages from the app in a consistent style.
 */
import { ErrorMessageProps } from "@/interfaces/interfaces";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="flex justify-center">
          <span className="text-red-600 inline-block w-fit text-sm py-1 mx-auto">
            {error}
          </span>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
