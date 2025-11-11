import { Link } from 'react-router-dom';
import NotFoundGif from '../../assets/images/404.gif';

const NotFound = () => {
  return (
    <Link to={'/'}>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-base-300 ">
        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <div className="relative mb-8 group">
            <img src={NotFoundGif} alt="Video Not Found" className="w-full max-w-2xl h-auto rounded-2xl shadow-2xl" />
          </div>

          <div className="relative mb-4">
            <h1 className="text-9xl font-black bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
              404
            </h1>
          </div>

          <a
            href="/"
            className="relative group px-12 py-4 bg-gradient-to-r from-primary to-accent text-primary-content font-bold text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-primary/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <p className="mt-8 text-sm text-base-content/60">Error Code: 404 | this url Not Available</p>
        </div>
      </div>
    </Link>
  );
};

export default NotFound;
