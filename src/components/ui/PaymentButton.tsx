import { HotToastError } from '../../utils/notificationToast';
import { postRequest } from '../../utils/makeRequestInstance';

interface PaymentProps {
  total: number;
  buttonStyle: { className: string; buttonText: string };
  customerInfo: { userName: string; email: string; phone: string };
  createOrderApi: string;
  payload: Record<string, any>;
  onSuccess: () => void;
  onError: () => void;
  verifyApi: string;
  setLoading?: (state: boolean) => void;
  onBeforePayment?: () => void;
}

const RazorpayButton = ({
  buttonStyle,
  customerInfo,
  onSuccess,
  onError,
  verifyApi,
  payload,
  createOrderApi,
  setLoading,
  onBeforePayment,
}: PaymentProps) => {
  const handlePayment = async () => {
    if (onBeforePayment) {
      onBeforePayment();
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }
    if (setLoading) setLoading(true);

    try {
      const { data: order } = await postRequest(createOrderApi, {
        ...payload,
      });

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.order.amount,
        currency: order.order.currency,
        name: 'ServEase',
        description: 'Payment for your booking',
        order_id: order.order.id,
        handler: async function (response: any) {
          try {
            const verificationRes = await postRequest(verifyApi, {
              ...payload,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationRes.status === 200) {
              onSuccess();
            } else {
              onError();
            }
          } catch (err) {
            console.error('Verification error:', err);

            HotToastError('❌ Something went wrong during verification.');
          }
        },
        prefill: {
          name: customerInfo.userName,
          email: customerInfo.email || '',
          contact: customerInfo.phone || '',
        },
        theme: {
          color: '#000000',
        },
        modal: {
          escape: true,
          backdropclose: true,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      if (error.response.data.message) {
        HotToastError(error.response.data.message);
      }
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <button className={buttonStyle.className || ''} onClick={handlePayment}>
        {buttonStyle.buttonText}
      </button>
    </>
  );
};

export default RazorpayButton;

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
