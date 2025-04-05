import React, { useState, useEffect } from 'react';
import { HotToastError } from '../../../utils/HotToasitify';
import { Toaster } from 'react-hot-toast';

interface IPayment {
  serviceCost: number;
  materialCost?: number;
  travelCost?: number;
  inspectionCost?: number;
  total: number;
}

interface IProps {
  setPayment(payment: IPayment): void;
  closeModal(): void;
  makePaymentRequest(): Promise<void>;
}

const PaymentModal: React.FC<IProps> = ({ setPayment, closeModal, makePaymentRequest }) => {
  const [formData, setFormData] = useState<IPayment>({
    serviceCost: 0,
    materialCost: 0,
    travelCost: 0,
    inspectionCost: 0,
    total: 0
  });

  useEffect(() => {
    const total = (formData.serviceCost || 0) + 
                  (formData.materialCost || 0) + 
                  (formData.travelCost || 0) + 
                  (formData.inspectionCost || 0);
    
    setFormData(prev => ({
      ...prev,
      total: total
    }));
  }, [formData.serviceCost, formData.materialCost, formData.travelCost, formData.inspectionCost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are numbers
    const isServiceCostValid = !isNaN(formData.serviceCost);
    const isMaterialCostValid = !isNaN(formData.materialCost || 0);
    const isTravelCostValid = !isNaN(formData.travelCost || 0);
    const isInspectionCostValid = !isNaN(formData.inspectionCost || 0);
    
    const isValid = isServiceCostValid && isMaterialCostValid && isTravelCostValid && isInspectionCostValid;
    
    if (!isServiceCostValid) {
      HotToastError("Service Cost is not valid");
    } else if (!isMaterialCostValid) {
      HotToastError("Material Cost is not valid");
    } else if (!isTravelCostValid) {
      HotToastError("Travel Cost is not valid");
    } else if (!isInspectionCostValid) {
      HotToastError("Inspection Cost is not valid");
    }
    
    if (isValid) {
      setPayment(formData);
      makePaymentRequest();
      closeModal();
    } else {
      console.error("Invalid input: All fields must be numbers");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6 border border-base-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Payment Details</h2>
          <button 
            onClick={closeModal}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="card bg-base-200 shadow-sm p-4 rounded-lg">
            <Toaster/>
            <div className="space-y-4">
              <div className="form-control">
                <label htmlFor="serviceCost" className="label">
                  <span className="label-text text-base font-medium">Service Cost</span>
                </label>
                <input
                  type="number"
                  id="serviceCost"
                  name="serviceCost"
                  value={formData.serviceCost || ''}
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full"
                  required
                />
              </div>
              
              <div className="form-control">
                <label htmlFor="materialCost" className="label">
                  <span className="label-text text-base font-medium">Material Cost</span>
                </label>
                <input
                  type="number"
                  id="materialCost"
                  name="materialCost"
                  value={formData.materialCost || ''}
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full"
                />
              </div>
              
              <div className="form-control">
                <label htmlFor="travelCost" className="label">
                  <span className="label-text text-base font-medium">Travel Cost</span>
                </label>
                <input
                  type="number"
                  id="travelCost"
                  name="travelCost"
                  value={formData.travelCost || ''}
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full"
                />
              </div>
              
              <div className="form-control">
                <label htmlFor="inspectionCost" className="label">
                  <span className="label-text text-base font-medium">Inspection Cost</span>
                </label>
                <input
                  type="number"
                  id="inspectionCost"
                  name="inspectionCost"
                  value={formData.inspectionCost || ''}
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="card ">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount:</span>
              <span className="text-2xl font-extrabold">₹{formData.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit Payment Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;