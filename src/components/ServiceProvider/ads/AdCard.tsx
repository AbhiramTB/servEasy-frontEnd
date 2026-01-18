import dayjs from 'dayjs';
import { IAd } from '../../../utils/types/IAd';
import { IAdminAd, IAdStatus } from '../../../utils/types/IAdminAd';
import ImagePreview from '../../ui/ImagePreview';
import { MapPin } from 'lucide-react';

interface Props {
  ad: IAd | IAdminAd;
  onEdit?: (ad: IAd) => void;
  onActiveInactive?: (id: string, action: IAdStatus) => void;
  onViewDetails?: (id: string) => void;
}

const AdCard: React.FC<Props> = ({ ad, onEdit, onActiveInactive, onViewDetails }) => {
  const isAdmin = 'serviceProviderName' in ad;

  const nextAction: IAdStatus = ad.status === 'active' ? 'inactive' : 'active';
  console.log('afd');
  console.log(ad);
  return (
    <div className="card bg-base-100 shadow-md border relative">
      {isAdmin && (
        <div className="absolute top-2 left-2 bg-white shadow px-2 py-1 rounded-lg flex items-center gap-2">
          <img src={ad.profileImage} alt="provider" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm font-semibold">{ad.serviceProviderName}</span>
        </div>
      )}

      <figure>
        <ImagePreview src={ad.image || ''} className="w-full h-auto object-contain rounded-lg bg-black" />
      </figure>

      <div className="card-body p-4">
        <h2 className="font-semibold text-lg">{ad.caption}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{ad.description}</p>

        <div className="flex justify-between text-xs mt-2">
          <span className="badge badge-ghost">{ad.status}</span>

          {ad.startDate && ad.endDate && (
            <span className="badge badge-outline">
              {dayjs(ad.startDate).format('DD/MM/YY')} ⇆ {dayjs(ad.endDate).format('DD/MM/YY')}
            </span>
          )}
        </div>

        {'targetLocation' in ad && ad.targetLocation?.address && (
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
            <MapPin size={14} /> {ad.targetLocation.address}
          </div>
        )}

        <div className="flex gap-2 mt-3 flex-wrap">
          {!isAdmin && onEdit && (
            <button className="btn btn-sm btn-outline" onClick={() => onEdit(ad)}>
              Edit
            </button>
          )}

          {ad.status !== 'expired' && onActiveInactive ? (
            <button
              className={` btn btn-sm ${nextAction == 'inactive' ? 'btn-error' : 'btn-success'}  `}
              onClick={() => onActiveInactive(ad._id!, nextAction)}
            >
              {nextAction}
            </button>
          ) : (
            <span className="badge badge-outline">Ad expired — renew your plan.</span>
          )}

          {isAdmin && onViewDetails && (
            <button className="btn btn-sm btn-primary" onClick={() => onViewDetails(ad._id)}>
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCard;
