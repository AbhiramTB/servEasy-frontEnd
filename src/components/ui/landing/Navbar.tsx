import { Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar bg-base-300 shadow-sm px-4 lg:px-8 fixed top-0 z-50">
      <div className="flex-1">
        <a className="text-2xl font-bold text-primary">ServEasy</a>
      </div>

      <div className="flex-none gap-4">
        <div className="hidden lg:flex gap-4 items-center">
          <a href="#how-it-works" className="btn btn-ghost">
            How It Works
          </a>
          <a href="#problems" className="btn btn-ghost">
            Solutions
          </a>
          <a href="#why-us" className="btn btn-ghost">
            Why Us
          </a>
          <a href="#register" className="btn btn-primary">
            Register Now
          </a>
        </div>

        <button className="btn btn-square btn-ghost lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
