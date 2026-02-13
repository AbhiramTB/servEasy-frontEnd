// components/admin/ChartCard.tsx
import React, { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

const ChartCard: React.FC<{ title: string; children: ReactElement }> = ({ title, children }) => (
  <div className="p-6 bg-base-300 rounded-lg shadow">
    <h3 className="mb-4 text-xl font-semibold">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

export default ChartCard;
