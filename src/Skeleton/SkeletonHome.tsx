
const SkeletonHome = () => {
    return (
        <div className="w-[282px] m-5  h-[400px] bg-base-300 rounded-lg overflow-hidden relative p-4">
          <div className="relative space-y-4">
            <div className="w-[250px] h-44 bg-primary bg-opacity-30  rounded-md animate-pulse"></div>
            <div className="h-6 w-1/2 bg-primary  bg-opacity-30 rounded animate-pulse"></div>
            <div className="h-6 w-full bg-primary bg-opacity-30 rounded animate-pulse"></div>
            <div className="h-6 w-full bg-primary bg-opacity-30 rounded animate-pulse"></div>
    
          </div>
        </div>
      );
};

export default SkeletonHome;
