import { postRequest } from '../../../utils/makeRequestInstance';
import { validateEmail, validatePassword, validatePhone } from '../../../utils/validate';
import React, { useState, FormEvent } from 'react';
import { apiEndPointAdmin } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
interface SignInCredentials {
  identifier: string;
  password: string;
}

const AdminSignIn: React.FC = () => {
  const [credentials, setCredentials] = useState<SignInCredentials>({
    identifier: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [identifierType, setIdentifierType] = useState<'email' | 'phone'>('email');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    if (error) setError(null);
  };

  const handleIdentifierTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifierType(e.target.value as 'email' | 'phone');
    setCredentials({
      ...credentials,
      identifier: '',
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (identifierType == 'phone') {
      if (!validatePhone(credentials.identifier)) {
        setError('Please enter a valid 10-digit phone number.');
      }
    }
    if (identifierType == 'email') {
      if (!validateEmail(credentials.identifier)) {
        setError('Please enter a valid email address."');
      }
    }

    if (!validatePassword(credentials.password)) {
      setError(
        'Password must be at least 6 characters long and include at least one special character (e.g., !@#$%^&*).'
      );
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log(identifierType);

      console.log('Authentication attempt with:', {
        [identifierType]: credentials.identifier,
        password: credentials.password,
      });
      const data = {
        [identifierType]: credentials.identifier,
        password: credentials.password,
      };
      console.log(identifierType);

      const res = await postRequest(apiEndPointAdmin.AdminSignIn, data);
      if (res.status == 200) {
        console.log(res.data.accessToken);

        localStorage.setItem('adminToken', res.data.accessToken);

        navigate('/admin/home');
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials and try again.');
      console.error('Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // return (
  //   <div className="flex items-center justify-center min-h-screen px-4 bg-primary/5">
  //     <div className="flex w-full max-w-4xl overflow-hidden border shadow-2xl card bg-base-100 border-base-300">
  //       {/* LEFT IMAGE */}
  //       <div className="hidden md:block md:w-1/2">
  //         <img src="/images/admin-signin.png" alt="Admin Sign In" className="object-cover w-full h-full" />
  //       </div>

  //       {/* RIGHT FORM (YOUR EXISTING CODE) */}
  //       <div className="flex items-center justify-center w-full md:w-1/2">
  //         <div className="w-full max-w-sm card-body">
  //           <h2 className="mb-6 text-2xl font-bold text-center text-primary">Admin Sign In</h2>
  //           {error && (
  //             <div className="mb-4 text-sm alert alert-error">
  //               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
  //                 <path
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
  //                 />
  //               </svg>
  //               <span>{error}</span>
  //             </div>
  //           )}
  //           <form onSubmit={handleSubmit}>
  //             <div className=" form-control">
  //               <label className="label">
  //                 <span className="font-semibold label-text text-primary">Sign in with</span>
  //               </label>
  //               <div className="flex gap-4">
  //                 <label className="flex items-center gap-2 cursor-pointer">
  //                   <input
  //                     type="radio"
  //                     name="identifierType"
  //                     className="radio radio-primary"
  //                     value="email"
  //                     checked={identifierType === 'email'}
  //                     onChange={handleIdentifierTypeChange}
  //                   />
  //                   <span className="label-text">Email</span>
  //                 </label>

  //                 <label className="flex items-center gap-2 cursor-pointer">
  //                   <input
  //                     type="radio"
  //                     name="identifierType"
  //                     className="radio radio-primary"
  //                     value="phone"
  //                     checked={identifierType === 'phone'}
  //                     onChange={handleIdentifierTypeChange}
  //                   />
  //                   <span className="label-text">Phone Number</span>
  //                 </label>
  //               </div>
  //             </div>

  //             <div className="form-control">
  //               <label className="label">
  //                 <span className="font-semibold label-text text-primary">
  //                   {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
  //                 </span>
  //               </label>
  //               <input
  //                 type={identifierType === 'email' ? 'email' : 'tel'}
  //                 name="identifier"
  //                 placeholder={identifierType === 'email' ? 'admin@example.com' : 'Phone Number'}
  //                 className="input input-bordered bg-base-200 text-base-content"
  //                 value={credentials.identifier}
  //                 onChange={handleChange}
  //                 required
  //               />
  //             </div>

  //             <div className="mt-4 form-control">
  //               <label className="label">
  //                 <span className="font-semibold label-text text-primary">Password</span>
  //               </label>
  //               <div className="relative">
  //                 <input
  //                   type={showPassword ? 'text' : 'password'}
  //                   name="password"
  //                   placeholder="••••••••"
  //                   className="w-full pr-12 input input-bordered bg-base-200 text-base-content"
  //                   value={credentials.password}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //                 <button
  //                   type="button"
  //                   className="absolute -translate-y-1/2 right-3 top-1/2 text-base-content"
  //                   onClick={() => setShowPassword(!showPassword)}
  //                   tabIndex={-1}
  //                 >
  //                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  //                 </button>
  //               </div>
  //             </div>

  //             <div className="mt-6 form-control">
  //               <button type="submit" className="btn btn-primary" disabled={isLoading}>
  //                 {isLoading ? 'Signing in...' : 'Sign In'}
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex items-center justify-center min-h-screen px-4  bg-hex-pattern">
      <div className="flex flex-col md:flex-row w-full max-w-6xl overflow-hidden border shadow-2xl rounded-3xl bg-base-100 border-base-300 min-h-[750px]">
        {' '}
        <div className="hidden md:block md:w-1/2 relative">
          <img src="/images/admin-signin.png" alt="Admin Sign In" className="absolute inset-0  " />
          <div className="absolute inset-0 bg-primary/10"></div>
        </div>
        <div className="flex flex-col justify-center w-full p-8 md:w-1/2 lg:p-12">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="mb-2 text-3xl font-bold text-primary">Admin Sign In</h2>
            <p className="mb-8 text-sm text-base-content/60">Welcome back! Please enter your details.</p>

            {error && (
              <div className="mb-4 text-sm alert alert-error py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold label-text">Sign in with</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="identifierType"
                      className="radio radio-primary radio-sm"
                      value="email"
                      checked={identifierType === 'email'}
                      onChange={handleIdentifierTypeChange}
                    />
                    <span className="text-sm label-text">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="identifierType"
                      className="radio radio-primary radio-sm"
                      value="phone"
                      checked={identifierType === 'phone'}
                      onChange={handleIdentifierTypeChange}
                    />
                    <span className="text-sm label-text">Phone</span>
                  </label>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-semibold label-text">
                    {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
                  </span>
                </label>
                <input
                  type={identifierType === 'email' ? 'email' : 'tel'}
                  name="identifier"
                  placeholder={identifierType === 'email' ? 'admin@example.com' : 'Enter phone number'}
                  className="input input-bordered bg-base-200 focus:input-primary"
                  value={credentials.identifier}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-semibold label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className="w-full pr-12 input input-bordered bg-base-200 focus:input-primary"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute -translate-y-1/2 right-3 top-1/2 opacity-70 hover:opacity-100"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 form-control">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? <span className="loading loading-spinner"></span> : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;

//  <div className="flex items-center justify-center min-h-screen px-4 bg-primary/5">
//       <div className="w-full max-w-md border shadow-2xl card bg-base-100 border-base-300">
//         <div className="card-body">
//           <h2 className="mb-6 text-2xl font-bold text-center text-primary">
//             Admin Sign In
//           </h2>

//           {error && (
//             <div className="mb-4 text-sm alert alert-error">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6 shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4 form-control">
//               <label className="label">
//                 <span className="font-semibold label-text text-primary">
//                   Sign in with
//                 </span>
//               </label>
//               <div className="flex gap-4">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="identifierType"
//                     className="radio radio-primary"
//                     value="email"
//                     checked={identifierType === "email"}
//                     onChange={handleIdentifierTypeChange}
//                   />
//                   <span className="label-text">Email</span>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="identifierType"
//                     className="radio radio-primary"
//                     value="phone"
//                     checked={identifierType === "phone"}
//                     onChange={handleIdentifierTypeChange}
//                   />
//                   <span className="label-text">Phone Number</span>
//                 </label>
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="font-semibold label-text text-primary">
//                   {identifierType === "email" ? "Email Address" : "Phone Number"}
//                 </span>
//               </label>
//               <input
//                 type={identifierType === "email" ? "email" : "tel"}
//                 name="identifier"
//                 placeholder={
//                   identifierType === "email"
//                     ? "admin@example.com"
//                     : "Phone Number"
//                 }
//                 className="input input-bordered bg-base-200 text-base-content"
//                 value={credentials.identifier}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mt-4 form-control">
//               <label className="label">
//                 <span className="font-semibold label-text text-primary">
//                   Password
//                 </span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="••••••••"
//                   className="w-full pr-12 input input-bordered bg-base-200 text-base-content"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute -translate-y-1/2 right-3 top-2/4 text-base-content"
//                   onClick={() => setShowPassword(!showPassword)}
//                   tabIndex={-1}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6 form-control">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
