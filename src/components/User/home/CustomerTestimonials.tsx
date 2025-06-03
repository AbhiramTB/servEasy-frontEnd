import { Star } from 'lucide-react'
import React from 'react'

const CustomerTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "Home Cleaning",
      rating: 5,
      comment: "Exceptional service! My home has never been cleaner. Highly recommended!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      service: "Plumbing Repair",
      rating: 5,
      comment: "Quick response and professional work. Fixed my issue in no time.",
      avatar: "MC"
    },
    {
      name: "Emily Davis",
      service: "Interior Design",
      rating: 5,
      comment: "Transformed my space beautifully. Amazing attention to detail!",
      avatar: "ED"
    }
  ];

  const avatarColors = ['bg-primary', 'bg-secondary', 'bg-accent'];

  return (
    <div>
      <section className="py-20 bg-base-300 bg-opacity-80 backdrop-blur-sm relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-screen-xl px-5 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
              What Our Customers Say
            </h2>
            <div className="w-32 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-base-content/70 text-lg md:text-xl max-w-3xl mx-auto">
              Don't just take our word for it - see what our satisfied customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-base-300"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 200}ms both`
                }}
              >
                <div className="card-body p-8">
                  <div className="flex items-center mb-6">
                    <div className={`avatar placeholder mr-4`}>
                      <div className={`w-12 h-12 ${avatarColors[index]} rounded-full text-base-100`}>
                        <span className="font-semibold">{testimonial.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base-content">{testimonial.name}</h4>
                      <p className="text-sm text-base-content/60">{testimonial.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="rating rating-sm">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-base-content/80 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add keyframes for animation */}
        <style>{`
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
  )
}

export default CustomerTestimonials