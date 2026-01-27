import React from 'react';
import { Link } from 'react-router-dom';

interface AppLogoProps {
  to?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ to }) => {
  const Content = (
    <>
      <div className="font-serif text-2xl font-bold">
        <span>Serv</span>
        <span className="text-primary">Easy</span>
      </div>
      <span className="text-xs mt-[-15px] text-slate-500">Find your nearby services</span>
    </>
  );

  return (
    <div className="flex flex-col items-center">
      {to ? (
        <Link to={to} className="text-center">
          {Content}
        </Link>
      ) : (
        <div className="text-center">{Content}</div>
      )}
    </div>
  );
};

export default AppLogo;
