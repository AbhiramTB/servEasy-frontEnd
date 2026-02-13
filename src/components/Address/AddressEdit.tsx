import { useState } from 'react';
import { IAddress } from './IAddress';
import { HotToastError } from '../../utils/notificationToast';

interface AddressEditModalProps {
  address: Partial<IAddress>;
  onSave: (address: IAddress) => void;
  onCancel: () => void;
  isNew?: boolean;
}

export const AddressEditModal: React.FC<AddressEditModalProps> = ({ address, onSave, onCancel, isNew = false }) => {
  const [editedAddress, setEditedAddress] = useState<Partial<IAddress>>(address);

  const handleSave = () => {
    if (!editedAddress.name || !editedAddress.houseName || !editedAddress.pincode || !editedAddress.state) {
      alert('Please fill in required fields');
      return;
    }

    if (editedAddress.phone && !/^[6-9]\d{9}$/.test(editedAddress.phone)) {
      HotToastError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    console.log('edit address');
    console.log(address);
    onSave({
      ...editedAddress,
      _id: address._id,
    } as IAddress);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{isNew ? 'Add New Address' : 'Edit Address'}</h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name*"
            className="input input-bordered w-full"
            value={editedAddress.name || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                name: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="House Name*"
            className="input input-bordered w-full"
            value={editedAddress.houseName || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                houseName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Pincode*"
            className="input input-bordered w-full"
            value={editedAddress.pincode || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                pincode: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Landmark"
            className="input input-bordered w-full"
            value={editedAddress.landmark || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                landmark: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="State*"
            className="input input-bordered w-full"
            value={editedAddress.state || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                state: e.target.value,
              })
            }
            required
          />

          <input
            type="tel"
            placeholder="Contact Number (10 digits)"
            className="input input-bordered w-full"
            value={editedAddress.phone || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                phone: e.target.value,
              })
            }
            maxLength={10}
            pattern="[6-9]\d{9}"
          />

          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={editedAddress.description || ''}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};
