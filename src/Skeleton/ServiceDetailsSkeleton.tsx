const ServiceDetailsSkeleton = () => {
  return (
    <div className="min-h-screen pb-10 bg-base-100">
      <div className="container px-4 mx-auto mt-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
          {/* Main Content Area (Left) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden">
              {/* Main Service Image */}
              <div className="skeleton h-[400px] w-full rounded-2xl bg-base-200"></div>

              <div className="mt-6 space-y-4 px-2">
                {/* Location/Away status */}
                <div className="skeleton h-4 w-24 bg-base-200"></div>
                {/* Title: Electrical Maintenance */}
                <div className="skeleton h-10 w-3/4 bg-base-200"></div>
                {/* Description lines */}
                <div className="skeleton h-4 w-full bg-base-200"></div>
                <div className="skeleton h-4 w-2/3 bg-base-200"></div>
                {/* On-site Service Tag */}
                <div className="skeleton h-6 w-32 rounded-lg bg-base-200"></div>
              </div>
              <div className="divider mt-8"></div>
            </div>

            {/* Customer Reviews Section */}
            <div className="">
              <div className="flex  flex-wrap gap-4">
                {/* Individual Review Item */}
                <div className="border border-base-200 rounded-xl p-4 w-full max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-base-200"></div>
                    <div className="flex flex-col gap-2">
                      <div className="skeleton h-4 w-20 bg-base-200"></div>
                      <div className="skeleton h-3 w-32 bg-base-200"></div>
                    </div>
                  </div>
                  <div className="skeleton h-3 w-full bg-base-200"></div>
                </div>
                <div className="border border-base-200 rounded-xl p-4 w-full max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-base-200"></div>
                    <div className="flex flex-col gap-2">
                      <div className="skeleton h-4 w-20 bg-base-200"></div>
                      <div className="skeleton h-3 w-32 bg-base-200"></div>
                    </div>
                  </div>
                  <div className="skeleton h-3 w-full bg-base-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Provider Card (Right) */}
          <div className="md:col-span-1">
            <div className="sticky top-8 border border-base-200 rounded-2xl p-6 shadow-sm bg-base-100">
              <div className="flex items-center gap-4 mb-6">
                {/* Profile Image */}
                <div className="skeleton h-14 w-14 shrink-0 rounded-full bg-base-200"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="skeleton h-4 w-1/2 bg-base-200"></div>
                  <div className="skeleton h-3 w-1/4 bg-base-200"></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="skeleton h-4 w-1/2 bg-base-200"></div>
                <div className="skeleton h-3 w-1/4 bg-base-200"></div>
              </div>

              <div className="space-y-4 mb-8 mt-4">
                <div className="skeleton h-3 w-full bg-base-200"></div>
                <div className="skeleton h-3 w-full bg-base-200"></div>
                <div className="skeleton h-3 w-4/5 bg-base-200"></div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="skeleton h-3 w-full bg-base-200"></div>
                <div className="skeleton h-3 w-full bg-base-200"></div>
                <div className="skeleton h-3 w-4/5 bg-base-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="skeleton h-12 w-full rounded-xl bg-base-200"></div>
                <div className="skeleton h-12 w-full rounded-xl bg-base-200"></div>
              </div>
              <div className="skeleton h-14 w-full rounded-xl bg-base-200"></div>
            </div>
          </div>
        </div>

        <section className="mt-12 pt-8 border-t border-base-200">
          <div className="skeleton h-8 w-48 mb-8 mx-auto md:mx-0 bg-base-200"></div>

          <div className="flex gap-6 pb-4 px-2 overflow-hidden justify-center md:justify-start">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="shrink-0 w-full max-w-[320px]">
                <div className="skeleton h-[200px] w-full rounded-2xl bg-base-200"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;
