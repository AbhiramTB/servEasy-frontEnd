import { useEffect, useState } from 'react';
import { IAd } from '../../../utils/types/IAd';
import AdModal from './AdModal';
import AdCard from './AdCard';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { getRequest, patchRequest, postRequest, putRequest } from '../../../utils/makeRequestInstance';
import { ICreateAdDTO } from '../../../utils/types/DTO/ICreateAdDTO';
import { IAdStatus } from '../../../utils/types/IAdminAd';
import Pagination from '../../ui/Pagination';
import AdsCardSkelteon from '../../../Skeleton/AdsCardSkelteon';
import EmptyState from '../../ui/EmptyState';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
const AdsPage = () => {
  const [ads, setAds] = useState<IAd[] | []>([]);

  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<IAd | null>(null);
  const [loading, setLoading] = useState(false);
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const dataLimit = 3;
  const serviceProviderId = useSelector((state: RootState) => state.serviceProvider._id);
  const validateAdData = (data: ICreateAdDTO): boolean => {
    if (!data.caption?.trim()) {
      HotToastError('Caption is required');
      return false;
    }
    if (!data.description?.trim()) {
      HotToastError('Description is required');
      return false;
    }
    if (!data.serviceId) {
      HotToastError('Please select a service');
      return false;
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      HotToastError('Please provide valid start and end dates');
      return false;
    }
    if (start > end) {
      HotToastError('Start date cannot be after end date');
      return false;
    }

    if (data.image) {
      const sizeInBytes = data.image.length * 0.75;
      const twoMBInBytes = 2 * 1024 * 1024;

      if (sizeInBytes > twoMBInBytes) {
        HotToastError('Image size must be less than 2MB');
        return false;
      }
    }

    if (data.targetLocation && !data.radiusKm) {
      HotToastError('Please specify a radius for the target location');
      return false;
    }

    return true;
  };

  const fetchAds = async (page: number) => {
    try {
      setLoading(true);
      const res = await getRequest(
        `service-providers/ads/provider/${serviceProviderId}/?page=${page}&limit=${dataLimit}`
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
      if (!validateAdData(formData)) return;
      if (id) {
        if (formData.caption) if (formData.description) if (formData.radiusKm) HotToastSuccess('edited');

        await putRequest(`service-providers/ads/${id}`, formData);
      } else {
        HotToastSuccess('created');
        await postRequest(`service-providers/ads/`, { data: { ...formData, serviceProviderId } });
      }

      setOpen(false);
      fetchAds(crrPage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAds(0);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Ads</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Create Ad
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(dataLimit)
            .fill('')
            .map(() => (
              <AdsCardSkelteon />
            ))}
        </div>
      )}

      {!loading && ads.length === 0 && (
        <EmptyState icon="product-empty" message="No ads created yet" title="No ads created yet" />
      )}

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
