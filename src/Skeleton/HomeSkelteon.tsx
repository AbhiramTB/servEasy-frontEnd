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
  <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeIn"
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
      <ShimmerBox className="h-6 w-3/4" delay={delay + 100} />
      
      {/* Category */}
      <ShimmerBox className="h-4 w-1/2" delay={delay + 200} />
      
      {/* Description */}
      <div className="space-y-2">
        <ShimmerBox className="h-3 w-full" delay={delay + 300} />
        <ShimmerBox className="h-3 w-5/6" delay={delay + 400} />
      </div>
      
      {/* Price and rating */}
      <div className="flex justify-between items-center pt-2">
        <ShimmerBox className="h-5 w-16" delay={delay + 500} />
        <div className="flex items-center space-x-1">
          <ShimmerBox className="h-4 w-4 rounded" delay={delay + 600} />
          <ShimmerBox className="h-4 w-8" delay={delay + 700} />
        </div>
      </div>
    </div>
  </div>
);

const CategorySkeleton = ({ delay = 0 }) => (
  <div className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 group cursor-pointer animate-fadeIn"
       style={{ animationDelay: `${delay}ms` }}>
    <div className="relative mb-4">
      <ShimmerBox className="w-16 h-16 rounded-2xl" delay={delay} />
      <div className="absolute -top-1 -right-1">
        <ShimmerBox className="w-6 h-6 rounded-full" delay={delay + 200} />
      </div>
    </div>
    <ShimmerBox className="h-5 w-20" delay={delay + 300} />
    <ShimmerBox className="h-3 w-16 mt-2" delay={delay + 400} />
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
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl animate-float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" 
               style={{ animationDelay: '2s' }} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
            {/* Title skeleton */}
            <div className="text-center animate-slideInLeft">
              <ShimmerBox className="h-16 w-96 mx-auto mb-4" />
              <ShimmerBox className="h-6 w-80 mx-auto" delay={200} />
            </div>
            
            {/* Search bar skeleton */}
            <div className="w-full max-w-2xl bg-base-100 rounded-full shadow-xl border border-base-300 p-2 animate-slideInRight" 
                 style={{ animationDelay: '400ms' }}>
              <div className="flex items-center">
                <div className="flex items-center w-1/3 gap-2 px-4">
                  <ShimmerBox className="w-5 h-5 rounded" delay={600} />
                  <ShimmerBox className="h-4 flex-1" delay={700} />
                </div>
                <div className="w-px h-6 mx-2 bg-base-300" />
                <div className="flex items-center w-2/3 gap-2 px-4 py-2">
                  <ShimmerBox className="w-5 h-5 rounded" delay={800} />
                  <ShimmerBox className="h-4 flex-1" delay={900} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section Skeleton */}
        <section className="bg-base-100 py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-fadeIn">
              <ShimmerBox className="h-10 w-80 mx-auto mb-4" />
              <ShimmerBox className="h-4 w-96 mx-auto" delay={200} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[...Array(12)].map((_, index) => (
                <CategorySkeleton key={index} delay={index * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section Skeleton */}
        <section className="bg-base-200 py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-fadeIn">
              <ShimmerBox className="h-10 w-72 mx-auto mb-4" />
              <ShimmerBox className="h-4 w-80 mx-auto" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <ServiceCardSkeleton key={index} delay={index * 150} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section Skeleton */}
        <section className="bg-base-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeIn">
              <ShimmerBox className="h-10 w-80 mx-auto mb-4" />
              <ShimmerBox className="h-4 w-96 mx-auto" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-base-200 rounded-2xl p-6 shadow-lg animate-fadeIn"
                     style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center mb-4">
                    <ShimmerBox className="w-12 h-12 rounded-full" delay={index * 200} />
                    <div className="ml-4 flex-1">
                      <ShimmerBox className="h-4 w-24 mb-2" delay={index * 200 + 100} />
                      <ShimmerBox className="h-3 w-16" delay={index * 200 + 200} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <ShimmerBox className="h-3 w-full" delay={index * 200 + 300} />
                    <ShimmerBox className="h-3 w-5/6" delay={index * 200 + 400} />
                    <ShimmerBox className="h-3 w-4/5" delay={index * 200 + 500} />
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
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeIn">
              <ShimmerBox className="h-10 w-72 mx-auto mb-4" />
              <ShimmerBox className="h-4 w-80 mx-auto" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="text-center animate-fadeIn"
                     style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="bg-base-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <ShimmerBox className="w-10 h-10 rounded" delay={index * 150} />
                  </div>
                  <ShimmerBox className="h-6 w-32 mx-auto mb-2" delay={index * 150 + 100} />
                  <div className="space-y-2">
                    <ShimmerBox className="h-3 w-full" delay={index * 150 + 200} />
                    <ShimmerBox className="h-3 w-4/5 mx-auto" delay={index * 150 + 300} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section Skeleton */}
        <section className="bg-base-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeIn">
              <ShimmerBox className="h-10 w-64 mx-auto mb-4" />
              <ShimmerBox className="h-4 w-72 mx-auto" delay={200} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="text-center animate-fadeIn"
                     style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="relative">
                    <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShimmerBox className="w-12 h-12 rounded-full" delay={index * 200} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-secondary w-8 h-8 rounded-full flex items-center justify-center text-secondary-content font-bold">
                      <ShimmerBox className="w-4 h-4 rounded" delay={index * 200 + 100} />
                    </div>
                  </div>
                  <ShimmerBox className="h-6 w-28 mx-auto mb-3" delay={index * 200 + 200} />
                  <div className="space-y-2">
                    <ShimmerBox className="h-3 w-full" delay={index * 200 + 300} />
                    <ShimmerBox className="h-3 w-5/6 mx-auto" delay={index * 200 + 400} />
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