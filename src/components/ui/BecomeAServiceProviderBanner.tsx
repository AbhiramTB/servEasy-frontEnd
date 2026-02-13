import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants/routes';

const BecomeAServiceProviderBanner = () => {
  return (
    <div className="w-full bg-accent/50">
      <section className="relative overflow-hidden px-6 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20">
          <div className="aspect-square h-64 rounded-full bg-primary"></div>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl md:text-5xl font-extrabold text-accent-content tracking-wider leading-tight">
              BECOME A <br className="hidden md:block" />
              <span className="text-primary">SERVICE PROVIDER</span>
            </h2>
            <p className="mt-4 text-base-300 text-lg md:text-xl max-w-lg">
              Unlock new opportunities and grow your client base by joining our industry-leading platform today.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Link to={ROUTES.SERVICEPROVIDER.ROOT}>
              <button className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl active:scale-95">
                Join Us Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeAServiceProviderBanner;
