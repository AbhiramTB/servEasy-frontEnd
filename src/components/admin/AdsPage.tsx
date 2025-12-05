import { useEffect, useState } from 'react';
import { IAd } from '../../utils/types/IAd';
import { HotToastSuccess } from '../../utils/notificationToast';
import { ICreateAdDTO } from '../../utils/types/DTO/ICreateAdDTO';
import { adminPostRequest, adminPutRequest } from '../../utils/AxiosAdmin';
import { getRequest } from '../../utils/makeRequestInstance';
import AdCard from '../ServiceProvider/ads/AdCard';
import AdModal from '../ServiceProvider/ads/AdModal';
import axios from 'axios';
import { IAdminAd } from '../../utils/types/IAdminAd';

const AdsPage = () => {
  const adsMock = [
    {
      _id: '692c1d0f3f8ab198ae8358f1',
      serviceId: '6912e9c30048a5bae03d527e',
      providerId: '6912e29c0048a5bae03d4fc8',

      serviceProviderName: 'Rahul',
      profileImage:
        'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1762845338/servEasy-serviceProviderProfiles/servEasy-serviceProviderProfilesd5e02a73-8fa5-4f9c-9ab5-e823e06c2919.png',

      caption: 'Plumbing Service Offer',
      description: 'Best plumbing services with fast response.',

      image:
        'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1764499028/servEasy-adImages/servEasy-adImages7da6a43d-3c47-45f2-a93c-c2917abb85f5.jpg',
      targetLocation: {
        address: 'sulthanBathery',
        latitude: 76.32799237,
        longitude: 11.72639615,
      },

      radiusKm: 100,
      startDate: '2025-11-23T00:00:00.000Z',
      endDate: '2025-12-16T00:00:00.000Z',

      views: 0,
      clicks: 0,
      status: 'active',
      createdAt: '2025-11-30T10:31:43.301Z',
      updatedAt: '2025-11-30T10:31:43.301Z',
    },

    {
      _id: '692c1d0f3f8ab198ae8358f2',
      serviceId: '6912e9c30048a5bae03d527e',
      providerId: '6912e29c0048a5bae03d4fc8',

      serviceProviderName: 'Rahul',
      profileImage:
        'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1762845338/servEasy-serviceProviderProfiles/servEasy-serviceProviderProfilesd5e02a73-8fa5-4f9c-9ab5-e823e06c2919.png',

      caption: 'Electrician Service Discount',
      description: 'Reliable electrician service for home and office.',

      image:
        'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1764498702/servEasy-adImages/servEasy-adImages9b147272-317b-4d36-b9ce-72c0b5748f61.jpg',

      targetLocation: {
        address: 'sulthanBathery',
        latitude: 76.32799237,
        longitude: 11.72639615,
      },

      radiusKm: 50,
      startDate: '2025-11-20T00:00:00.000Z',
      endDate: '2025-12-10T00:00:00.000Z',

      views: 10,
      clicks: 1,
      status: 'active',
      createdAt: '2025-11-28T10:31:43.301Z',
      updatedAt: '2025-11-28T10:31:43.301Z',
    },

    {
      _id: '692c1d0f3f8ab198ae8358f3',
      serviceId: '6912e9c30048a5bae03d527e',
      providerId: '6912e29c0048a5bae03d4fc8',

      serviceProviderName: 'Rahul',
      profileImage:
        'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1762845338/servEasy-serviceProviderProfiles/servEasy-serviceProviderProfilesd5e02a73-8fa5-4f9c-9ab5-e823e06c2919.png',

      caption: 'Home Cleaning Limited Offer',
      description: 'Professional home cleaning at affordable price.',

      image:
        'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1764498702/servEasy-adImages/servEasy-adImages9b147272-317b-4d36-b9ce-72c0b5748f61.jpg',

      targetLocation: {
        address: 'sulthanBathery',
        latitude: 76.32799237,
        longitude: 11.72639615,
      },

      radiusKm: 80,
      startDate: '2025-11-25T00:00:00.000Z',
      endDate: '2025-12-20T00:00:00.000Z',

      views: 5,
      clicks: 0,
      status: 'active',
      createdAt: '2025-11-29T10:31:43.301Z',
      updatedAt: '2025-11-29T10:31:43.301Z',
    },
  ];
  const [ads, setAds] = useState<IAdminAd[]>(adsMock);

  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<IAd | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await getRequest(`service-providers/ads/provider/6912e29c0048a5bae03d4fc8`);
      console.log(data);
      if (data?.length) {
        setAds(data);
      }
    } catch (error) {
      console.error('Fetch ads failed, using mock data');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchAds();
  // }, []);

  const handleEdit = (ad: any) => {
    console.log(ad);
    HotToastSuccess('Edit');

    setEditAd(ad);
    setOpen(true);
  };

  const handleDelete = async (id: string, action: string) => {
    try {
      await axios.delete(`service-providers/ads/${id}`);

      fetchAds();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (formData: ICreateAdDTO, id?: string) => {
    try {
      if (id) {
        HotToastSuccess('edited');
        console.log(formData);

        await adminPutRequest(`service-providers/ads/${id}`, formData);
      } else {
        HotToastSuccess('created');
        console.log(formData);
        await adminPostRequest(`service-providers/ads/`, { data: formData });
      }

      setOpen(false);
      fetchAds();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Ads</h1>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading ads...</p>}

      {!loading && ads.length === 0 && <div className="text-center text-gray-400 mt-10">No ads created yet</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ads.map(ad => (
          <AdCard key={ad._id} ad={ad} onEdit={handleEdit} onActiveInactive={handleDelete} />
        ))}
      </div>

      {/* Modal */}

      <AdModal open={open} onClose={() => setOpen(false)} ad={editAd} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdsPage;
