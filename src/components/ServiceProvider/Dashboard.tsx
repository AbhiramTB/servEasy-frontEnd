import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PendingVerificationCard from './pendingVerification';

import FilterSection from '../Chart/FilterSection';
import StatsSection from '../Chart/StatsSection';
import PaymentChartSection from '../Chart/PaymentChartSection';
import PaymentTable from '../Chart/PaymentTable';

import { apiEndPointServiceProvider } from '../../utils/constant';
import RejectedRequestPage from './service/RejectedRequestPage';
import BlockedUserMessage from './service/BlockedMessage';
import { getRequest } from '../../utils/makeRequestInstance';
import PaymentSummaryDownloader from '../ui/PaymentSummaryDownloader';

interface PaymentData {
  totalRevenue: number;
  totalConvenienceFee: number;
  count: number;
}

const ServiceProviderDashboard: React.FC = () => {
  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);

  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [SummaryDownloader, setSummaryDownloader] = useState<boolean>(false);

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const fetchPaymentInfo = async () => {
    setLoading(true);
    try {
      const url =
        startDate && endDate
          ? `${apiEndPointServiceProvider.getPaymentInfo}?startDate=${startDate}&endDate=${endDate}`
          : apiEndPointServiceProvider.getPaymentInfo;

      const res = await getRequest(url);
      if (res.data?.paymentData) setPaymentData(res.data.paymentData);
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

  //    if (serviceProviderInfo.isBlocked===true) {
  //   return (
  //     <>
  //       <BlockedUserMessage  />
  //     </>
  //   );
  // }

  // if (serviceProviderInfo.isVerified==="pending") {
  //   return (
  //     <>
  //       <PendingVerificationCard  />
  //     </>
  //   );
  // }

  //   if (serviceProviderInfo.isVerified==="rejected") {
  //   return (
  //     <>
  //       <RejectedRequestPage  />
  //     </>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white text-base-content">
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Service Provider Dashboard</h1>
          <p className="mt-1 text-primary">
            Welcome back, {serviceProviderInfo.serviceProviderName || 'Service Provider'}.
          </p>
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
        <button className="p-2 m-5 rounded-md bg-primary text-base-100" onClick={() => setSummaryDownloader(true)}>
          {' '}
          download
        </button>

        {SummaryDownloader && (
          <PaymentSummaryDownloader startDate={startDate} endDate={endDate} paymentData={paymentData} />
        )}
      </main>
    </div>
  );
};

export default ServiceProviderDashboard;
