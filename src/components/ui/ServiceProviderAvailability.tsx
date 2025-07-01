import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { getRequest } from '../../utils/makeRequestInstance';

interface Props {
  serviceProviderId: string;
}

interface AvailabilityResponse {
  availability: {
    available: boolean;
    reason?: string;
  };
}

const ServiceProviderAvailability: React.FC<Props> = ({ serviceProviderId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [availability, setAvailability] = useState<AvailabilityResponse['availability'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getRequest(`/service-providers/availability/${serviceProviderId}`);
        console.log(res);
        if (res.status === 200) {
          setAvailability(res.data.availability);
        } else {
          setError('Failed to fetch availability.');
        }
      } catch (err) {
        console.error('API error:', err);
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [serviceProviderId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <Loader2 className="animate-spin" />
        <span>Checking availability...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!availability) {
    return <div className="text-gray-500">No data found.</div>;
  }

  return (
    <div className="p-4 ">
      {availability.available ? (
        <div className="flex items-center gap-2 text-success">
          <CheckCircle2 />
          <span>Available for booking</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-primary">
          <XCircle />
          <span>{availability.reason}</span>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderAvailability;
