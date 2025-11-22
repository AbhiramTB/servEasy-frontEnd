import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants/routes';
import SubscriptionIcon from '../../../utils/ui/SubscriptionIcon';
import ImagePreview from '../../ui/ImagePreview';

interface Props {
  data: any;
}

const WalletCard = ({ data }: Props) => {
  return (
    <Link to={ROUTES.ADMIN.SERVICE_PROVIDER_WALLET_DETAIL(data._id)} className="block group">
      <div className="relative overflow-hidden transition-all border shadow-lg bg-base-200 hover:border-primary/30">
        <SubscriptionIcon isSubscribedProvider={data.isSubscribedProvider} />

        {data.wallet.pending && (
          <div className="absolute z-10 top-4 right-4">
            <div className="tooltip tooltip-left" data-tip="Payment withdrawal requested">
              <span className="flex w-3 h-3">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-warning"></span>
                <span className="relative inline-flex w-3 h-3 rounded-full bg-error"></span>
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full ring-2 ring-primary/20">
              <ImagePreview src={data.profileImage} />
            </div>

            <div>
              <h3 className="text-lg font-semibold truncate">{data.serviceProviderName}</h3>
              <p className="text-sm text-base-content/60 truncate">{data.serviceProviderEmail}</p>
              <span className="inline-block mt-2 text-xs font-medium rounded-full bg-info/10 text-info px-2 py-1">
                {data.experience} yrs exp
              </span>
            </div>
          </div>

          <p className="mb-4 text-sm text-base-content/70 line-clamp-3">{data.description}</p>

          <div className="p-4 border rounded-xl bg-success/10 border-success/20 text-center">
            <p className="text-xs uppercase text-success">Wallet Balance</p>
            <p className="text-2xl font-bold text-success">₹{data.wallet.balance.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WalletCard;
