interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;

  backgroundType: 'video' | 'image';
  backgroundSrc: string;

  overlayOpacity?: number;
  heightClass?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundType,
  backgroundSrc,
  overlayOpacity = 0.5,
  heightClass = 'h-[70vh]',
}) => {
  return (
    <div className={`relative ${heightClass} mt-16`}>
      <div className="absolute inset-0 overflow-hidden">
        {backgroundType === 'video' ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        ) : (
          <img src={backgroundSrc} alt="Hero Background" className="w-full h-full object-cover" />
        )}

        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full pt-32 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-3xl lg:text-5xl font-bold text-center mb-3">{title}</h1>

        <p className="text-base lg:text-xl text-center mb-6 max-w-2xl opacity-90">{subtitle}</p>

        <a href={ctaHref} className="btn btn-primary btn-lg text-white">
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
