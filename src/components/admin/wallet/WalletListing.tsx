import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants/routes';

const WalletListing = () => {
  interface IProviderWalletListing {
    _id:string,
    profileImage: string;
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: String;
    description: string;
    experience: string;
    wallet: { balance: number };
  }

  const [providerWalletListings, setWallet] = useState<IProviderWalletListing[] | []>([
    {  _id: '6842b93c7b8517522821206d',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      serviceProviderName: 'Arjun Kumar',
      serviceProviderEmail: 'arjun.kumar@example.com',
      serviceProviderPhone: '+91 9876543210',
      description: 'Experienced electrician specializing in home wiring and appliance repair.',
      experience: '5 years',
      wallet: { balance: 4500 },
    },
    {
        _id: '6842b93c7b85175228212026d',

      profileImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      serviceProviderName: 'Neha Sharma',
      serviceProviderEmail: 'neha.sharma@example.com',
      serviceProviderPhone: '+91 9123456780',
      description: 'Certified beautician offering home salon services.',
      experience: '3 years',
      wallet: { balance: 2750 },
    },
    {
        _id: '6842b93c7b8517522821206dd',

      profileImage: 'https://randomuser.me/api/portraits/men/76.jpg',
      serviceProviderName: 'Ramesh Singh',
      serviceProviderEmail: 'ramesh.singh@example.com',
      serviceProviderPhone: '+91 9988776655',
      description: 'Professional plumber handling residential and commercial projects.',
      experience: '8 years',
      wallet: { balance: 6100 },
    },
  ]);
  return (
<div className="flex flex-wrap justify-center gap-4 p-4">
      {providerWalletListings.length &&
        providerWalletListings.map((providerData: IProviderWalletListing) => {
          return (
            <div className='p-5 m-5 border cursor-pointer lg:w-1/4 md:w-full border-primary/10 bg-base-300' key={providerData._id}>
                          <Link to={ROUTES.ADMIN.SERVICE_PROVIDER_WALLET_DETAIL(providerData._id)} > 

              <div className="flex items-center flex-1 gap-6">
                <img
                  src={providerData.profileImage}
                  alt="Profile"
                  className="object-cover w-24 h-24 border rounded-full"
                />
                <div className='p-2'>
                  <h3 className="text-xl font-semibold text-primary">{providerData.serviceProviderName}</h3>
                  <p className="text-md text-base-content">{providerData.serviceProviderEmail}</p>
                      

                  <p className="mt-2 text-[11px] text-base-content/70">
                    {providerData.description}
                    <br />
                    Experience: {providerData.experience} yrs
                  </p>
                </div>
              </div>

              {/* Wallet Balance */}
              <div className="text-sm bg-base-200 p-4 rounded-md border border-base-300 w-full lg:w-[200px] text-center">
                <p className="text-2xl font-bold text-success">₹{providerData.wallet.balance}</p>
                <p className="text-sm text-base-content/70">Wallet Balance</p>
              </div>
                          </Link>

            </div>
          );
        })}


      
    </div>
  );
};

export default WalletListing;
