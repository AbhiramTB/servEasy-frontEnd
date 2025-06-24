
import React from "react";

interface Address {
  name: string;
  houseName: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface ServiceAddressCardProps {
  address: Address;
  liveLocation?: Location;
}

const ServiceAddressCard: React.FC<ServiceAddressCardProps> = ({ address, liveLocation }) => {
  return (
    <div className="mb-4 shadow card bg-base-100">
      <div className="p-4 card-body">
        <h3 className="text-base card-title">Service Address</h3>

        <div className="text-sm">
          <p className="font-medium">{address.name}</p>
          <p>{address.houseName}</p>
          <p>
            {address.state} - {address.pincode}
          </p>
          <p className="mt-1">📞 {address.phone}</p>
        </div>
      </div>

      {liveLocation?.lat && liveLocation?.lng && (
        <div className="px-4 pb-4 bg-base-300">
          <h3 className="my-2 font-sans text-base text-center">User Location on Map</h3>
          <iframe
            title="Service Location"
            width="100%"
            height="180"
            frameBorder="0"
            style={{ border: 0, borderRadius: "8px" }}
            src={`https://www.google.com/maps?q=${liveLocation.lat},${liveLocation.lng}&hl=es;z=16&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ServiceAddressCard;
