import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "../ForgotPassword/forgotPassword";
import { ToastContainer } from "react-toastify";
import ErrorAlertInfo from "./ErrorAlertInfo";
import GoogleAuthButton from "./SignInSignUp/googleAuth";
import {MapPinned } from "lucide-react";
import AboutSection from "./SignInSignUp/AboutSection";
const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [isError, setError] = useState<boolean | string>(false);

return (
  <div className="relative w-full overflow-x-hidden bg-black">
    {/* Background Grid & Glow */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
    </div>

    {/* Main Auth Section */}
    <section className="relative z-10 flex items-center justify-center px-4 py-20">
      {isForgotPassword ? (
        <ForgotPassword setForget={setForgotPassword} />
      ) : (
        <div className="flex w-full max-w-6xl overflow-hidden shadow-2xl rounded-2xl">
          {/* Left Panel */}
<div className="relative hidden w-1/2 lg:flex bg-[url('/loginImage.png')] bg-no-repeat bg-center bg-cover">
  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />

  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-10">
    <div className="w-full max-w-md p-10 text-center text-white backdrop-blur-md bg-black/10 border-white/20 rounded-2xl">
      <div className="flex justify-center mb-4">
        <MapPinned className="w-10 h-10 text-white" />
      </div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-wide">SERVEASY</h1>
      <p className="text-lg text-white/80">Find your nearby service</p>
    </div>
  </div>
</div>

          <div className="w-full p-8 lg:w-1/2 bg-base-100">
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-center">
                {isSignIn ? "Sign In" : "Create Account"}
              </h2>
              <p className="mb-4 text-center text-base-content/70">
                {isSignIn
                  ? "Enter your credentials to access your account"
                  : "Fill in the information to create your account"}
              </p> 

              {isSignIn ? (
                <LoginForm setForgotPassword={setForgotPassword} setError={setError} />
              ) : (
                <div className="h-[500px]">
                    <SignupForm setError={setError} />
                </div>
              )}

              <div className="mt-6 divider">OR</div>
              <div className="ml-[88px] opacity-60">
                <GoogleAuthButton />
              </div>

              <div className="mt-4 text-center">
                {isSignIn ? (
                  <p className="text-base-content/70">
                    Don’t have an account?{" "}
                    <button onClick={() => setIsSignIn(false)} className="link link-primary">
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className="text-base-content/70">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setIsSignIn(true);
                        setError(false);
                      }}
                      className="link link-primary"
                    >
                      Sign in
                    </button>
                  </p>
                )}
                {isError && <ErrorAlertInfo isError={isError} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

    {/* About Section Below */}
    <AboutSection />

    <ToastContainer />
  </div>
);

};

export default AuthPage;
