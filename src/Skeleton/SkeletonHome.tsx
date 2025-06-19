
const SkeletonHomeCard = () => {
    return (
    <div className="card bg-base-200 w-80 h-[500px] shadow-md border border-base-300 rounded-xl overflow-hidden">
      
      {/* Image Shimmer */}
      <figure className="relative h-40 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-base-300 via-base-100 to-base-300 animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute top-2 left-2">
          <div className="w-16 h-5 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded-full animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>
      </figure>

      {/* Card Body Shimmer */}
      <div className="p-4 space-y-3 card-body">
        {/* Title */}
        <div className="flex items-start justify-between">
          <div className="w-40 h-5 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Category Badge */}
        <div className="w-20 h-4 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded-full animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>

        {/* Location */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite] mr-1"></div>
          <div className="w-32 h-3 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Price */}
        <div className="text-center">
          <div className="w-24 h-6 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded mx-auto animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          <div className="w-16 h-3 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded mx-auto mt-1 animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Date */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite] mr-1"></div>
          <div className="w-20 h-3 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Provider Info */}
        <div className="flex items-center mt-2">
          <div className="avatar">
            <div className="w-8 h-8 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded-full animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="ml-2 space-y-1">
            <div className="w-24 h-3 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            <div className="w-20 h-2 bg-gradient-to-r from-base-300 via-base-100 to-base-300 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonHomeCard;
