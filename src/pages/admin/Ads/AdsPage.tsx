import { useEffect, useState } from 'react';
import { HotToastSuccess } from '../../../utils/notificationToast';
import { adminGetRequest, adminPatchRequest } from '../../../utils/AxiosAdmin';
import AdCard from '../../../components/ServiceProvider/ads/AdCard';
import { IAdminAd, IAdStatus } from '../../../utils/types/IAdminAd';
import Pagination from '../../../utils/ui/pagination';

const AdsPage = () => {
  const [ads, setAds] = useState<IAdminAd[] | []>([]);
  const dataLimit = 3;

  const [loading, setLoading] = useState(false);
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    fetchAds(crrPage, dataLimit);
  }, []);

  const fetchAds = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const { data } = await adminGetRequest(`/admin/ads?page=${page}&limit=${limit}`);
      setCrrPage(page);
      if (data.ads?.length) {
        setAds(data.ads);
      }
      if (data.count) {
        setTotalData(data.count);
      }
    } catch (error) {
      console.error('Fetch ads failed, using mock data');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (id: string, status: IAdStatus) => {
    try {
      const res = await adminPatchRequest(`/admin/ads/${id}/`, { status });
      if (res.status == 200) {
        setAds(ads.map(a => (a._id == id ? { ...a, status } : a)));
        const label = status === 'inactive' ? 'blocked' : 'activated';
        HotToastSuccess(`Ad ${label} successfully`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold"> All Ads</h1>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading ads...</p>}

      {!loading && ads.length === 0 && <div className="text-center text-gray-400 mt-10">No ads created yet</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ads.map(ad => (
          <AdCard key={ad._id} ad={ad as IAdminAd} onActiveInactive={handleBlockUnblock} />
        ))}
      </div>

      <Pagination
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => fetchAds(p, dataLimit)}
      />
    </div>
  );
};

export default AdsPage;
