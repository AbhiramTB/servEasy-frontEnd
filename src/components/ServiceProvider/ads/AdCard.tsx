import dayjs from 'dayjs';
import { IAd } from '../../../utils/types/IAd';
import ImagePreview from '../../ui/ImagePreview';
import { MapPin } from 'lucide-react';

interface Props {
  ad: IAd;
  onEdit: (ad: IAd) => void;
  onActiveInactive: (id: string, action: 'active' | 'block') => void;
}

const AdCard: React.FC<Props> = ({ ad, onEdit, onActiveInactive }) => {
  const nextAction: 'active' | 'block' = ad.status === 'active' ? 'block' : 'active';

  return (
    <div className="card bg-base-100 shadow-md border">
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

        {ad.targetLocation?.address && (
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
            <MapPin size={14} /> {ad.targetLocation.address}
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button className="btn btn-sm btn-outline" onClick={() => onEdit(ad)}>
            Edit
          </button>

          {ad.status !== 'expired' ? (
            <button className="btn btn-sm btn-error" onClick={() => onActiveInactive(ad._id!, nextAction)}>
              {nextAction}
            </button>
          ) : (
            <span className="badge badge-outline">Your ad expired. Please renew your plan.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCard;
