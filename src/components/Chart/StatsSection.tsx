// components/admin/StatsSection.tsx
import React from 'react';

interface ChartData {
  totalRevenue: number;
  totalConvenienceFee: number;
  count: number;
  netRevenue: number;
}

const StatsSection: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const totalRevenue = data.reduce((acc, i) => acc + i.totalRevenue, 0);
  const totalFee = data.reduce((acc, i) => acc + i.totalConvenienceFee, 0);
  const totalCount = data.reduce((acc, i) => acc + i.count, 0);
  const netRevenue = totalRevenue - totalFee;

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toFixed(2)}`, color: 'text-primary' },
    { label: 'Net Revenue', value: `₹${netRevenue.toFixed(2)}`, color: 'text-accent' },
    { label: 'Convenience Fees', value: `₹${totalFee.toFixed(2)}`, color: 'text-error' },
    { label: 'Total Transactions', value: totalCount, color: 'text-primary' },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
      {stats.map(({ label, value, color }) => (
        <div key={label} className="p-6 backdrop-blur-3xl bg-base-300 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-base-content">{label}</h3>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
