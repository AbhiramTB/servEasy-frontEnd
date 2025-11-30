import { IAd } from '../../../utils/types/IAd';
import ImagePreview from '../../ui/ImagePreview';

interface Props {
  ad: IAd;
  onEdit: (ad: IAd) => void;
  onDelete: (id: string) => void;
}

const AdCard: React.FC<Props> = ({ ad, onEdit, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-md border">
      <figure>
        <ImagePreview src={ad.image || ''} className="w-full h-auto object-contain rounded-lg bg-black" />
      </figure>

      <div className="card-body p-4">
        <h2 className="font-semibold text-lg">{ad.caption}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{ad.description}</p>

        <div className="flex justify-between text-xs mt-2">
          <span className="badge badge-outline">{ad.planType}</span>
          <span className="badge badge-ghost">{ad.status}</span>
        </div>

        <div className="flex gap-2 mt-3">
          <button className="btn btn-sm btn-outline" onClick={() => onEdit(ad)}>
            Edit
          </button>
          <button className="btn btn-sm btn-error" onClick={() => onDelete(ad._id!)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
