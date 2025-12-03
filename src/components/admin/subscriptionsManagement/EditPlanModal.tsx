import React, { useEffect, useState } from 'react';
import { ISubscriptionPlan } from '../../../utils/types/ISubscriptionPlan';

interface Props {
  isOpen: boolean;
  plan: ISubscriptionPlan | null;
  onClose: () => void;
  onSubmit: (id: string, data: any) => void;
}

const EditPlanModal: React.FC<Props> = ({ isOpen, plan, onClose, onSubmit }) => {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (plan) {
      setForm({
        ...plan,
      });
    }
  }, [plan]);

  if (!isOpen || !form) return null;

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

  const handleUpdate = () => {
    onSubmit(form._id, {
      name: form.name,
      price: Number(form.price),
      validityDays: Number(form.validityDays),
      adLimitPerMonth: Number(form.adLimitPerMonth),
      payoutSpeedDays: Number(form.payoutSpeedDays),
      description: form.description,
      features: form.features.filter((f: string) => f.trim() !== ''),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-xl w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Edit Subscription Plan</h2>

        <input name="name" className="input input-bordered w-full" value={form.name} onChange={handleChange} />

        <input
          name="price"
          type="number"
          className="input input-bordered w-full"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="validityDays"
          type="number"
          className="input input-bordered w-full"
          value={form.validityDays}
          onChange={handleChange}
        />

        <input
          name="adLimitPerMonth"
          type="number"
          className="input input-bordered w-full"
          value={form.adLimitPerMonth}
          onChange={handleChange}
        />

        <input
          name="payoutSpeedDays"
          type="number"
          className="input input-bordered w-full"
          value={form.payoutSpeedDays}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          value={form.description}
          onChange={handleChange}
        />

        <div>
          <p className="font-medium mb-2">Features</p>

          {form.features.map((f: string, i: number) => (
            <input
              key={i}
              className="input input-bordered w-full mb-2"
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
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlanModal;
