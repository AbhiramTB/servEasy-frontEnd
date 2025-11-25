import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddPlanModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    validityDays: 30,
    adLimitPerMonth: 0,
    payoutSpeedDays: 0,
    description: '',
    features: [''],
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };

  const addMoreFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const handleSubmit = () => {
    const cleanData = {
      ...form,
      features: form.features.filter(f => f.trim() !== ''),
    };
    onSubmit(cleanData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-xl w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Add Subscription Plan</h2>

        <input name="name" className="input input-bordered w-full" placeholder="Plan name" onChange={handleChange} />

        <input
          name="price"
          type="number"
          className="input input-bordered w-full"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="validityDays"
          type="number"
          className="input input-bordered w-full"
          placeholder="Validity days"
          onChange={handleChange}
        />

        <input
          name="adLimitPerMonth"
          type="number"
          className="input input-bordered w-full"
          placeholder="Ads per month"
          onChange={handleChange}
        />

        <input
          name="payoutSpeedDays"
          type="number"
          className="input input-bordered w-full"
          placeholder="Payout speed (days)"
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          onChange={handleChange}
        />

        <div>
          <p className="font-medium mb-2">Features</p>
          {form.features.map((f, i) => (
            <input
              key={i}
              className="input input-bordered w-full mb-2"
              placeholder={`Feature ${i + 1}`}
              value={f}
              onChange={e => handleFeatureChange(i, e.target.value)}
            />
          ))}

          <button type="button" className="btn btn-xs btn-outline" onClick={addMoreFeature}>
            + Add Feature
          </button>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;
