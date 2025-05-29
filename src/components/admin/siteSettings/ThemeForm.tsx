import { useState } from 'react';
import { adminPostRequest } from '../../../utils/AxiosAdmin';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { apiEndPointAdmin } from '../../../utils/constant';

const ThemeForm = () => {
  const [themeName, setThemeName] = useState('');

  const handleAddTheme = async () => {
    if (!themeName.trim()) {
   HotToastError('Theme name is required');
      return;
    }
   
    try {
      const res= await adminPostRequest(apiEndPointAdmin.addsiteSettings,{ type: 'addTheme', name: themeName, isActive: false });
    if(res.status === 201) {
      HotToastSuccess('Theme added successfully!'); 
      return;
    }
      setThemeName('');
    } catch (err) {
      HotToastError('Failed to add theme');
    }
  };

  return (
    <div className="p-4 shadow-xl card bg-base-100">
      <h2 className="mb-2 text-xl font-bold">Add Theme</h2>
      <input
        type="text"
        placeholder="Theme name"
        className="w-full mb-2 input input-bordered"
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
      />
      <button className="btn btn-secondary" onClick={handleAddTheme}>
        Add Theme
      </button>
    </div>
  );
};

export default ThemeForm;
