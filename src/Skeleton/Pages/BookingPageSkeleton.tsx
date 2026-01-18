const BookingPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-100 border rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-8 w-16"></div>
          </div>

          <div className="skeleton h-44 w-full rounded-xl"></div>
          <div className="skeleton h-44 w-full rounded-xl"></div>

          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="skeleton w-20 h-20 rounded-full"></div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-3 w-40"></div>
              <div className="skeleton h-3 w-36"></div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="skeleton w-24 h-24 rounded-lg"></div>
            <div className="space-y-2 flex-1">
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-3 w-full"></div>
              <div className="skeleton h-3 w-3/4"></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>

          <div className="flex gap-3">
            <div className="skeleton h-14 w-24"></div>
            <div className="skeleton h-14 w-24"></div>
            <div className="skeleton h-14 w-24"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="skeleton h-6 w-40"></div>

          <div className="space-y-2">
            <div className="skeleton h-3 w-full"></div>
            <div className="skeleton h-3 w-3/4"></div>
            <div className="skeleton h-3 w-2/3"></div>
            <div className="skeleton h-3 w-full"></div>
          </div>

          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingPageSkeleton;
