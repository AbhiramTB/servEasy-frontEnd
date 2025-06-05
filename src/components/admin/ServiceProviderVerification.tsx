import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceProviders,
  ServiceProvider,
} from "../../redux/slices/adminSlice";
import { adminGetRequest, adminPatchRequest } from "../../utils/AxiosAdmin";
import { apiEndPointAdmin } from "../../utils/constant";
import { RootState } from "../../redux/store";
import { HotToastSuccess } from "../../utils/notificationToast";
import { Toaster } from "react-hot-toast";
import DocumentViewer from "./DocumentViewer";

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
        <h3 className="mb-4 text-xl font-bold text-white">Rejection Reason</h3>
        <textarea
          className="w-full p-3 mb-4 text-white bg-gray-700 rounded-md min-h-32"
          placeholder="Please provide a reason for rejection..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            disabled={!reason.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceProviderVerification: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<{
    open: boolean;
    url: string;
  }>({
    open: false,
    url: "",
  });

  const getAllServiceProviders = useCallback(async () => {
    try {
      const res = await adminGetRequest(apiEndPointAdmin.serviceProvider);
      if (res.data && res.data.data) {
        dispatch(addServiceProviders(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching service providers:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllServiceProviders();
  }, [getAllServiceProviders]);

  const serviceProviders = useSelector(
    (state: RootState) => state.admin.serviceProviders
  );

  const handleVerify = async (providerId: string) => {
    try {
      const data = { serviceProviderId: providerId, action: "verify" };
      const res = await adminPatchRequest(
        apiEndPointAdmin.serviceProviderVerify,
        data
      );
      console.log(res.data.data);

      HotToastSuccess("Service provider verified successfully");
      getAllServiceProviders();
    } catch (error) {
      console.error("Error verifying service provider:", error);
    }
  };

  const openRejectModal = (providerId: string) => {
    setSelectedProviderId(providerId);
    setIsRejectModalOpen(true);
  };

  const handleReject = async (reason: string) => {
    if (!selectedProviderId) return;

    try {
      const data = {
        serviceProviderId: selectedProviderId,
        action: "reject",
        reason: reason,
      };
      const res = await adminPatchRequest(
        apiEndPointAdmin.serviceProviderReject,
        data
      );
      HotToastSuccess("Service provider rejected");
      getAllServiceProviders();
      setIsRejectModalOpen(false);
      setSelectedProviderId(null);
    } catch (error) {
      console.error("Error rejecting service provider:", error);
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleImagePreview = (url: string) => {
    setImagePreview({ open: true, url });
  };

  const closeImagePreview = () => {
    setImagePreview({ open: false, url: "" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Image Preview Modal */}
      {imagePreview.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-4xl max-h-screen p-4">
            <button
              onClick={closeImagePreview}
              className="absolute top-0 right-0 p-2 m-2 rounded-full bg-base-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={imagePreview.url}
              alt="Preview"
              className="object-contain max-w-full max-h-screen"
            />
          </div>
        </div>
      )}

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleReject}
      />

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Service Provider Verification</h1>
          <p className="mt-1 text-base-content/70">
            Review and verify service provider applications
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-t-2 border-b-2 rounded-full border-primary animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {serviceProviders.length > 0 &&
              serviceProviders.map((provider: ServiceProvider) => (
                <div
                  key={provider._id}
                  className="overflow-hidden border rounded-lg shadow-lg bg-base-200 border-base-300"
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row">
                      {/* Profile section */}
                      <div className="flex items-start md:w-1/3">
                        <div
                          className="relative w-20 h-20 overflow-hidden rounded-lg cursor-pointer"
                          onClick={() =>
                            handleImagePreview(provider.profileImage)
                          }
                        >
                          <img
                            src={provider.profileImage}
                            alt={provider.serviceProviderName}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-0 hover:bg-opacity-20">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-white opacity-0 hover:opacity-100"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">
                            {provider.serviceProviderName}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                provider.isVerified === "verified"
                                  ? "bg-success/20 text-success"
                                  : provider.isVerified === "rejected"
                                    ? "bg-error/20 text-error"
                                    : "bg-warning/20 text-warning"
                              }`}
                            >
                              {provider.isVerified === "verified"
                                ? "Verified"
                                : provider.isVerified === "rejected"
                                  ? "Rejected"
                                  : "Pending"}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                              {provider.experience} Years Exp
                            </span>
                          </div>
                          <p className="mt-1 text-base-content/70">
                            {provider.location.address}
                          </p>
                        </div>
                      </div>

                      {/* Contact info */}
                      <div className="mt-4 md:mt-0 md:w-1/3">
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 mr-2 text-base-content/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            {provider.serviceProviderEmail}
                          </p>
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 mr-2 text-base-content/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {provider.serviceProviderPhone}
                          </p>
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 mr-2 text-base-content/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Joined: {formatDate(provider.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 mt-4 md:mt-0 md:w-1/3 md:items-end">
                        {provider.isVerified === "rejected" && (
                          <button
                            onClick={() => handleVerify(provider._id)}
                            className="px-4 py-2 transition rounded-md text-success-content bg-success hover:bg-success-focus"
                          >
                            Verify Provider
                          </button>
                        )}
                        {provider.isVerified === "pending" && (
                          <>
                            <button
                              onClick={() => handleVerify(provider._id)}
                              className="px-4 py-2 transition rounded-md text-success-content bg-success hover:bg-success-focus"
                            >
                              Verify Provider
                            </button>
                            <button
                              onClick={() => openRejectModal(provider._id)}
                              className="px-4 py-2 transition rounded-md text-error-content bg-error hover:bg-error-focus"
                            >
                              Reject Application
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleToggleExpand(provider._id)}
                          className="px-4 py-2 transition rounded-md bg-base-300 hover:bg-base-300/80"
                        >
                          {expandedId === provider._id
                            ? "Hide Details"
                            : "View Details"}
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {expandedId === provider._id && (
                      <div className="pt-4 mt-6 border-t border-base-300">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                          {/* Services & Skills */}
                          <div>
                            <h4 className="mb-2 text-lg font-medium">
                              Services & Skills
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm text-base-content/70">
                                  Services:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {provider.services.map((service, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary"
                                    >
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-sm text-base-content/70">
                                  Skills:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {provider.skills.map((skill: any, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary"
                                    >
                                      {skill.name || JSON.stringify(skill)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <h4 className="mb-2 text-lg font-medium">
                              Description
                            </h4>
                            <p className="text-sm">
                              {provider.description ||
                                "No description provided."}
                            </p>
                          </div>

                          {/* Documents - Using the new DocumentViewer component */}
                          <div>
                            <h4 className="mb-2 text-lg font-medium">
                              Verification Documents
                            </h4>
                            <DocumentViewer
                              documents={provider.document}
                              onImagePreview={handleImagePreview}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ServiceProviderVerification;
