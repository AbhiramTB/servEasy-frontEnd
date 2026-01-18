import { ICreateAdDTO } from '../../../utils/types/DTO/ICreateAdDTO';
import { IAd } from '../../../utils/types/IAd';
import AdFormWithImage from './AdFormWithImage';

interface Props {
  open: boolean;
  onClose: () => void;
  ad: IAd | null;
  onSubmit: (formData: ICreateAdDTO, id?: string) => void;
}

const AdModal: React.FC<Props> = ({ open, onClose, ad, onSubmit }) => {
  if (!open) return null;

  return (
    <div className="modal modal-open bg-black/40">
      <div className="modal-box max-w-2xl">
        <AdFormWithImage ad={ad} onClose={onClose} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AdModal;
