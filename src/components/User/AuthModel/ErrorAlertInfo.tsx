interface ErrorAlertProps {
  isError: boolean | string;
}

const ErrorAlertInfo = ({ isError }: ErrorAlertProps) => {
  if (!isError) return null;

  return (
    <div className="mt-4 text-sm shadow-md alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 stroke-current shrink-0"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{typeof isError === "string" ? isError : "Something went wrong!"}</span>
    </div>
  );
};

export default ErrorAlertInfo;
