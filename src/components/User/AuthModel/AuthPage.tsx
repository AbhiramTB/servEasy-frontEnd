import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import ErrorAlertInfo from './ErrorAlertInfo';
import GoogleAuthButton from './googleAuth';
import { MapPinned } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { HotToastError } from '../../../utils/notificationToast';
import LandingNavbar from '../../ui/Landing/LandingNavbar';
const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [isError, setError] = useState<boolean | string>(false);

  const location = useLocation();
  const isBlocked = new URLSearchParams(location.search).get('blocked');

  useEffect(() => {
    if (isBlocked === 'true') {
      HotToastError('Your account has been blocked by the admin!');
    }
  }, [isBlocked]);

  return (
    <div className="relative w-full overflow-x-hidden bg-base-200 bg-hex-pattern">
      <LandingNavbar
        loginFunction={() => setIsSignIn(!isSignIn)}
        links={[{ label: 'landing', href: '/' }]}
        loginText={isSignIn ? 'Sign-up' : 'Sign-in'}
      />
      <section className="relative z-10 flex items-center justify-center px-4 py-20  min-h-screen">
        {isForgotPassword ? (
          <ForgotPassword setForget={setForgotPassword} />
        ) : (
          <div className="flex w-full max-w-6xl overflow-hidden shadow-2xl rounded-2xl">
            <div className="relative hidden w-1/2 lg:flex bg-[url('/loginImage.png')] bg-no-repeat bg-center bg-cover">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-primary/5" />

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
                <h2 className="text-2xl font-bold text-center">{isSignIn ? 'Sign In' : 'Create Account'}</h2>
                <p className="mb-4 text-center text-base-content/70">
                  {isSignIn
                    ? 'Enter your credentials to access your account'
                    : 'Fill in the information to create your account'}
                </p>

                {isSignIn ? (
                  <LoginForm setForgotPassword={setForgotPassword} setError={setError} />
                ) : (
                  <div className="h-[500px]">
                    <SignupForm setError={setError} />
                  </div>
                )}

                <div className="mt-6 divider">OR</div>
                <div className="flex justify-center">
                  <div className=" ">
                    <GoogleAuthButton />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  {isSignIn ? (
                    <p className="text-base-content/70">
                      Don’t have an account?{' '}
                      <button onClick={() => setIsSignIn(false)} className="link link-primary">
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p className="text-base-content/70">
                      Already have an account?{' '}
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
    </div>
  );
};

export default AuthPage;
