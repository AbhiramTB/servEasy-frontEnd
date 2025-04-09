import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BookingSuccessProps {
  service?: string;
  successTitle: string;
  successSubTitle: string;
  ButtonFn?: () => void;
  buttonText?: string;
}

export default function BookingSuccess({
  successTitle,
  successSubTitle,
  service,
  ButtonFn,
  buttonText,
}: BookingSuccessProps) {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md p-6 text-center shadow-lg bg-base-200 rounded-2xl">
        <CheckCircle size={60} className="mx-auto mb-4 text-primary" />
        <h2 className="mb-2 text-2xl font-semibold text-primary">
          {successTitle}
        </h2>
        <p className="mb-4 text-base-content">{successSubTitle}</p>
        {buttonText && (
          <div>
            <Link to={"/booked-services/"}>
              <button
                // onClick={ButtonFn}
                className="w-full px-4 py-2 text-white rounded-md bg-primary hover:bg-primary-focus"
              >
                {buttonText}{" "}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
