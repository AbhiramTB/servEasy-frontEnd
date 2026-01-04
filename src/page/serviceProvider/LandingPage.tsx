import Footer from '../../components/ui/Footer';
import Navbar from '../../components/landing/Navbar';
import FinalCTA from '../../components/landing/FinalCTA';
import HeroSection from '../../components/landing/HeroSection';
import HowItWorks from '../../components/landing/HowItWorks';
import ProblemsWeSolve from '../../components/landing/ProblemsWeSolve';
import WhyRegister from '../../components/landing/WhyRegister';

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
