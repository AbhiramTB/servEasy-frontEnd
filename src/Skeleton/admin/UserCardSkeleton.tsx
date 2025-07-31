export const UserCardSkeleton = () => (
  <div className="m-6 overflow-hidden border rounded-lg shadow-md bg-base-200 border-base-300 animate-pulse">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-base-300" />
        <div className="w-full ml-4 space-y-2">
          <div className="w-32 h-4 rounded bg-base-300" />
          <div className="w-20 h-3 rounded bg-base-300" />
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="w-40 h-3 rounded bg-base-300" />
        <div className="h-3 rounded w-28 bg-base-300" />
      </div>
    </div>
    <div className="flex border-t border-base-300">
      <div className="flex-1 h-5 py-3 bg-base-300" />
      <div className="flex-1 h-5 py-3 bg-base-300" />
    </div>

    
  </div>



);
