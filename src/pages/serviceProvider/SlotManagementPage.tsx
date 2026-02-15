import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ServiceSlotCard from '../../components/ServiceProvider/SlotManagement/ServiceSlotCard';
import { deleteRequest, getRequest, postRequest } from '../../utils/makeRequestInstance';
import { HotToastSuccess } from '../../utils/notificationToast';

export interface ISlot {
  _id: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  booked: boolean;
  createdAt?: Date;
}

export interface IService {
  _id: string;
  serviceName: string;
  description: string;
  serviceImage: string;
  slots: ISlot[];
}

const SlotPage = () => {
  const [service, setService] = useState<IService | null>(null);
  const { serviceId } = useParams<{ serviceId: string }>();

  useEffect(() => {
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const fetchService = async () => {
    const res = await getRequest(`/service/online-services/with-slots/${serviceId}`);

    if (res.status === 200) {
      setService(res.data[0]);
    } else {
      console.error('Error fetching service with slots', res);
    }
  };

  const handleCreateSlot = async (startTime: Date, endTime: Date) => {
    if (!service) return;

    const res = await postRequest('/service/slots', {
      serviceId: service._id,
      startTime,
      endTime,
      booked: false,
    });

    if (res.status === 201) {
      HotToastSuccess('Slot created successfully');

      fetchService();
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!service) return;

    const res = await deleteRequest(`/service/slots/${slotId}`);

    if (res.status === 200) {
      HotToastSuccess('Slot deleted successfully');

      setService(prev =>
        prev
          ? {
              ...prev,
              slots: prev.slots.filter(slot => slot._id !== slotId),
            }
          : prev
      );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Slot Management</h1>
        <p className="mt-1 text-sm text-gray-600">Manage slots for this service</p>
      </div>

      <div className="px-4 pb-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {!service ? (
          <div className="flex items-center justify-center h-64 text-gray-500">Loading service...</div>
        ) : (
          <ServiceSlotCard service={service} onCreateSlot={handleCreateSlot} onDeleteSlot={handleDeleteSlot} />
        )}
      </div>
    </div>
  );
};

export default SlotPage;
