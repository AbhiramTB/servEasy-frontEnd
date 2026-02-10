import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { apiEndPoint } from '../../../utils/constant';
import ThemePicker from '../../../components/admin/siteSettings/themePicker';
import MiniDashboardPreview from '../../../components/admin/siteSettings/MiniDashboardPreview';

const Appearance = () => {
  const [themes, setThemes] = useState<string[] | []>([]);

  useEffect(() => {
    getThemes();
  }, []);

  const getThemes = async () => {
    const res = await getRequest(apiEndPoint.getThemes);
    if (res.status === 200) {
      setThemes(res.data.themes);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto max-w-8xl md:max-w-full p-4 sm:p-6">
        <h1 className="mb-6 text-xl font-bold text-center sm:text-2xl">Select Your Theme</h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/2 overflow-hidden">
            <ThemePicker themes={themes} />
          </div>

          <div className="w-full lg:w-1/2 overflow-hidden">
            <MiniDashboardPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
