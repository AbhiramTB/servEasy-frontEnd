const WalletShimmer = () => {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="max-w-6xl p-4 mx-auto md:p-8">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-48 h-10 mb-2 skeleton md:w-64 md:h-12"></div>
          <div className="w-64 h-4 skeleton opacity-70"></div>
        </div>

        <div className="relative p-6 mb-8 overflow-hidden shadow-lg bg-base-100 rounded-3xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full skeleton"></div>
                <div className="w-32 h-6 skeleton"></div>
              </div>

              <div className="mb-6">
                <div className="w-40 h-12 skeleton md:w-64 md:h-16"></div>
              </div>

              <div className="w-40 h-12 rounded-xl skeleton"></div>
            </div>

            <div className="relative z-20 w-full p-5 shadow-xl bg-base-200 rounded-2xl lg:absolute lg:right-6 lg:top-1/2 lg:w-72 lg:-translate-y-1/2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded skeleton"></div>
                  <div className="w-20 h-5 skeleton"></div>
                </div>
                <div className="w-4 h-4 rounded skeleton"></div>
              </div>

              <div className="space-y-3">
                <div className="w-full h-3 skeleton"></div>
                <div className="w-4/5 h-3 skeleton"></div>
                <div className="w-3/4 h-3 skeleton"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 shadow-xl bg-base-100 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 rounded skeleton"></div>
            <div className="w-48 h-8 skeleton"></div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="flex items-center justify-between p-2 border border-base-300 bg-base-100 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 skeleton rounded-2xl"></div>
                  <div className="space-y-2">
                    <div className="w-24 h-5 skeleton"></div>
                    <div className="w-32 h-3 skeleton opacity-60"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-8 rounded-full skeleton"></div>
                  <div className="hidden w-24 h-10 rounded-xl skeleton md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletShimmer;
