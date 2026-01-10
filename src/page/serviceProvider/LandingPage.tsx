import Footer from '../../components/ui/Footer';
import Navbar from '../../components/ui/landing/Navbar';
import FinalCTA from '../../components/ui/landing/FinalCTA';
import HeroSection from '../../components/ui/landing/HeroSection';
import HowItWorks from '../../components/ui/landing/HowItWorks';
import ProblemsWeSolve from '../../components/ui/landing/ProblemsWeSolve';
import WhyRegister from '../../components/ui/landing/WhyRegister';
import { ROUTES } from '../../utils/constants/routes';

const ServiceProviderLanding = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection
        title="Turn Your Skills Into Steady Work"
        subtitle="Get discovered by nearby customers, manage jobs effortlessly, and grow your service business with ServEase."
        ctaText="BECOME A SERVICE PROVIDER"
        ctaHref={ROUTES.SERVICEPROVIDER.REGISTER}
        backgroundType="video"
        backgroundSrc="videos/providerVideos/video1.mp4"
        overlayOpacity={0.4}
      />
      <HowItWorks />
      <ProblemsWeSolve />
      <WhyRegister />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default ServiceProviderLanding;
