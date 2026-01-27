import { Shield, CheckCircle, TrendingUp, Zap } from 'lucide-react';

const problems = [
  {
    title: 'Finding Clients is Hard',
    description:
      'Skilled service providers often struggle to find regular customers and depend on referrals or waiting.',
    icon: Shield,
    bg: 'bg-red-100',
    color: 'text-red-600',
  },
  {
    title: 'Payment Delays & Issues',
    description: 'Late payments, bargaining, and payment disputes make income unpredictable and stressful.',
    icon: CheckCircle,
    bg: 'bg-yellow-100',
    color: 'text-yellow-600',
  },
  {
    title: 'Inconsistent Income',
    description: 'Without steady bookings, income becomes uncertain and hard to plan month to month.',
    icon: TrendingUp,
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    title: 'Complex Processes',
    description: 'Managing calls, schedules, and confirmations manually wastes time and causes confusion.',
    icon: Zap,
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    title: 'No Professional Support',
    description: 'When issues arise, service providers are often left alone without proper support.',
    icon: Shield,
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
  {
    title: 'Lack of Credibility',
    description: 'Without reviews or proof of work, customers hesitate to trust new or independent providers.',
    icon: TrendingUp,
    bg: 'bg-pink-100',
    color: 'text-pink-600',
  },
];

const ProblemsWeSolve = () => {
  return (
    <section id="problems" className="py-20 px-4 bg-base-200 bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4">Problems We Solve</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Real challenges faced by service providers — solved with ServEase
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <div className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={item.color} size={32} />
                  </div>
                  <h3 className="card-title text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;
