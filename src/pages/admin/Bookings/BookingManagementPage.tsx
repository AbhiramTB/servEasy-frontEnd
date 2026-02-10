import React, { useState, useEffect } from 'react';
import { paymentRoutes } from '../../../utils/constant';
import Bookings from '../../../components/ui/Bookings';
import { BookingData } from '../../../utils/types/booking';
import SearchComponent from '../../../components/ui/SearchComponent';
import { adminGetRequest } from '../../../utils/AxiosAdmin';

type ActiveTabType = 'bookings' | 'payments';

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab] = useState<ActiveTabType>('bookings');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totaldata, setTotalData] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [statusField, setStatusField] = useState<'serviceStatus' | 'paymentStatus'>('serviceStatus');

  const dataLimit = 6;
  useEffect(() => {
    getBookingInfo(crrPage, searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  const getBookingInfo = async (page: number, searchVal: string, status: string): Promise<void> => {
    try {
      const param: Record<string, any> = { page, limit: dataLimit };
      if (searchVal) {
        param.search = searchVal;
      }
      if (statusFilter) {
        param.status = status;
      }
      if (statusField) {
        param.statusType = statusField;
      }
      const response = await adminGetRequest(paymentRoutes.getServiceAdminPayments, { params: param });

      if (response.status === 200 && response.data) {
        setTotalData(response.data.count);
        setBookings(response.data.data);
        setCrrPage(page);
      }
    } catch (error) {
      console.error('Error fetching booking information:', error);
      setError('Failed to load booking information. Please try again later.');
    }
  };

  if (error) {
    return (
      <div className="px-4 py-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => getBookingInfo(crrPage, searchTerm, statusFilter)}
          className="px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 ">
      <div className="flex flex-col justify-end gap-3 pb-4 mb-6 border-b md:flex-row md:items-center">
        {/* Search Box */}
        <div className="w-full md:w-64">
          <SearchComponent setSearch={setSearchTerm} searchVal={searchTerm} />
        </div>

        {/* Status Field Toggle and Dropdown */}
        <div className="flex flex-col w-full gap-2 md:w-96 md:flex-row md:items-center">
          {/* Radio Buttons to choose statusField */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statusField"
                value="serviceStatus"
                checked={statusField === 'serviceStatus'}
                onChange={() => setStatusField('serviceStatus')}
                className="radio"
              />
              <span className="text-sm">Service Status</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statusField"
                value="paymentStatus"
                checked={statusField === 'paymentStatus'}
                onChange={() => setStatusField('paymentStatus')}
                className="radio"
              />
              <span className="text-sm">Payment Status</span>
            </label>
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full select select-bordered md:w-48"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="requested">Requested</option>
            <option value="in-progress">In Progress</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto">{activeTab === 'bookings' && <Bookings bookings={bookings} />}</div>
      {activeTab === 'payments' && (
        <div className="mt-4">
          <p>Payment management view will be implemented here.</p>
        </div>
      )}
      <div className="flex justify-center mt-10 mb-10 join">
        <button
          className="text-3xl font-bold join-item btn bg-primary text-primary-content"
          onClick={() => getBookingInfo(crrPage - 1, searchTerm, statusFilter)}
          disabled={crrPage === 0}
        >
          «
        </button>

        <button className="join-item btn bg-base-300">Page {crrPage + 1}</button>

        <button
          className="text-3xl font-bold join-item btn bg-primary text-primary-content"
          onClick={() => getBookingInfo(crrPage + 1, searchTerm, statusFilter)}
          disabled={(crrPage + 1) * dataLimit >= totaldata}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default BookingManagement;
