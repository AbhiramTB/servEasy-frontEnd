import React, { useEffect, useState } from 'react';
import { ISubscriptionPlan } from '../../../utils/types/ISubscriptionPlan';
import AddPlanModal from './AddPlanModal';
import EditPlanModal from './EditPlanModal';
import PlanCard from './PlanCard';
import { adminGetRequest, adminPatchRequest, adminPostRequest } from '../../../utils/AxiosAdmin';

const SubscriptionPlansPage: React.FC = () => {
  //   const [plans, setPlans] = useState<ISubscriptionPlan[]>([
  //     {
  //       _id: '68d4f0b1584c9b1edcb65acb',
  //       name: 'Premium Plan',
  //       price: 499,
  //       validityDays: 30,
  //       features: ['Unlimited profile visibility', 'Priority support', 'Advanced analytics', 'Featured listing'],
  //       adLimitPerMonth: 50,
  //       payoutSpeedDays: 3,
  //       description: 'Best for businesses who want maximum exposure and faster payouts.',
  //       //   "createdAt": "2025-09-25T07:35:13.644Z",
  //       //   "updatedAt": "2025-09-25T07:35:13.644Z"
  //     },
  //   ]);
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);

  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(null);

  // ================= FETCH PLANS =================
  const fetchPlans = async () => {
    try {
      setLoading(true);

      const res = await adminGetRequest('/admin/subscriptions');
      setPlans(res.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch plans');
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ================= CREATE PLAN =================
  const handleCreatePlan = async (data: any) => {
    try {
      await adminPostRequest('/admin/subscriptions', data);
      fetchPlans();
    } catch (err) {
      console.error('Create plan failed');
    }
  };

  // ================= UPDATE PLAN =================
  const handleUpdatePlan = async (id: string, data: any) => {
    try {
      await adminPatchRequest(`/admin/subscriptions/${id}`, data);
      fetchPlans();
    } catch (err) {
      console.error('Update plan failed');
    }
  };

  // ================= OPEN EDIT =================
  const openEditModal = (plan: ISubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* ======= Header ======= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Plan
        </button>
      </div>

      {/* ======= Loading ======= */}
      {loading && <div className="text-center">Loading...</div>}

      {/* ======= Plans Grid ======= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map(plan => (
          <PlanCard key={plan._id} plan={plan} onEdit={openEditModal} />
        ))}
      </div>

      {/* ======= Modals ======= */}
      <AddPlanModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleCreatePlan} />

      <EditPlanModal
        isOpen={showEditModal}
        plan={selectedPlan}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdatePlan}
      />
    </div>
  );
};

export default SubscriptionPlansPage;
