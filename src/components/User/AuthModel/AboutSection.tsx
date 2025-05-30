import { FaLinkedin } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="relative z-10 flex items-center justify-center max-w-6xl min-h-screen px-4 py-20 mx-auto">
      <div className="text-center">
        <h3 className="mb-4 text-4xl font-extrabold text-white">
          About ServEasy
        </h3>
        <p className="max-w-3xl mx-auto mb-6 text-lg leading-relaxed text-gray-300">
          ServEasy helps you find trusted service providers near your location
          effortlessly. Whether you're looking for a plumber, electrician,
          cleaner, or any professional, ServEasy connects you instantly.
        </p>
        <img
          className="w-full max-w-2xl mx-auto mt-4 shadow-2xl rounded-xl"
          src="/aboutServEasy.png"
          alt="About ServEasy"
        />
      </div>

      <div className="absolute right-0 p-4 bottom-20">
        <div className="flex flex-col items-center w-full max-w-xs p-4 text-center transition-all border shadow-lg border-white/10 bg-base/10 backdrop-blur-md rounded-xl hover:shadow-2xl">
          <div className="avatar">
            <div className="w-24 rounded">
              <img
                className="w-16 h-16 mb-3"
                src="/about-developer.png"
                alt="Abhiram TB"
              />{" "}
            </div>
          </div>

          <h4 className="text-base font-semibold text-white">Abhiram TB</h4>
          <span className="px-2 py-0.5 mt-1 text-xs text-blue-400 border rounded-full border-blue-500/50">
            Developer
          </span>
          <a
            href="//www.linkedin.com/in/abhiram-tb-138a332ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mt-3 text-blue-400 hover:text-blue-500"
          >
            <FaLinkedin className="mr-1 text-lg" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
