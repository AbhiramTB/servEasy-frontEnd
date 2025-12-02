import { useEffect, useState } from 'react';
import axios from 'axios';
import { IAd } from '../../../utils/types/IAd';
import AdModal from './AdModal';
import AdCard from './AdCard';
import { HotToastSuccess } from '../../../utils/notificationToast';
import { getRequest, postRequest, putRequest } from '../../../utils/makeRequestInstance';
import { ICreateAdDTO } from '../../../utils/types/DTO/ICreateAdDTO';

const AdsPage = () => {
  const [ads, setAds] = useState<IAd[] | []>([]);

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

  useEffect(() => {
    fetchAds();
  }, []);

  const handleCreate = () => {
    HotToastSuccess('done');
    setEditAd(null);
    setOpen(true);
  };

  const handleEdit = (ad: IAd) => {
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

        await putRequest(`service-providers/ads/${id}`, formData);
      } else {
        HotToastSuccess('created');
        console.log(formData);
        await postRequest(`service-providers/ads/`, { data: formData });
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
        <button className="btn btn-primary" onClick={handleCreate}>
          + Create Ad
        </button>
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
