const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-base-300 bg-base-100">
 

      <h1 className="mb-2 text-4xl font-bold text-primary">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-accent">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <a
        href="/"
        className="px-6 py-2 transition rounded-lg bg-primary hover:bg-primary-focus"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
    