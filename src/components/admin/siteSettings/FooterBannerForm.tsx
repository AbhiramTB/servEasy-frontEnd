import { useState } from 'react';
import { adminPostRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';

const FooterBannerForm = ({ close }: { close?: () => void }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isActive, setIsActive] = useState(true);

  const validateForm = () => {
    let isValid = true;

    if (!image) {
      HotToastError('Image is required.');
      isValid = false;
    }
    if (title.trim().length < 5) {
      HotToastError('Title must be at least 5 characters.');
      isValid = false;
    }
    if (subtitle.trim().length < 4) {
      HotToastError('Subtitle must be at least 4 characters.');
      isValid = false;
    }

    return isValid;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAddFooterBanner = async () => {
    if (!validateForm()) return;
    if (!image) return;

    try {
      const imageBase64 = await fileToBase64(image);

      const payload = {
        type: 'addFooterBanner',
        image: imageBase64,
        title,
        subtitle,
        isActive,
      };

      const res = await adminPostRequest(apiEndPointAdmin.addsiteSettings, payload);

      if (res.status === 201) {
        HotToastSuccess('Footer banner added successfully!');
        setImage(null);
        setTitle('');
        setSubtitle('');
        if (close) close();
      }
    } catch (err) {
      HotToastError('Failed to add footer banner');
      console.error(err);
    }
  };

  return (
    <div className="p-4 shadow-xl card bg-base-100">
      <h2 className="mb-2 text-xl font-bold">Add Footer Banner</h2>
      <input
        type="file"
        accept="image/*"
        className="w-full mb-2 file-input file-input-bordered"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 input input-bordered"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subtitle"
        className="w-full mb-2 input input-bordered"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <div className="mb-2 form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Active</span>
          <input
            type="checkbox"
            className="toggle"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
      </div>
      <button className="btn btn-accent" onClick={handleAddFooterBanner}>
        Upload Footer Banner
      </button>
    </div>
  );
};

export default FooterBannerForm;
