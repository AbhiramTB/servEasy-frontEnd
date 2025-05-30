const BookingCardSkeleton = () => {
  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-xl card card-side bg-base-200  border-primary">
      <figure className="w-1/4 min-w-32">
        <div className="w-full h-full bg-base-300 animate-pulse"></div>
      </figure>

      <div className="p-4 card-body">
        <div className="flex items-start justify-between">
          <div className="w-32 h-5 rounded bg-base-300 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="w-16 h-4 rounded-full bg-base-300 animate-pulse"></div>
            <div className="w-16 h-4 rounded-full bg-base-300 animate-pulse"></div>
          </div>
        </div>

        <div className="my-1 divider"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-base-300 animate-pulse" />
            <div className="w-24 h-4 rounded bg-base-300 animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-base-300 animate-pulse" />
            <div className="w-24 h-4 rounded bg-base-300 animate-pulse" />
          </div>

          <div className="flex items-center col-span-2 gap-2">
            <div className="w-4 h-4 rounded-full bg-base-300 animate-pulse" />
            <div className="w-full h-4 rounded bg-base-300 animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-base-300 animate-pulse" />
            <div className="w-24 h-4 rounded bg-base-300 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default BookingCardSkeleton