import Footer from '../../components/ui/Footer';
import Navbar from '../../components/ui/landing/Navbar';
import FinalCTA from '../../components/ui/landing/FinalCTA';
import HeroSection from '../../components/ui/landing/HeroSection';
import HowItWorks from '../../components/ui/landing/HowItWorks';
import ProblemsWeSolve from '../../components/ui/landing/ProblemsWeSolve';
import WhyRegister from '../../components/ui/landing/WhyRegister';

const ServiceProviderLanding = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection
        title="Find Trusted Service Providers Near You"
        subtitle="Book reliable professionals for home services, repairs, and more — quickly and safely."
        ctaText="Find Services"
        ctaHref="/services"
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
