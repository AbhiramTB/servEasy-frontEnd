import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorAlertInfo from "../../../alert's/ErrorAlert";
import { handleAuth } from "./handleSubmit";
import GoogleButton from "./googleAuth";
import ForgotPassword from "../../ForgotPassword/forgotPassword";

interface FormData {
  email?: string;
  
  phoneNumber?: string;
  password: string;
  name: string;
}

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isforgotPassword, setForgot] = useState<boolean>(false);

  const [useEmail, setUseEmail] = useState<boolean>(true);
  const [isError, setError] = useState<boolean | string>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phoneNumber: "",
    password: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    (async () => {
      try {
        await handleAuth(formData, isSignIn, setLoading, setError, navigate,useEmail);
      } catch (err) {
        console.log(err);
      }
    })();
  };


  return (
   <div>
    {isforgotPassword && <ForgotPassword setForget={setForgot}/>}

    {!isforgotPassword && <div className="flex items-center justify-center min-h-screen p-4 bg-base-200 ">
      <div className="card w-full max-w-md bg-base-100 shadow-xl  mt-[-30px]">
        <div className="border card-body border-opacity-35 rounded-3xl border-primary">
          <h2 className="text-2xl font-bold text-center card-title">
            {isSignIn ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-center text-base-content/70">
            {isSignIn
              ? "Enter your credentials to access your account"
              : "Fill in the information to create your account"}
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {!isSignIn && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full input input-bordered"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex justify-center space-x-2 mb-2 ml-[-173px]">
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    name="contact-method"
                    className="radio radio-primary"
                    checked={useEmail}
                    onChange={() => setUseEmail(true)}
                  />
                  <span className="ml-2 label-text">Email</span>
                </label>
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    name="contact-method"
                    className="radio radio-primary"
                    checked={!useEmail}
                    onChange={() => setUseEmail(false)}
                  />
                  <span className="ml-2 label-text">Phone Number</span>
                </label>
              </div>

              {useEmail ? (
                <div className="form-control">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full input input-bordered"
                    value={formData.email}
                    onChange={handleChange}
                    required={useEmail}
                    autoComplete="email"
                  />
                </div>
              ) : (
                <div className="form-control">
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    className="w-full input input-bordered"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required={!useEmail}
                    autoComplete="tel"
                  />
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
                {isSignIn && (
                  <button
                    type="button"
                    className="label-text-alt link link-hover"
                    // disabled={!formData.email || loading}
                    onClick={()=>setForgot(true)}
                  >
                    Forgot password?
                  </button>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="******"
                  className="w-full input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute -translate-y-1/2 right-3 top-1/2 text-base-content/70 hover:text-base-content"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center">
                {" "}
                <span className="loading loading-bars loading-lg bg-primary"></span>
              </div>
            ) : (
              <button
                type="submit"
                className={`btn btn-primary w-full mt-6 ${loading ? "loading loading-bars loading-xs" : ""}`}
                disabled={loading}
              >
                {isSignIn ? "Sign In" : "Create Account"}
              </button>
            )}
          </form>

          <div className="divider">OR</div>
          {/* <div className="flex w-full py-2 mx-auto rounded-lg shadow-lg opacity-75 scale-300 bg-slate-200"> */}
         
           <div className="mx-auto opacity-60 ">
           <GoogleButton />
           {/* </div> */}
          </div>

          <div className="mt-4 text-center">
            {isSignIn ? (
              <p className="text-base-content/70">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className="link link-primary"
                  disabled={loading}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-base-content/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignIn(true);
                    setError(false);
                  }}
                  className="link link-primary"
                  disabled={loading}
                >
                  Sign in
                </button>
              </p>
            )}

            {isError && <ErrorAlertInfo isError={isError} />}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>}
   </div>
  );
};

export default AuthPage;
