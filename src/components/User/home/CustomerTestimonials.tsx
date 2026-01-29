import { Star } from 'lucide-react';

const CustomerTestimonials = () => {
  const testimonials = [
    {
      name: 'Aadhil Shibu',
      service: 'electrical engineer ',
      rating: 5,
      comment: 'Exceptional service! My home has never been cleaner. Highly recommended!',
      avatar: 'Aa',
    },
    {
      name: 'Abhiram',
      service: 'Plumbing Repair',
      rating: 5,
      comment: 'Quick response and professional work. Fixed my issue in no time.',
      avatar: 'Atb',
    },
    {
      name: 'Gayathri Davis',
      service: 'Interior Design',
      rating: 5,
      comment: 'Transformed my space beautifully. Amazing attention to detail!',
      avatar: 'GD',
    },
  ];

  const avatarColors = ['bg-primary', 'bg-secondary', 'bg-accent'];

  return (
    <div>
      <section className="relative py-20 overflow-hidden bg-base-300 bg-opacity-80 backdrop-blur-sm">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute rounded-full bottom-20 right-10 w-72 h-72 bg-secondary/10 blur-3xl animate-pulse"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-screen-xl px-5 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl text-base-content">What Our Customers Say</h2>
            <div className="w-32 h-1 mx-auto mb-6 rounded-full bg-primary"></div>
            <p className="max-w-3xl mx-auto text-lg text-base-content/70 md:text-xl">
              Don't just take our word for it - see what our satisfied customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="transition-all duration-500 border shadow-xl card bg-base-100 hover:shadow-2xl hover:scale-105 border-base-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 200}ms both`,
                }}
              >
                <div className="p-8 card-body">
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
                        <Star key={i} className="w-5 h-5 fill-current text-warning" />
                      ))}
                    </div>
                  </div>

                  <p className="italic leading-relaxed text-base-content/80">"{testimonial.comment}"</p>
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
  );
};

export default CustomerTestimonials;
