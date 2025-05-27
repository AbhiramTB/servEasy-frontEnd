// components/admin/PaymentChartSection.tsx
import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import ChartCard from './ChartCard';

const PaymentChartSection: React.FC<{ chartData: any[]; loading: boolean }> = ({ chartData, loading }) => {
  const pieData = chartData.length ? [
    { name: 'Net Revenue', value: chartData[0].netRevenue, color: '#8884d8' },
    { name: 'Convenience Fee', value: chartData[0].totalConvenienceFee, color: '#82ca9d' }
  ] : [];

  if (!chartData.length) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow">
        <p className="text-lg text-gray-500">
          {loading ? 'Loading payment data...' : 'No payment data available'}
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ChartCard title="Revenue Breakdown">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(val) => [`₹
${val}`, '']} />
          <Legend />
          <Bar dataKey="totalRevenue" fill="#8884d8" />
          <Bar dataKey="totalConvenienceFee" fill="#82ca9d" />
          <Bar dataKey="netRevenue" fill="#ffc658" />
        </BarChart>
      </ChartCard>

      <ChartCard title="Revenue Distribution">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            dataKey="value"
          >
            {pieData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => [`₹
 ${val}`, '']} />
        </PieChart>
      </ChartCard>

      <ChartCard title="Transaction Count">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </AreaChart>
      </ChartCard>

      <ChartCard title="Revenue Trend">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(val) => [`₹${val}`, '']} />
          <Legend />
          <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
          <Line type="monotone" dataKey="netRevenue" stroke="#82ca9d" />
        </LineChart>
      </ChartCard>
    </section>
  );
};

export default PaymentChartSection;
