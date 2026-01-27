import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/makeRequestInstance";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const razorpay_payment_id = searchParams.get("razorpay_payment_id");
    const razorpay_order_id = searchParams.get("razorpay_order_id");
    const razorpay_signature = searchParams.get("razorpay_signature");

  
  postRequest("/payment/verify" , {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/payment/success");
        } else {
          navigate("/payment/fail");
        }
      })
      .catch((err) => {
        console.error("Verification failed", err);
        navigate("/payment/fail");
      });
  }, []);

  return <div>Verifying your payment...</div>;
};

export default PaymentVerify;
