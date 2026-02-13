// components/admin/PaymentTable.tsx
import React from 'react';

const PaymentTable: React.FC<{ chartData: any[] }> = ({ chartData }) => {
  if (!chartData.length) return null;

  return (
    <section className="mt-8 overflow-hidden bg-base-300 rounded-lg shadow">
      <h3 className="p-6 text-xl font-semibold border-b">Payment Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary">
          <thead className="">
            <tr>
              {['Period', 'Total Revenue', 'Convenience Fee', 'Net Revenue', 'Transactions'].map(h => (
                <th key={h} className="px-6 py-3 text-xs font-medium text-left  uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-primary">
            {chartData.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">Period {idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{item.totalRevenue.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{item.totalConvenienceFee.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{item.netRevenue.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentTable;
