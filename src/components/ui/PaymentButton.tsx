<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
import { HotToastError } from "../../utils/notificationToast";
import { postRequest } from "../../utils/makeRequestInstance";

interface PaymentProps {
  serviceid: string;
  total: number;
  reloadData?:()=>any
}

const RazorpayButton = ({ serviceid, reloadData}: PaymentProps) => {
  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    try {
      const { data: order } = await postRequest("/payment/create-order", {
        serviceid,
=======
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
}: PaymentProps) => {
  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }
          if (setLoading) setLoading(true);

    try {
      const { data: order } = await postRequest(createOrderApi, {
        ...payload,
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
      });

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.order.amount,
        currency: order.order.currency,
<<<<<<< HEAD
        name: "ServEase",
        description: "Service Booking Payment",
        order_id: order.order.id,
        handler: async function (response: any) {
          try {
            const verificationRes = await postRequest("/payment/verify", {
              serviceid,
=======
        name: 'ServEase',
        description: 'Payment for your booking',
        order_id: order.order.id,
        handler: async function (response: any) {

          try {
            const verificationRes = await postRequest(verifyApi, {
              ...payload,
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationRes.status === 200) {
<<<<<<< HEAD
             if(reloadData){
              reloadData()
             }
            } else {
              
              HotToastError("❌ Payment verification failed.")

            }
          } catch (err) {
            console.error("Verification error:", err);
            
            HotToastError("❌ Something went wrong during verification.")
          }
        },
        prefill: {
          name: "Abhiram",
          email: "abhiram@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6366F1",
=======
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
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
<<<<<<< HEAD
    } catch (error:any) {
  
      
      if(error.response.data.message){
        HotToastError(error.response.data.message)
      }

    }
  };

  return(<>
  <Toaster/>
  <button className="p-3 text-base font-bold rounded-md hover:bg-opacity-45 bg-primary " onClick={handlePayment}>Pay Now</button>
  </>);
=======
    } catch (error: any) {
      if (error.response.data.message) {
        HotToastError(error.response.data.message);
      }
    }finally{
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
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
};

export default RazorpayButton;

const loadRazorpayScript = (): Promise<boolean> => {
<<<<<<< HEAD
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
=======
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
