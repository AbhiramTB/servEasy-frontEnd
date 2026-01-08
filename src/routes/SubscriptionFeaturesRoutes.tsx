import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../redux/slices/subscriptionSlice';

const SubscriptionFeaturesRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSubscribedProvider = useSelector((state: RootState) => state.serviceProvider.isProServiceProvider);
  const handleOpenPopUp = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    if (!isSubscribedProvider) {
      navigate(-1);
      handleOpenPopUp();
      return;
    }
  }, [isSubscribedProvider, navigate]);

  return <>{children}</>;
};

export default SubscriptionFeaturesRoutes;
