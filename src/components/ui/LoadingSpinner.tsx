const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      {/* Spinner Container */}
      <div className="relative w-32 h-32 mb-6">
        {/* Rotating outer ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-primary border-t-transparent animate-spin"></div>

        {/* Inner animated 'S' */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-extrabold text-primary drop-shadow-md animate-pulse">
            S
          </span>
        </div>
      </div>

      {/* Brand name */}
      <h2 className="text-3xl font-bold tracking-wide text-primary animate-pulse">
        ServEase
      </h2>

      {/* Animated bouncing dots */}
      <div className="flex mt-4 space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
        <span
          className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

      {/* Optional subtext */}
      <p className="mt-6 text-sm text-gray-500 animate-pulse">
        Please wait while we load your experience...
      </p>
    </div>
  );
};

export default LoadingSpinner;
