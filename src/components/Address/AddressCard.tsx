import React from 'react';
import { Edit, Trash2, Home, Hash, Flag, MessageCircle, Check, Phone } from 'lucide-react';

import { IAddress } from './IAddress';

interface AddressCardProps {
  address: IAddress;
  onEdit: (address: IAddress) => void;
  onDelete: (id: string) => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({ 
  address, 
  onEdit, 
  onDelete, 
  onSelect,
  isSelected
}) => {
  return (
    <div 
      className={`card bg-base-100 shadow-xl mb-4 cursor-pointer`}
      onClick={onSelect}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">
            {address.name}
            {address.isDefault && (
              <span className="badge badge-primary ml-2">Default</span>
            )}
            {isSelected && (
              <Check className="ml-2 text-green-500" size={20} />
            )}
          </h2>
          <div className="flex space-x-2">
            <button 
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address);
              }}
            >
              <Edit size={16} />
            </button>
            <button 
              className="btn btn-ghost btn-sm text-error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(address._id);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="flex items-center">
            <Home className="mr-2 text-gray-500" size={16} />
            {address.houseName}
          </p>
          <p className="flex items-center">
            <Hash className="mr-2 text-gray-500" size={16} />
            {address.pincode}
          </p>
          <p className="flex items-center">
            <Flag className="mr-2 text-gray-500" size={16} />
            {address.state}
          </p>
          {address.landmark && (
            <p className="flex items-center">
              <MessageCircle className="mr-2 text-gray-500" size={16} />
              {address.landmark}
            </p>
          )}
          {address.phone && (
            <p className="flex items-center">
              <Phone className="mr-2 text-gray-500" size={16} />
              {address.phone}
            </p>
          )}
          <p className="text-sm text-gray-500">
            {address.description}
          </p>
        </div>

     
      </div>
    </div>
  );
};