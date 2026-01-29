const SkeletonHomeCard = () => {
  return (
    <div className="w-full max-w-sm min-h-[600px] bg-base-100 rounded-xl shadow-xl overflow-hidden flex flex-col border border-base-200 animate-pulse">
      {/* Header Section */}
      <div className="p-6 flex items-start justify-between h-40">
        <div className="flex-1 min-w-0">
          <div className="h-8 bg-base-300 rounded-md w-3/4 mb-3"></div>

          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-16 bg-base-300 rounded-lg"></div>
          </div>

          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-base-300"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-base-300 rounded"></div>
              <div className="h-4 w-16 bg-base-300 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0 ml-2">
          <div className="h-3 w-16 bg-base-300 rounded mb-2 ml-auto"></div>
          <div className="h-6 w-20 bg-base-300 rounded"></div>
        </div>
      </div>

      <div className="relative h-64 w-full bg-base-300"></div>

      <div className="p-4 flex-grow space-y-2">
        <div className="h-3 bg-base-300 rounded w-full"></div>
        <div className="h-3 bg-base-300 rounded w-5/6"></div>
        <div className="h-3 bg-base-300 rounded w-4/6"></div>
      </div>

      <div className="p-5 flex flex-col gap-3 bg-base-200/50 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-1/2">
            <div className="w-4 h-4 rounded-full bg-base-300"></div>
            <div className="h-4 bg-base-300 rounded w-full"></div>
          </div>
          <div className="h-6 w-20 bg-base-300 rounded-lg"></div>
        </div>

        <div className="h-3 w-24 bg-base-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonHomeCard;
