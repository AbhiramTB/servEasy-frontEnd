import React, { useState } from 'react';

export interface IFooterBanner {
  _id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}

interface Props {
  banners: IFooterBanner[];
  onDelete: (id: string) => void;
  onMarkDefault: (id: string) => void;
}

const BannerCarousel: React.FC<Props> = ({ banners, onDelete, onMarkDefault }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  if (banners.length === 0) {
    return <p className="text-center">No banners available</p>;
  }

  const banner = banners[currentIndex];

  return (
    <div className="w-full space-y-4">
      {/* Carousel Display */}
      <div className="relative w-full overflow-hidden rounded-lg aspect-[3/1] ">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="object-cover w-full h-full"
        />

        {/* Overlay Actions */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-between gap-2 p-4 text-white bg-black bg-opacity-60 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold">{banner.title}</h3>
            <p className="text-sm">{banner.subtitle}</p>
            {banner.isActive && (
              <span className="mt-1 badge badge-success">Active</span>
            )}
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            {!banner.isActive && (
              <button
                onClick={() => onMarkDefault(banner._id)}
                className="btn btn-sm btn-outline btn-primary"
              >
                Mark as Active
              </button>
            )}
            <button
              onClick={() => onDelete(banner._id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goPrev}
          className="absolute -translate-y-1/2 left-2 top-1/2 btn btn-circle btn-sm"
        >
          ❮
        </button>
        <button
          onClick={goNext}
          className="absolute -translate-y-1/2 right-2 top-1/2 btn btn-circle btn-sm"
        >
          ❯
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 py-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-primary' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
