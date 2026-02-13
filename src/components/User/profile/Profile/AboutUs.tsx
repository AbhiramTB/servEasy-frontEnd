const AboutUs = () => {
  return (
    <div className="max-w-4xl px-6 py-12 mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-center text-primary">
        About ServEasy
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-center ">
        ServEasy is your one-stop solution to find trusted local service pviders
        quickly and easily. Whether you need plumbing, cleaning, electrical
        work, or other home services, ServEasy connects you with professionals
        in your area — all at your fingertips.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-secondary">
          Why Choose ServEasy?
        </h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            Real-time communication and calling options with service providers
            to stay updated
          </li>
          <li>
            All service providers are thoroughly verified by our admin team
          </li>
          <li>Easy booking and real-time service tracking</li>
          <li>Flexible scheduling that fits your timetable</li>
          <li>Secure payment options and transparent pricing</li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="mb-4 text-2xl font-semibold text-secondary">
          Contact Info
        </h2>
        <p className="mb-2 ">
          For any queries or feedback, feel free to reach out:
        </p>
        <p className="text-blue-600 underline">
          <a
            href="https://www.linkedin.com/in/abhiram-tb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abhiram TB on LinkedIn
          </a>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
