// components/Ads/AdCard.tsx
import React, { useState } from 'react';
import { IAdDTO } from '../../../utils/types/IAd';
import { patchRequest } from '../../../utils/makeRequestInstance';

interface AdCardProps {
  ad: IAdDTO | null;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const [loading, setLoading] = useState(false);

  if (!ad) return null;

  const handleAdClick = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await patchRequest(`/ads/${ad._id}/click`, {
        serviceId: ad.serviceId,
        providerId: ad.providerId,
      });

      // navigate(`/service/${ad.serviceId}`);
    } catch (error) {
      console.error('Failed to update ad click', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleAdClick}
      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      {/* Full Image */}
      <img
        src={ad.image}
        alt={ad.caption}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Top Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <img
            src={ad.profileImage}
            alt="Provider"
            className="w-10 h-10 rounded-full border-2 border-base-100 object-cover"
          />
          <div>
            <h3 className="text-base-100 font-semibold leading-tight">{ad.caption}</h3>
            <span className="badge badge-secondary badge-sm">Sponsored</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={e => {
            e.stopPropagation();
            handleAdClick();
          }}
          disabled={loading}
          className="btn btn-primary btn-sm rounded-full"
        >
          {loading ? 'Opening...' : 'Visit'}
        </button>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <p className="text-base-100 text-sm line-clamp-2">{ad.description}</p>
      </div>
    </div>
  );
};

export default AdCard;
