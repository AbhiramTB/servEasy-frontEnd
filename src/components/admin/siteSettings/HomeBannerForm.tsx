import { useState } from 'react';
import { adminPostRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';

const HomeBannerForm = ({ close }: { close: () => void }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [errors, setErrors] = useState<{ title?: string; subtitle?: string; image?: string }>({});



const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};



  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!image) newErrors.image = 'Image is required.';
    if (title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters.';
    if (subtitle.trim().length < 4) newErrors.subtitle = 'Subtitle must be at least 4 characters.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBanner = async () => {
    if (!validateForm()) return;

  if( !image) {
    HotToastError('Please select an image');   
    return     
  
}

const imageBase64 = await fileToBase64(image);
    try {

        console.log({type:"addBanner",image:imageBase64,title,subtitle,isActive:false});
        console.log(imageBase64);
      const res = await adminPostRequest(apiEndPointAdmin.addsiteSettings, {type:"addBanner",image:imageBase64,title,subtitle,isActive:false});
        console.log(res)
      if (res.status === 201) {
        HotToastSuccess('Home banner added successfully!');
        setImage(null);
        setTitle('');
        setSubtitle('');
        setErrors({});
        close();
      }
    } catch (err) {
      alert('Failed to add home banner');
    }
  };

  return (
    <div className="p-6 space-y-4 shadow-xl card bg-base-100">
      <h2 className="text-xl font-bold">Add Home Banner</h2>

      <div>
        <label className="label">Banner Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full file-input file-input-bordered"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
      </div>

      <div>
        <label className="label">Title</label>
        <input
          type="text"
          className="w-full input input-bordered"
          placeholder="Enter banner title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="label">Subtitle</label>
        <input
          type="text"
          className="w-full input input-bordered"
          placeholder="Enter subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        {errors.subtitle && <p className="mt-1 text-sm text-red-500">{errors.subtitle}</p>}
      </div>
 
       <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…JRWgguhzitBBBAC0doIIArRFyNBAIcUkuQQTBJKCCCQf/2Q==" alt="" />

      <button className="w-full mt-4 btn btn-primary" onClick={handleAddBanner}>
        Upload Banner
      </button>
    </div>
  );
};

export default HomeBannerForm;
