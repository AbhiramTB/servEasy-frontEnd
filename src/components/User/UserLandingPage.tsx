// import React, { useState, ReactNode } from 'react';
// import {
//   MapPin,
//   ShieldCheck,
//   Users,
//   Wrench,
//   Star,
//   Briefcase,
//   ChevronRight,
//   LogIn,
//   FileText,
//   CheckCircle,
//   Clock,
// } from 'lucide-react';

// /* ---------- Interfaces ---------- */
// interface FlowStepProps {
//   icon: ReactNode;
//   step: string;
//   title: string;
//   desc: string;
// }

// interface FeatureCardProps {
//   icon: ReactNode;
//   title: string;
//   desc: string;
//   active?: boolean;
// }

// interface CategoryCardProps {
//   icon: ReactNode;
//   title: string;
// }

// import img from '/images/landing/serveasy.jpeg';

// /* ---------- Reusable Navbar Component ---------- */
// const Navbar: React.FC = () => (
//   <div className="navbar bg-base-100 px-6 lg:px-10 sticky top-0 z-50 shadow-sm scroll-smooth">
//     <div className="navbar-start">
//       <div className="dropdown">
//         <label tabIndex={0} className="btn btn-ghost lg:hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//           </svg>
//         </label>
//         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//           <li>
//             <a>Home</a>
//           </li>
//           <li>
//             <a>Services</a>
//           </li>
//           <li>
//             <a>Providers</a>
//           </li>
//         </ul>
//       </div>
//       <a className="text-2xl font-black text-primary tracking-tighter cursor-pointer">ServEasy</a>
//     </div>
//     <div className="navbar-center hidden lg:flex">
//       <ul className="menu menu-horizontal px-1 font-medium">
//         <li>
//           <a>Home</a>
//         </li>
//         <li>
//           <a>Services</a>
//         </li>
//         <li>
//           <a>Providers</a>
//         </li>
//         <li>
//           <a>How it Works</a>
//         </li>
//       </ul>
//     </div>
//     <div className="navbar-end">
//       <button className="btn btn-primary btn-round px-8">Login</button>
//     </div>
//   </div>
// );

// const UserLandingPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-base-100 text-base-content font-sans">
//       <Navbar />

//       {/* ---------- Hero Section ---------- */}
//       <header className="hero min-h-[70vh] bg-base-200 px-6 lg:px-10">
//         <div className="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl">
//           <div className="w-full lg:w-1/2">
//             <div className="aspect-square bg-primary/10 rounded-[2rem] border-2 border-dashed border-primary/20 flex items-center justify-center text-primary font-bold"></div>
//           </div>
//           <div className="w-full lg:w-1/2">
//             <div className="badge badge-primary badge-outline mb-4 font-bold tracking-widest uppercase">
//               Trusted Service Marketplace
//             </div>
//             <h1 className="text-5xl font-extrabold leading-tight mb-6">
//               Find reliable services <br />
//               <span className="text-primary">near your location</span>
//             </h1>
//             <p className="py-6 text-lg text-base-content/70">
//               Book electricians, plumbers, and more — verified professionals at your doorstep. Fast, reliable, and
//               local.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <button className="btn btn-primary btn-lg px-8 shadow-lg">Find Services</button>
//               <a href="#become-provider">
//                 <button about="becomeProvider" className={`btn btn-outline btn-lg px-8  'btn-active'`}>
//                   Become a Provider
//                 </button>
//               </a>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ---------- Detailed Provider Onboarding Section ---------- */}

//       {/* ---------- Why ServEasy ---------- */}
//       <section className="py-24 px-10 max-w-7xl mx-auto">
//         <h2 className="text-4xl font-black text-center mb-16 italic uppercase">Why Choose Us?</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           <FeatureCard
//             icon={<MapPin className="w-8 h-8" />}
//             title="Geo-Location"
//             desc="Find experts within walking distance using our real-time GPS tracking."
//           />
//           <FeatureCard
//             icon={<ShieldCheck className="w-8 h-8" />}
//             title="Verified"
//             desc="Every pro undergoes a strict background check and ID verification."
//             active
//           />
//           <FeatureCard
//             icon={<Users className="w-8 h-8" />}
//             title="Real Reviews"
//             desc="Check authentic feedback and ratings from your local neighbors."
//           />
//         </div>
//       </section>

//       {/* ---------- Popular Categories ---------- */}
//       <section className="bg-base-200 py-24 px-10">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center">Popular Services</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             <CategoryCard icon={<Wrench />} title="Electrician" />
//             <CategoryCard icon={<Briefcase />} title="Plumber" />
//             <CategoryCard icon={<Star />} title="Cleaning" />
//             <CategoryCard icon={<Wrench />} title="Mechanic" />
//             <CategoryCard icon={<Briefcase />} title="AC Repair" />
//             <CategoryCard icon={<Star />} title="Painting" />
//           </div>
//         </div>
//       </section>

//       {/* ---------- Stats ---------- */}
//       <section className="py-24 px-10 max-w-7xl mx-auto">
//         <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-neutral text-neutral-content">
//           <div className="stat place-items-center">
//             <div className="stat-title text-neutral-content/70">Service Providers</div>
//             <div className="stat-value text-5xl text-primary">5,000+</div>
//             <div className="stat-desc text-neutral-content/70">Verified Professionals</div>
//           </div>
//           <div className="stat place-items-center border-neutral-focus">
//             <div className="stat-title text-neutral-content/70">Happy Customers</div>
//             <div className="stat-value text-5xl text-secondary">20,000+</div>
//             <div className="stat-desc text-neutral-content/70">↗︎ 22% increase this month</div>
//           </div>
//           <div className="stat place-items-center">
//             <div className="stat-title text-neutral-content/70">Average Rating</div>
//             <div className="stat-value text-5xl text-accent">4.8★</div>
//             <div className="stat-desc text-neutral-content/70">Based on 15k reviews</div>
//           </div>
//         </div>
//       </section>

//       <section
//         id="become-provider"
//         className="py-20 bg-base-300 text-base-content  animate-in fade-in slide-in-from-top-4 duration-500"
//       >
//         <div className="max-w-6xl mx-auto px-10">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-black mb-4">Start Earning with ServEasy</h2>
//             <p className="text-primary max-w-2xl mx-auto">
//               Join our community of experts. Follow these simple steps to set up your profile and start receiving jobs.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <FlowStep
//               icon={<LogIn />}
//               step="1"
//               title="Sign Up/Login"
//               desc="Access the platform by creating your professional account."
//             />
//             <FlowStep
//               icon={<FileText />}
//               step="2"
//               title="Registration"
//               desc="Fill the form with your skills, service area, and identity proof."
//             />
//             <FlowStep
//               icon={<Clock />}
//               step="3"
//               title="Admin Review"
//               desc="Our team validates your documents to ensure platform safety."
//             />
//             <FlowStep
//               icon={<CheckCircle />}
//               step="4"
//               title="Go Live"
//               desc="Once approved, your profile becomes visible to local customers!"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// /* ---------- Sub-Components ---------- */

// const FlowStep: React.FC<FlowStepProps> = ({ icon, step, title, desc }) => (
//   <div className="flex flex-col items-center text-center space-y-4 bg-primary-focus/20 p-6 rounded-2xl border border-primary-content/10">
//     <div className="avatar placeholder">
//       <div className="bg-secondary text-secondary-content rounded-full w-16 h-16 shadow-lg">{icon}</div>
//     </div>
//     <div className="space-y-2">
//       <h3 className="text-sm font-black font-mono opacity-70 tracking-widest">STEP {step}</h3>
//       <h4 className="text-xl font-bold leading-tight">{title}</h4>
//       <p className="text-sm opacity-80">{desc}</p>
//     </div>
//   </div>
// );

// const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, active = false }) => (
//   <div
//     className={`card shadow-xl transition-all hover:-translate-y-2 ${
//       active ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'
//     }`}
//   >
//     <div className="card-body">
//       <div className={`p-3 rounded-xl w-fit mb-2 ${active ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>{icon}</div>
//       <h3 className="card-title text-2xl">{title}</h3>
//       <p className="opacity-80">{desc}</p>
//     </div>
//   </div>
// );

// const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title }) => (
//   <div className="btn btn-ghost h-auto py-8 flex flex-col gap-3 bg-base-100 shadow-sm border border-base-300 hover:border-primary hover:bg-primary/5 transition-colors">
//     <div className="text-primary scale-125">{icon}</div>
//     <span className="text-xs uppercase font-bold tracking-wider">{title}</span>
//   </div>
// );

// export default UserLandingPage;
