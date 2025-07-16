import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { apiEndPoint } from '../../../utils/constant';
import ThemePicker from '../../admin/siteSettings/themePicker';
import MiniDashboardPreview from '../../admin/siteSettings/MiniDashboardPreview';
import LoadingSpinner from '../../ui/LoadingSpinner';

const Appearance = () => {
  const [themes, setThemes] = useState<string[] | []>([]);
  useEffect(() => {
    getThemes();
  }, []);

  const getThemes = async () => {
    const res = await getRequest(apiEndPoint.getThemes);
    console.log(res.data.themes);
    if (res.status === 200) {
      setThemes(res.data.themes);
    }
  };

if (themes.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-center">Select Your Theme</h1>

      <div className="flex">
        <div className="w-1/2">
          <ThemePicker themes={themes} />
        </div>
        <div className="w-1/2 mx-auto">
          <MiniDashboardPreview />
        </div>
      </div>
    </div>
  );
};

export default Appearance;
