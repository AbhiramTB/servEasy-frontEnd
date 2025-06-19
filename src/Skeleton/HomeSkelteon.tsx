import React from 'react';

const ShimmerBox = ({ className = "", delay = 0 }) => (
  <div 
    className={`bg-gradient-to-r from-base-300 via-base-200 to-base-300 bg-[length:200%_100%] animate-pulse rounded-lg ${className}`}
    style={{
      animation: `shimmer 2s infinite linear ${delay}ms, pulse 2s infinite ${delay}ms`,
      backgroundImage: 'linear-gradient(90deg, hsl(var(--b3)) 0%, hsl(var(--b2)) 50%, hsl(var(--b3)) 100%)'
    }}
  />
);

const ServiceCardSkeleton = ({ delay = 0 }) => (
  <div className="overflow-hidden transition-all duration-300 border shadow-lg bg-base-100 rounded-2xl border-base-300 hover:shadow-xl animate-fadeIn"
       style={{ animationDelay: `${delay}ms` }}>
    {/* Image placeholder */}
    <div className="relative h-48 overflow-hidden">
      <ShimmerBox className="w-full h-full" delay={delay} />
      <div className="absolute top-3 right-3">
        <ShimmerBox className="w-8 h-8 rounded-full" delay={delay + 200} />
      </div>
    </div>
    
    {/* Content */}
    <div className="p-4 space-y-3">
      {/* Title */}
      <ShimmerBox className="w-3/4 h-6" delay={delay + 100} />
      
      {/* Category */}
      <ShimmerBox className="w-1/2 h-4" delay={delay + 200} />
      
      {/* Description */}
      <div className="space-y-2">
        <ShimmerBox className="w-full h-3" delay={delay + 300} />
        <ShimmerBox className="w-5/6 h-3" delay={delay + 400} />
      </div>
      
      {/* Price and rating */}
      <div className="flex items-center justify-between pt-2">
        <ShimmerBox className="w-16 h-5" delay={delay + 500} />
        <div className="flex items-center space-x-1">
          <ShimmerBox className="w-4 h-4 rounded" delay={delay + 600} />
          <ShimmerBox className="w-8 h-4" delay={delay + 700} />
        </div>
      </div>
    </div>
  </div>
);

const CategorySkeleton = ({ delay = 0 }) => (
  <div className="flex flex-col items-center p-6 transition-all duration-300 border shadow-lg cursor-pointer bg-base-100 rounded-2xl border-base-300 hover:shadow-xl group animate-fadeIn"
       style={{ animationDelay: `${delay}ms` }}>
    <div className="relative mb-4">
      <ShimmerBox className="w-16 h-16 rounded-2xl" delay={delay} />
      <div className="absolute -top-1 -right-1">
        <ShimmerBox className="w-6 h-6 rounded-full" delay={delay + 200} />
      </div>
    </div>
    <ShimmerBox className="w-20 h-5" delay={delay + 300} />
    <ShimmerBox className="w-16 h-3 mt-2" delay={delay + 400} />
  </div>
);

const HomePageShimmer = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <style >{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col gap-10">
        {/* Hero Banner Skeleton */}
        <section className="relative bg-base-300 h-[450px] overflow-hidden">
          <ShimmerBox className="w-full h-full" />
          
          {/* Floating elements */}
          <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-primary/20 blur-2xl animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute w-40 h-40 rounded-full bottom-20 right-10 bg-secondary/20 blur-2xl animate-float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-accent/10 blur-3xl animate-float" 
               style={{ animationDelay: '2s' }} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
            {/* Title skeleton */}
            <div className="text-center animate-slideInLeft">
              <ShimmerBox className="h-16 mx-auto mb-4 w-96" />
              <ShimmerBox className="h-6 mx-auto w-80" delay={200} />
            </div>
            
            {/* Search bar skeleton */}
            <div className="w-full max-w-2xl p-2 border rounded-full shadow-xl bg-base-100 border-base-300 animate-slideInRight" 
                 style={{ animationDelay: '400ms' }}>
              <div className="flex items-center">
                <div className="flex items-center w-1/3 gap-2 px-4">
                  <ShimmerBox className="w-5 h-5 rounded" delay={600} />
                  <ShimmerBox className="flex-1 h-4" delay={700} />
                </div>
                <div className="w-px h-6 mx-2 bg-base-300" />
                <div className="flex items-center w-2/3 gap-2 px-4 py-2">
                  <ShimmerBox className="w-5 h-5 rounded" delay={800} />
                  <ShimmerBox className="flex-1 h-4" delay={900} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section Skeleton */}
       

        {/* Services Section Skeleton */}
        <section className="relative py-16 overflow-hidden bg-base-200">
          <div className="absolute inset-0">
            <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl animate-pulse" />
            <div className="absolute rounded-full bottom-20 right-10 w-72 h-72 bg-secondary/10 blur-3xl animate-pulse" />
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/5 blur-3xl animate-pulse" />
          </div>
          
          <div className="container relative z-10 px-4 mx-auto">
            <div className="mb-12 text-center animate-fadeIn">
              <ShimmerBox className="h-10 mx-auto mb-4 w-72" />
              <ShimmerBox className="h-4 mx-auto w-80" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, index) => (
                <ServiceCardSkeleton key={index} delay={index * 150} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section Skeleton */}
        <section className="py-16 bg-base-100">
          <div className="container px-4 mx-auto">
            <div className="mb-12 text-center animate-fadeIn">
              <ShimmerBox className="h-10 mx-auto mb-4 w-80" />
              <ShimmerBox className="h-4 mx-auto w-96" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-6 shadow-lg bg-base-200 rounded-2xl animate-fadeIn"
                     style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center mb-4">
                    <ShimmerBox className="w-12 h-12 rounded-full" delay={index * 200} />
                    <div className="flex-1 ml-4">
                      <ShimmerBox className="w-24 h-4 mb-2" delay={index * 200 + 100} />
                      <ShimmerBox className="w-16 h-3" delay={index * 200 + 200} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <ShimmerBox className="w-full h-3" delay={index * 200 + 300} />
                    <ShimmerBox className="w-5/6 h-3" delay={index * 200 + 400} />
                    <ShimmerBox className="w-4/5 h-3" delay={index * 200 + 500} />
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <ShimmerBox key={starIndex} className="w-4 h-4 mr-1 rounded" delay={index * 200 + 600 + starIndex * 50} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section Skeleton */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="container px-4 mx-auto">
            <div className="mb-12 text-center animate-fadeIn">
              <ShimmerBox className="h-10 mx-auto mb-4 w-72" />
              <ShimmerBox className="h-4 mx-auto w-80" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="text-center animate-fadeIn"
                     style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 shadow-lg bg-base-100 rounded-2xl">
                    <ShimmerBox className="w-10 h-10 rounded" delay={index * 150} />
                  </div>
                  <ShimmerBox className="w-32 h-6 mx-auto mb-2" delay={index * 150 + 100} />
                  <div className="space-y-2">
                    <ShimmerBox className="w-full h-3" delay={index * 150 + 200} />
                    <ShimmerBox className="w-4/5 h-3 mx-auto" delay={index * 150 + 300} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section Skeleton */}
        <section className="py-16 bg-base-100">
          <div className="container px-4 mx-auto">
            <div className="mb-12 text-center animate-fadeIn">
              <ShimmerBox className="w-64 h-10 mx-auto mb-4" />
              <ShimmerBox className="h-4 mx-auto w-72" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="text-center animate-fadeIn"
                     style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="relative">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20">
                      <ShimmerBox className="w-12 h-12 rounded-full" delay={index * 200} />
                    </div>
                    <div className="absolute flex items-center justify-center w-8 h-8 font-bold rounded-full -top-2 -right-2 bg-secondary text-secondary-content">
                      <ShimmerBox className="w-4 h-4 rounded" delay={index * 200 + 100} />
                    </div>
                  </div>
                  <ShimmerBox className="h-6 mx-auto mb-3 w-28" delay={index * 200 + 200} />
                  <div className="space-y-2">
                    <ShimmerBox className="w-full h-3" delay={index * 200 + 300} />
                    <ShimmerBox className="w-5/6 h-3 mx-auto" delay={index * 200 + 400} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePageShimmer;