import { useEffect, useState } from 'react';
import HomeBannerForm from './HomeBannerForm';
import { adminGetRequest, adminDeleteRequest, adminPutRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import BannerCarousel, { IFooterBanner } from './FooterBannerList';
import MiniDashboardPreview from './MiniDashboardPreview';
import ThemePicker from './themePicker';
import ThemeForm from './ThemeForm';
const SiteSettingsPage = () => {
  const [homeBanners, setHomeBanners] = useState<IFooterBanner[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [addHomeBanner, setHomeBanner] = useState<boolean>(false);
  const [addTheme, setAddTheme] = useState<boolean>(false);
  useEffect(() => {
    getSiteSettingsData();
  }, []);

  const getSiteSettingsData = async () => {
    try {
      const res = await adminGetRequest(apiEndPointAdmin.getSiteSettings);
      if (res.status === 200) {
        setHomeBanners(res.data.homeBanners);
        setThemes(res.data.themes);
      }
    } catch (error) {
      console.error('Failed to fetch site settings:', error);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      await adminDeleteRequest(`${apiEndPointAdmin.deleteSiteSettings}/${id}`);

      setHomeBanners(prev => prev.filter(b => b._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleMarkDefault = async (id: string) => {
    try {
<<<<<<< HEAD
      await adminPutRequest(`${apiEndPointAdmin.makeActiveSiteSettings}`, { type: 'home', id });
=======
      await adminPutRequest(`${apiEndPointAdmin.makeActiveSiteSettings}`, { type: 'makeActiveHomeBanner', id });
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6

      setHomeBanners(prev => prev.map(b => ({ ...b, isActive: b._id === id })));
    } catch (error) {
      console.error('Mark default failed:', error);
    }
  };
  return (
    <div className="p-6 bg-slate-black">
      <h1 className="mb-4 text-2xl font-bold">Site Settings</h1>

<<<<<<< HEAD
      <div className="flex gap-x-6">
=======
      <div className=" gap-x-6">
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        {/* Home Banners Section */}
        <div className="border p1">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Home Banners</h2>
            <button className="btn btn-sm btn-primary" onClick={() => setHomeBanner(prev => !prev)}>
              {addHomeBanner ? 'Close Form' : 'Add Home Banner'}
            </button>
          </div>

          {addHomeBanner && (
            <HomeBannerForm
              close={() => setHomeBanner(false)}
              fetchData={() => {
                getSiteSettingsData();
              }}
            />
          )}

          <BannerCarousel
            banners={homeBanners}
            onDelete={(id: string) => handleDeleteBanner(id)}
            onMarkDefault={(id: string) => handleMarkDefault(id)}
          />
        </div>

        {/* Footer Banners Section */}
        {/* <div className="w-1/2 border ">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Footer Banners</h2>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setFooterBanner(prev => !prev)}
          >
            {addFooterBanner ? 'Close Form' : 'Add Footer Banner'}
          </button>
        </div>

        {addFooterBanner && <FooterBannerForm close={() => setFooterBanner(false)}   fetchData={()=>{getSiteSettingsData()}} />}

        <BannerCarousel
          banners={footerBanners}
          onDelete={(id: string) => handleDeleteBanner(id, 'footer')}
          onMarkDefault={(id: string) => handleMarkDefault(id, 'makeActiveFooterBanner')}
        />
      </div> */}
      </div>
      <div className="mt-2 light ">
        <h1 className="text-3xl font-bold text-center">themes</h1>
        <button className="btn btn-sm btn-primary" onClick={() => setAddTheme(prev => !prev)}>
          {addTheme ? 'Close Form' : 'Add Theme'}
        </button>
        {addTheme && (
          <ThemeForm
            fetchData={() => {
              getSiteSettingsData();
            }}
          />
        )}
        <ThemePicker themes={themes} />
        <MiniDashboardPreview />
      </div>
    </div>
  );
};

export default SiteSettingsPage;
