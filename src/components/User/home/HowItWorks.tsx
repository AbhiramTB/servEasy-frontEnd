import { ArrowRight, CheckCircle, Search, Star, Users } from "lucide-react";

const HowItWorks = () => {
  const howItWorksSteps = [
    {
      icon: Search,
      title: "Search",
      description: "Find the perfect service for your needs from our wide range of categories"
    },
    {
      icon: Users,
      title: "Compare",
      description: "Compare providers, read reviews, and check ratings from real customers"
    },
    {
      icon: CheckCircle,
      title: "Book",
      description: "Book instantly with secure payment and flexible scheduling options"
    },
    {
      icon: Star,
      title: "Get Service",
      description: "Enjoy professional service delivery with quality guarantee"
    }
  ];

  const stepColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-info'];

  return (
    <div>
      {/* How It Works */}
      <section className="py-24  bg-base bg-opacity-80 backdrop-blur-sm relative overflow-hidden">
        {/* Grid Pattern Background */}
    
        
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

      



        <div className="max-w-screen-xl px-5 mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-base-content mb-8">
              How It Works
            </h2>
            <div className="w-32 h-1 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
              Get the service you need in just four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index} 
                  className="group relative"
                  style={{ 
                    animation: `fadeInUp 0.8s ease-out ${index * 200}ms both`
                  }}
                >
                  {/* Connection line for desktop */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden xl:block absolute top-20 left-full w-full h-0.5 bg-base-content/20 transform translate-x-4 z-0"></div>
                  )}
                  
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full border border-base-300">
                    <div className="card-body items-center text-center p-8">
                      {/* Step number */}
                      <div className="badge badge-primary badge-lg absolute -top-3 -right-3 w-10 h-10 text-primary-content font-bold text-lg">
                        {index + 1}
                      </div>
                      
                      {/* Icon with colored background */}
                      <div className={`w-24 h-24 rounded-3xl ${stepColors[index]} p-5 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 mb-6`}>
                        <IconComponent className="w-full h-full text-base-100" />
                      </div>
                      
                      <h3 className="card-title text-2xl md:text-3xl text-base-content mb-4 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-base-content/70 leading-relaxed group-hover:text-base-content transition-colors duration-300 text-lg">
                        {step.description}
                      </p>
                      
                      {/* Hover arrow */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ArrowRight className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add keyframes for animation */}
        <style >{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default HowItWorks;