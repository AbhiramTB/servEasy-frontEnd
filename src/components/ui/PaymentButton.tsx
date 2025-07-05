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
      });

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.order.amount,
        currency: order.order.currency,
        name: "ServEase",
        description: "Service Booking Payment",
        order_id: order.order.id,
        handler: async function (response: any) {
          try {
            const verificationRes = await postRequest("/payment/verify", {
              serviceid,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationRes.status === 200) {
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
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
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
};

export default RazorpayButton;

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
