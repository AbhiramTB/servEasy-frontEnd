import React, { useState, useEffect } from "react";
import { getRequest } from "../../../utils/makeRequestInstance";
import { paymentRoutes } from "../../../utils/constant";
import Bookings from "../../ui/Bookings";
import { BookingData } from "../../../utils/types/booking";

type ActiveTabType = "bookings" | "payments";

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("bookings");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log(bookings[0]?.payment);

  useEffect(() => {
    getBookingInfo();
  }, []);

  const getBookingInfo = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getRequest(paymentRoutes.getServiceAdminPayments);
      if (response && response.data) {
        setBookings(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking information:", error);
      setError("Failed to load booking information. Please try again later.");
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" ||
      (activeTab === "bookings"
        ? booking.serviceStatus.toLowerCase() === statusFilter
        : booking.paymentStatus.toLowerCase() === statusFilter);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(searchLower) ||
      booking.serviceProviderName.toLowerCase().includes(searchLower) ||
      booking.userName.toLowerCase().includes(searchLower) ||
      booking.userEmail.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  const statusOptions = [
    "all",
    ...new Set(
      bookings.map((booking) =>
        activeTab === "bookings"
          ? booking.serviceStatus.toLowerCase()
          : booking.paymentStatus.toLowerCase()
      )
    ),
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
        <p>{error}</p>
        <button
          onClick={getBookingInfo}
          className="px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === "bookings" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500"}`}
          onClick={() => setActiveTab("bookings")}
        >
          Booking Management
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "payments" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500"}`}
          onClick={() => setActiveTab("payments")}
        >
          Payment Management
        </button>
      </div>

      <div className="flex flex-col justify-between mb-6 md:flex-row">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:mb-0">
          <div>
            <label
              htmlFor="statusFilter"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Status Filter
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md md:w-40"
            >
              {statusOptions.map((status: string) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full md:w-64">
          <label
            htmlFor="search"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {activeTab === "bookings" && <Bookings bookings={filteredBookings} />}

      {activeTab === "payments" && (
        <div className="mt-4">
          <p>Payment management view will be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
