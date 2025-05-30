import { FormEvent, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { handleAuth } from "./handleSubmit"; 
import PasswordStrengthChecker from "./PasswordStrengthChecker";

interface Props {
  setError: Dispatch<SetStateAction<string | boolean>>
}

const SignupForm = ({ setError }: Props) => {
  const navigate = useNavigate();
  const [useEmail, setUseEmail] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleAuth(formData, false, setLoading, setError, navigate, useEmail);
  };

  return (
    <div className="h-[420px] ">

    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {/* Name Field */}
      <div className="form-control">
        <label className="block mb-2 font-medium label-text">Full Name</label>
        <div className="relative group">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full text-lg transition-all duration-300 input input-bordered input-primary input-lg bg-base-100/80 backdrop-blur-sm focus:input-primary focus:shadow-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-primary/5 rounded-xl group-focus-within:opacity-100" />
          
          {/* Name Icon */}
          <div className="absolute transform -translate-y-1/2 right-4 top-1/2 text-base-content/60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="form-control">
        {/* Modern Toggle Switch for Email/Phone */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center p-1 rounded-full shadow-inner bg-base-200">
            {/* Sliding Background */}
            <div 
              className={`absolute top-1 bottom-1 w-1/2 bg-primary rounded-full shadow-lg transition-all duration-300 ease-in-out transform ${
                useEmail ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
            
            {/* Email Button */}
            <button
              type="button"
              onClick={() => setUseEmail(true)}
              className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out flex items-center space-x-2 ${
                useEmail 
                  ? 'text-primary-content shadow-lg' 
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Email</span>
            </button>
            
            {/* Phone Button */}
            <button
              type="button"
              onClick={() => setUseEmail(false)}
              className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out flex items-center space-x-2 ${
                !useEmail 
                  ? 'text-primary-content shadow-lg' 
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>Phone</span>
            </button>
          </div>
        </div>

        {/* Animated Input Field */}
        <div className="relative group">
          <input
            type={useEmail ? "email" : "tel"}
            name={useEmail ? "email" : "phoneNumber"}
            placeholder={useEmail ? "Enter your email address" : "Enter your phone number"}
            value={useEmail ? formData.email : formData.phoneNumber}
            onChange={handleChange}
            className="w-full text-lg transition-all duration-300 input input-bordered input-primary input-lg bg-base-100/80 backdrop-blur-sm focus:input-primary focus:shadow-lg"
            required
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-primary/5 rounded-xl group-focus-within:opacity-100" />
          
          {/* Floating Icon */}
          <div className="absolute transform -translate-y-1/2 right-4 top-1/2 text-base-content/60">
            {useEmail ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="form-control">
        <label className="block mb-2 font-medium label-text">Password</label>
        
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            className="w-full pl-10 pr-12 text-lg transition-all duration-300 input input-bordered input-primary input-lg bg-base-100/80 backdrop-blur-sm focus:input-primary focus:shadow-lg"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-primary/5 rounded-xl group-focus-within:opacity-100" />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute transition-all duration-200 transform -translate-y-1/2 right-3 top-1/2 btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-base-content"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>

          {/* Password Icon */}
          <div className="absolute transform -translate-y-1/2 left-4 top-1/2 text-base-content/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
            <div className="mt-2">
          <PasswordStrengthChecker password={formData.password} />
        </div>
        )
            
        }
      </div>

      {/* Enhanced Submit Button */}
      <button 
        type="submit" 
        className={`btn btn-primary btn-lg w-full text-lg font-semibold transition-all duration-300 transform focus:outline-none ${
          loading 
            ? 'loading' 
            : 'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }`}
        disabled={loading}
      >
        {loading ? (
          "Creating Account..."
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Create Account</span>
          </div>
        )}
      </button>
    </form>
    </div>
  );
};

export default SignupForm;