interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="flex justify-center">
          <span className="text-red-600 inline-block w-fit text-sm pt-1 pb-8 px-3 mt-2 mx-auto">
            {error}
          </span>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
