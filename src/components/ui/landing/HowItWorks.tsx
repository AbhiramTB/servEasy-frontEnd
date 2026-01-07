const steps = [
  { step: 1, title: 'Register', desc: 'Sign up with your details and skills' },
  { step: 2, title: 'Get Validated', desc: 'Admin verifies your profile' },
  { step: 3, title: 'List Services', desc: 'Add services with pricing' },
  { step: 4, title: 'Get Booked', desc: 'Customers book your services' },
  { step: 5, title: 'Earn Money', desc: 'Complete work and get paid' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4">How to Start Earning</h2>
        <p className="text-center text-primary mb-16 text-lg">Simple steps to launch your service business</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-content w-20 h-20 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-primary">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
