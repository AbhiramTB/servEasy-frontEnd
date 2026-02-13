import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { apiEndPointAdmin } from '../../../utils/constant';
import { adminGetRequest } from '../../../utils/AxiosAdmin';
import FilterSection from '../../../components/Chart/FilterSection';
import StatsSection from '../../../components/Chart/StatsSection';
import PaymentChartSection from '../../../components/Chart/PaymentChartSection';
import PaymentTable from '../../../components/Chart/PaymentTable';

interface PaymentData {
  totalRevenue: number;
  totalConvenienceFee: number;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const admin = useSelector((state: RootState) => state.admin);

  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const fetchPaymentInfo = async () => {
    setLoading(true);
    try {
      const url =
        startDate && endDate
          ? `${apiEndPointAdmin.gtPaymentInfo}?startDate=${startDate}&endDate=${endDate}`
          : apiEndPointAdmin.gtPaymentInfo;

      const res = await adminGetRequest(url);
      if (res.status == 200) {
        if (res.data?.paymentData) setPaymentData([res.data.paymentData]);
        console.log(paymentData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = paymentData.map((item, i) => ({
    name: `Period ${i + 1}`,
    totalRevenue: item.totalRevenue,
    totalConvenienceFee: item.totalConvenienceFee,
    count: item.count,
    netRevenue: item.totalRevenue - item.totalConvenienceFee,
  }));

  return (
    <div className="min-h-screen text-base-content bg-base">
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-primary">Welcome back, {admin.userName}.</p>
        </header>

        <FilterSection
          startDate={startDate}
          endDate={endDate}
          loading={loading}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApplyFilter={fetchPaymentInfo}
        />

        <StatsSection data={chartData} />

        <PaymentChartSection chartData={chartData} loading={loading} />

        <PaymentTable chartData={chartData} />
      </main>
    </div>
  );
};

export default AdminDashboard;
