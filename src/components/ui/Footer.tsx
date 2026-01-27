import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-6 py-10 mt-10 bg-base-200 text-base-content">
      <div className="grid max-w-screen-xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary">ServEase</h2>
          <p className="mt-2 text-sm">
            Your trusted platform to find skilled service providers near you.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-primary"><Facebook size={20} /></a>
            <a href="#" className="hover:text-primary"><Twitter size={20} /></a>
            <a href="#" className="hover:text-primary"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h4 className="mb-2 font-semibold">Explore ServEase</h4>
          <ul className="space-y-1 text-sm">
            <li>✔️ Our Mission: Empower local service providers</li>
            <li>🛠️ Top Services: Plumbing, AC Repair, Cleaning</li>
            <li>⚡ Trusted by 10K+ users across India</li>
          </ul>
        </div>

        {/* Contact & App Info Section */}
      <div>
  <h4 className="mb-2 font-semibold">Get in Touch</h4>
  <ul className="space-y-2 text-sm">
    <li className="flex items-center gap-2">
      <MapPin size={16} /> Sulthan Bathery, Wayanad, Kerala
    </li>
    <li className="flex items-center gap-2">
      <Phone size={16} /> +91 8590876697
    </li>
    <li className="flex items-center gap-2">
      <Linkedin size={16} />
      <a
        href="https://www.linkedin.com/in/abhiram-tb/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary"
      >
        abhiram tb
      </a>
    </li>
    <li className="flex items-center gap-2">
      <Globe size={16} />
      <a
        href="https://abhiramtb.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary"
      >
        abhiramtb.online
      </a>
    </li>
  </ul>
</div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-6 mt-10 text-sm text-center border-t border-base-300">
        <p>
          &copy; {new Date().getFullYear()} ServEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
