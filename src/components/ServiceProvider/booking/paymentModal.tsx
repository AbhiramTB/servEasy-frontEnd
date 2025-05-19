import React, { useState, useEffect } from "react";
import { HotToastError } from "../../../utils/notificationToast";
import { Toaster } from "react-hot-toast";
import {Ipayment}from "../../../utils/types/Ipayment"


interface IProps {
  payment:Ipayment,
  setPayment(payment: Ipayment): void;
  closeModal(): void;
  makePaymentRequest(): Promise<void>;
}

const PaymentModal: React.FC<IProps> = ({
  payment,
  setPayment,
  closeModal,
  makePaymentRequest,
}) => {


  useEffect(() => {
    const total =
      (payment.serviceCost || 0) +
      (payment.materialCost || 0) +
      (payment.travelCost || 0) +
      (payment.inspectionCost || 0);

    setPayment({...payment,total});
  }, [
    payment.serviceCost,
    payment.materialCost,
    payment.travelCost,
    payment.inspectionCost,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   
    setPayment({
      ...payment,
      [name]: parseFloat(value) || 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isServiceCostValid = !isNaN(payment.serviceCost || 0);
    const isMaterialCostValid = !isNaN(payment.materialCost || 0);
    const isTravelCostValid = !isNaN(payment.travelCost || 0);
    const isInspectionCostValid = !isNaN(payment.inspectionCost || 0);

    const isValid =
      isServiceCostValid &&
      isMaterialCostValid &&
      isTravelCostValid &&
      isInspectionCostValid;

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
      setPayment(payment);
      makePaymentRequest();
      closeModal();
    } else {
      console.error("Invalid input: All fields must be numbers");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-xl bg-base-100 border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Payment Details</h2>
          <button
            onClick={closeModal}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-4 rounded-lg shadow-sm card bg-base-200">
            <Toaster />
            <div className="space-y-4">
              <div className="form-control">
                <label htmlFor="serviceCost" className="label">
                  <span className="text-base font-medium label-text">
                    Service Cost
                  </span>
                </label>
                <input
                  type="number"
                  id="serviceCost"
                  name="serviceCost"
                  value={payment.serviceCost || ""}
                  onChange={handleChange}
                  className="w-full input input-bordered input-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label htmlFor="materialCost" className="label">
                  <span className="text-base font-medium label-text">
                    Material Cost
                  </span>
                </label>
                <input
                  type="number"
                  id="materialCost"
                  name="materialCost"
                  value={payment.materialCost || ""}
                  onChange={handleChange}
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div className="form-control">
                <label htmlFor="travelCost" className="label">
                  <span className="text-base font-medium label-text">
                    Travel Cost
                  </span>
                </label>
                <input
                  type="number"
                  id="travelCost"
                  name="travelCost"
                  value={payment.travelCost || ""}
                  onChange={handleChange}
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div className="form-control">
                <label htmlFor="inspectionCost" className="label">
                  <span className="text-base font-medium label-text">
                    Inspection Cost
                  </span>
                </label>
                <input
                  type="number"
                  id="inspectionCost"
                  name="inspectionCost"
                  value={payment.inspectionCost || ""}
                  onChange={handleChange}
                  className="w-full input input-bordered input-primary"
                />
              </div>
            </div>
          </div>

          <div className="card ">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Total Amount:</span>
              <span className="text-2xl font-extrabold">
                ₹{payment.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-end pt-2 space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Payment Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
