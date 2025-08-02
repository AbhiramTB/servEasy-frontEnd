
const ServiceCardSkeleton = () => {
  return (
   <div className="flex flex-col w-[450px] gap-4 p-4 m-5 bg-base-200">
  <div className="w-full h-44 skeleton"></div>
  <div className="h-4 skeleton w-28"></div>
  <div className="w-full h-4 skeleton"></div>
  <div className="w-full h-4 skeleton"></div>
  <div className="w-full h-4 skeleton"></div>

</div>
  )
}

export default ServiceCardSkeleton
