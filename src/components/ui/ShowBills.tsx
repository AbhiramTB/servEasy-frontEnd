import React from 'react';
import { X } from 'lucide-react';
import handleDownload from '../../utils/handleDownload ';

interface Props {
  bills: string[];
  close: () => void;
  serviceName:string
}

const ShowBills: React.FC<Props> = ({ bills, close,serviceName }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-300/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 border shadow-xl bg-base-100 border-base-300 rounded-xl text-base-content">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Bills</h2>
          <button
            onClick={close}
            className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-base-200 hover:bg-base-300 text-base-content"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        
        {bills.length === 0 ? (
          <div className="py-8 text-center text-base-content/60">
            No bills to display
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mt-2 max-h-[70vh] overflow-y-auto pr-2">
            {bills.map((bill, index) => (
              <div key={index} className="group">
                <div className="overflow-hidden transition-colors border rounded-lg border-base-300 hover:border-primary">
                  <img 
                    src={bill} 
                    alt={`Bill ${index + 1}`} 
                    className="w-full h-auto rounded-lg" 
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-base-content/70">Bill #{index + 1}</span>
                  <button onClick={()=>handleDownload(bill,`${serviceName}-bill ${index+1}`)} className="px-3 py-1 text-xs transition-colors rounded bg-base-300 hover:bg-primary hover:text-primary-content">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBills;