import Footer from '../../Footer';
import FinalCTA from '../FinalCTA';
import HeroSection from '../HeroSection';
import HowItWorks from '../HowItWorks';
import ProblemsWeSolve from '../ProblemsWeSolve';
import WhyRegister from '../WhyRegister';
import { ROUTES } from '../../../../utils/constants/routes';
import LandingNavbar from '../LandingNavbar';
import { useNavigate } from 'react-router-dom';

const ServiceProviderLanding = () => {
  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Solutions', href: '#problems' },
    { label: 'Why Us', href: '#why-us' },
    { label: ' Register Now', href: '#register' },
    { label: 'Back to home', href: '/home' },
  ];
  const navigate = useNavigate();
  const navigateFn = () => {
    navigate(ROUTES.SERVICEPROVIDER.REGISTER);
  };

  return (
    <div className="min-h-screen">
      <LandingNavbar links={navLinks} loginFunction={() => navigateFn()} loginText="become-a-service-provider" />
      <HeroSection
        title="Turn Your Skills Into Steady Work"
        subtitle="Get discovered by nearby customers, manage jobs effortlessly, and grow your service business with ServEase."
        ctaText="BECOME A SERVICE PROVIDER"
        ctaHref={ROUTES.SERVICEPROVIDER.REGISTER}
        backgroundType="video"
        backgroundSrc="/videos/providerVideos/video1.mp4"
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
