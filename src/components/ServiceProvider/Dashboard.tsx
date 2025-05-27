import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Navbar from "./Navbar";
import PendingVerificationCard from "./pendingVerification";

import FilterSection from "../Chart/FilterSection";
import StatsSection from "../Chart/StatsSection";
import PaymentChartSection from "../Chart/PaymentChartSection";
import PaymentTable from "../Chart/PaymentTable";

import { adminGetRequest } from "../../utils/AxiosAdmin";
import { apiEndPointAdmin } from "../../utils/constant";

interface PaymentData {
  totalRevenue: number;
  totalConvenienceFee: number;
  count: number;
}

const ServiceProviderDashboard: React.FC = () => {
  const serviceProviderInfo = useSelector(
    (state: RootState) => state.serviceProvider
  );

  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  if (!serviceProviderInfo.isVerified) {
    return (
      <>
        <PendingVerificationCard email={serviceProviderInfo.serviceProviderEmail} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-base text-base-content">

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Service Provider Dashboard</h1>
          <p className="mt-1 text-primary">Welcome back, {serviceProviderInfo.serviceProviderName || "Service Provider"}.</p>
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

export default ServiceProviderDashboard;
