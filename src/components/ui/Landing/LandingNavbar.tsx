import React from 'react';
import { INavbarProps } from './userLanding/UserLandingPage';

const LandingNavbar: React.FC<INavbarProps> = ({
  links = [],
  brandName = 'ServEasy',
  loginFunction,
  loginText = 'Sign-in',
}) => {
  return (
    <div className="navbar bg-base-100 px-6 lg:px-10 sticky top-0 z-50 shadow-sm bg-hex-pattern">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <a className="text-2xl font-black text-primary tracking-tighter cursor-pointer">{brandName}</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          {links?.length > 0 &&
            links.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary btn-round px-8 " onClick={loginFunction}>
          {loginText}
        </button>
      </div>
    </div>
  );
};

export default LandingNavbar;
