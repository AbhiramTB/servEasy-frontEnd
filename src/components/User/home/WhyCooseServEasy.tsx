import { Shield, Clock, Star, CreditCard } from 'lucide-react';

const WhyChooseServEasy = () => {
  const features = [
    {
      title: "Verified Providers",
      icon: Shield,
      color: "bg-primary"
    },
    {
      title: "Quick Booking", 
      icon: Clock,
      color: "bg-secondary"
    },
    {
      title: "Trusted Ratings",
      icon: Star,
      color: "bg-accent"
    },
    {
      title: "Secure Payments",
      icon: CreditCard,
      color: "bg-info"
    }
  ];

  return (
    <div className="px-4 py-16 bg-base-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary">
            Why Choose ServEase?
          </h2>
          <div className="w-20 h-1 mx-auto bg-primary"></div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={idx}
                className="p-6 text-center transition-shadow duration-300 border-l-4 rounded-lg shadow-md bg-base-200 hover:shadow-lg border-primary"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-6 h-6 text-base-100" />
                </div>
                <h3 className="text-lg font-semibold text-base-content">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>

       
      </div>
    </div>
  );
};

export default WhyChooseServEasy;