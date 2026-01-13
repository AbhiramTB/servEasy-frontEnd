import React from 'react';
import { MapPin, ShieldCheck, Users, Wrench, Star, Briefcase } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* ---------- Navbar ---------- */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">ServEase</div>

        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          <a className="hover:text-blue-600">Home</a>
          <a className="hover:text-blue-600">Services</a>
          <a className="hover:text-blue-600">Providers</a>
          <a className="hover:text-blue-600">How it Works</a>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Login</button>
      </nav>

      {/* ---------- Hero Section ---------- */}
      <header className="relative bg-gradient-to-r from-blue-50 to-indigo-50 pt-20 pb-32 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-blue-600 font-semibold uppercase tracking-wide">Trusted Service Marketplace</span>

            <h1 className="text-5xl font-bold leading-tight">
              Find reliable services <br />
              <span className="text-gray-800">near your location</span>
            </h1>

            <p className="text-gray-600 max-w-md">
              Book electricians, plumbers, cleaners, mechanics and more — verified professionals at your doorstep.
            </p>

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-md shadow hover:bg-blue-700 transition">
                Find Services
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-md">Become a Provider</button>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="w-full h-[480px] bg-blue-200 rounded-3xl flex items-center justify-center text-blue-800 font-semibold">
              Service Illustration
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Why ServEase ---------- */}
      <section className="py-24 px-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">Why Choose ServEase?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MapPin />}
            title="Location Based Services"
            desc="Find nearby service providers using real-time location."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Verified Professionals"
            desc="All providers are reviewed and verified for quality."
            active
          />
          <FeatureCard icon={<Users />} title="Easy Booking" desc="Book, chat and track services from one place." />
        </div>
      </section>

      {/* ---------- Popular Categories ---------- */}
      <section className="bg-gray-50 py-24 px-10">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Popular Services</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          <CategoryCard icon={<Wrench />} title="Electrician" />
          <CategoryCard icon={<Briefcase />} title="Plumber" />
          <CategoryCard icon={<Star />} title="Home Cleaning" />
          <CategoryCard icon={<Wrench />} title="Mechanic" />
          <CategoryCard icon={<Briefcase />} title="AC Repair" />
          <CategoryCard icon={<Star />} title="Painting" />
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="py-24 px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard value="5K+" label="Service Providers" />
          <StatCard value="20K+" label="Happy Customers" />
          <StatCard value="4.8★" label="Average Rating" />
        </div>
      </section>
    </div>
  );
};

/* ---------- Components ---------- */

const FeatureCard = ({
  icon,
  title,
  desc,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  active?: boolean;
}) => (
  <div
    className={`p-10 rounded-2xl text-left transition ${
      active ? 'bg-blue-600 text-white scale-105 shadow-xl' : 'bg-blue-50 text-gray-800'
    }`}
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm opacity-90">{desc}</p>
  </div>
);

const CategoryCard = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center gap-4 hover:shadow-md transition">
    {icon}
    <p className="font-semibold">{title}</p>
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-blue-600 text-white p-10 rounded-2xl text-center">
    <h3 className="text-4xl font-bold">{value}</h3>
    <p className="mt-2">{label}</p>
  </div>
);

export default LandingPage;
