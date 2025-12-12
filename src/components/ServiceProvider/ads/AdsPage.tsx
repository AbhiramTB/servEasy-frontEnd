import { useState } from 'react';
import { IAd } from '../../../utils/types/IAd';
import AdModal from './AdModal';
import AdCard from './AdCard';
import { HotToastSuccess } from '../../../utils/notificationToast';
import { getRequest, patchRequest, postRequest, putRequest } from '../../../utils/makeRequestInstance';
import { ICreateAdDTO } from '../../../utils/types/DTO/ICreateAdDTO';
import { IAdStatus } from '../../../utils/types/IAdminAd';
import Pagination from '../../ui/Pagination';

const AdsPage = () => {
  const [ads, setAds] = useState<IAd[] | []>([]);

  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<IAd | null>(null);
  const [loading, setLoading] = useState(false);
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const dataLimit = 1;
  const fetchAds = async (page: number) => {
    try {
      setLoading(true);
      const res = await getRequest(
        `service-providers/ads/provider/6912e29c0048a5bae03d4fc8/?page=${page}&limit=${dataLimit}`
      );
      setCrrPage(page);
      setTotalData(res.data.count);
      if (res.data?.ads.length > 0) {
        setAds(res.data.ads);
      }
    } catch (error) {
      console.error('Fetch ads failed, using mock data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    HotToastSuccess('done');
    dataLimit;
    setEditAd(null);
    setOpen(true);
  };

  const handleEdit = (ad: IAd) => {
    HotToastSuccess('Edit');

    setEditAd(ad);
    setOpen(true);
  };

  const handleBlockUnblock = async (id: string, status: IAdStatus) => {
    try {
      const res = await patchRequest(`/service-providers/ads/${id}/`, { status });
      if (res.status == 200) {
        setAds(ads.map(a => (a._id == id ? { ...a, status } : a)));
        const label = status === 'inactive' ? 'blocked' : 'activated';
        HotToastSuccess(`Ad ${label} successfully`);
      }
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
      fetchAds(crrPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
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
          <AdCard key={ad._id} ad={ad} onEdit={handleEdit} onActiveInactive={handleBlockUnblock} />
        ))}
      </div>

      <AdModal open={open} onClose={() => setOpen(false)} ad={editAd} onSubmit={handleSubmit} />
      <Pagination
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => fetchAds(p)}
      />
    </div>
  );
};

export default AdsPage;
