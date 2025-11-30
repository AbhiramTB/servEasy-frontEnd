import { useEffect, useState } from 'react';
import { IAd } from '../../../utils/types/IAd';
import LocationSearch from '../../User/Home1/location';
import { ILocation } from '../../../utils/types/ILocation';
import { LocateIcon } from 'lucide-react';
import { ICreateAdDTO } from '../../../utils/types/DTO/ICreateAdDTO';
import { HotToastError } from '../../../utils/notificationToast';

interface Props {
  ad: IAd | null;
  onClose: () => void;
  onSubmit: (data: ICreateAdDTO, id?: string) => void;
}

const mockServices = [
  { id: '6912e9c30048a5bae03d527e', name: 'AC Repair' },
  { id: '6912e9c30048a5bae03d527e', name: 'Electrician Service' },
  { id: '6912e9c30048a5bae03d527e', name: 'Plumbing' },
  { id: '6912e9c30048a5bae03d527e', name: 'Home Cleaning' },
];

const AdFormWithImage: React.FC<Props> = ({ ad, onClose, onSubmit }) => {
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [radiusKm, setRadiusKm] = useState(0);
  const [location, setLocation] = useState<ILocation | null>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [adData, setAdData] = useState<ICreateAdDTO>({
    caption: '',
    description: '',
    serviceId: '',
    startDate: '',
    endDate: '',
    targetLocation: null,
    radiusKm: null,
    image: null,
  });

  useEffect(() => {
    if (ad) {
      setCaption(ad.caption);
      setDescription(ad.description);
      setServiceId(ad.serviceId);
      setStartDate(ad.startDate || '');
      setEndDate(ad.endDate || '');
      setRadiusKm(ad.radiusKm || 0);
      setPreview(ad.image || null);

      if (ad.targetLocation?.coordinates) {
        setLocation({
          address: '',
          longitude: ad.targetLocation.coordinates[0],
          latitude: ad.targetLocation.coordinates[1],
        });
      }
    }
  }, [ad]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 Validation
    if (!caption.trim()) {
      HotToastError('Caption is missing');
      setAdData(prev => ({ ...prev, caption }));
      return;
    }

    if (!description.trim()) {
      HotToastError('Description is missing');
      setAdData(prev => ({ ...prev, description }));
      return;
    }

    if (!serviceId) {
      HotToastError('Service is required');
      setAdData(prev => ({ ...prev, serviceId }));
      return;
    }

    const payload: ICreateAdDTO = {
      caption,
      description,
      serviceId,
      startDate,
      endDate,
      targetLocation: location
        ? {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
            address: location.address,
          }
        : null,
      radiusKm: radiusKm || 0,
      image: imageBase64 || null,
    };

    setAdData(payload);

    onSubmit(payload, ad?._id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">{ad ? 'Edit Advertisement' : 'Create Advertisement'}</h3>

      <div>
        <label className="label-text font-medium">Caption</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter ad caption"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label-text font-medium">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Enter ad description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label-text font-medium">Service</label>
        <select
          className="select select-bordered w-full"
          value={serviceId}
          onChange={e => setServiceId(e.target.value)}
          required
        >
          <option value="">Select Service</option>
          {mockServices.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} ({service.id})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label-text font-medium">Start Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label-text font-medium">End Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="label-text font-medium">Location</label>
        <LocationSearch onLocationSelect={setLocation} />

        {location && (
          <div className="text-xs text-gray-500 mt-1">
            <LocateIcon /> {location.address || `${location.latitude}, ${location.longitude}`}
          </div>
        )}
      </div>

      <div>
        <label className="label-text font-medium">Radius (KM)</label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Example: 10"
          value={radiusKm}
          onChange={e => setRadiusKm(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="label-text font-medium">Advertisement Image</label>
        <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImage} />
      </div>

      {/* Preview */}
      {preview && <img src={preview} className="w-full h-auto object-contain rounded-lg bg-black" />}
      {/* {preview && <ImagePreview src={preview} className="w-full h-auto object-contain rounded-lg bg-black" />} */}

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Ad
        </button>
      </div>
    </form>
  );
};

export default AdFormWithImage;
