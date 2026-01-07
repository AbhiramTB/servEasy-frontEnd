import { CheckCircle } from 'lucide-react';

const WhyRegister = () => {
  return (
    <section id="why-us" className="py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4">Why You Should Register</h2>
        <p className="text-center mb-16 text-lg opacity-90">
          A platform designed to help service providers grow without stress
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Get More Work */}
          <div className="bg-accent text-accent-content bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">🚀 Get More Work</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Customers near you find your service automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>No need to search, wait, or depend on referrals</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Your skills matter more than communication or marketing</span>
              </li>
            </ul>
          </div>

          {/* Earn on Your Terms */}
          <div className="bg-accent text-accent-content bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">💰 Earn on Your Terms</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Choose your working time and availability</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>No bargaining or payment confusion</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Secure payments to wallet or bank account</span>
              </li>
            </ul>
          </div>

          {/* Trust & Reputation */}
          <div className="bg-accent text-accent-content bg-opacity-10 bg-grid-pattern backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">🛡️ Build Trust</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Verified users and genuine bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Ratings and reviews grow your reputation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Clear booking history reduces disputes</span>
              </li>
            </ul>
          </div>

          {/* Simple Tools */}
          <div className="bg-accent text-accent-content bg-opacity-10 bg-grid-pattern backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">⚡ Simple to Use</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Accept bookings with just a few taps</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Create slots without technical knowledge</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1" size={24} />
                <span>Manage everything from one dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRegister;
