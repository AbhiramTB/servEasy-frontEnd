import { useState } from 'react';
import { adminPostRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';

const FooterBannerForm = ({ close ,fetchData}: { close: () => void,fetchData:()=>void }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isActive, setIsActive] = useState(false);
 const [isLoading,setLoading]=useState(false)
  const validateForm = () => {
    let isValid = true;

    if (!image) {
      HotToastError('Image is required.');
      isValid = false;
       setLoading(false)
    }
    if (title.trim().length < 5) {
      HotToastError('Title must be at least 5 characters.');
      isValid = false;
       setLoading(false)
    }
    if (subtitle.trim().length < 4) {
      HotToastError('Subtitle must be at least 4 characters.');
      isValid = false;
       setLoading(false)
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
    setLoading(true)
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
        fetchData()
        close();
      }
    } catch (err) {
      HotToastError('Failed to add footer banner');
      console.error(err);
    }finally{
        setLoading(false)
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


 {isLoading&&
      <button className="w-full mt-4 btn btn-primary" >
        <span className="loading loading-bars loading-xs"></span>

      </button>
      
      }



     {!isLoading && 
      <button className="btn btn-accent" onClick={handleAddFooterBanner}>
        Upload Footer Banner
      </button>
     }
    </div>
  );
};

export default FooterBannerForm;
