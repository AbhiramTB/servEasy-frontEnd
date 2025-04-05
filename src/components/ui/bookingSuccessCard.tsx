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
    <div className="flex justify-center items-center ">

      <div className="w-full max-w-md p-6 shadow-lg bg-base-200 rounded-2xl  text-center">
        <CheckCircle size={60} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-primary mb-2">
          {successTitle}
        </h2>
        <p className="text-base-content mb-4">{successSubTitle}</p>
        {buttonText && (
         <div>
          <Link to={'/booked-services/'}>
           <button
            // onClick={ButtonFn}
            className="bg-primary hover:bg-primary-focus text-white py-2 px-4 rounded-md w-full"
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
