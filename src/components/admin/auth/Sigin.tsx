// AdminSignIn.tsx
import React, { useState, FormEvent } from 'react';

interface SignInCredentials {
  identifier: string;
  password: string;
}

const AdminSignIn: React.FC = () => {
  // State for form inputs
  const [credentials, setCredentials] = useState<SignInCredentials>({
    identifier: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [identifierType, setIdentifierType] = useState<'email' | 'phone'>('email');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  // Handle radio button selection
  const handleIdentifierTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifierType(e.target.value as 'email' | 'phone');
    setCredentials({
      ...credentials,
      identifier: '',
    });
  };
  
  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!credentials.identifier.trim()) {
      setError(`Please enter your ${identifierType}`);
      return;
    }
    
    if (!credentials.password) {
      setError('Please enter your password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Here you would integrate with your actual authentication API
      // For demonstration purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      console.log('Authentication attempt with:', {
        identifierType,
        identifier: credentials.identifier,
        password: credentials.password,
      });
      
      // Reset form and show success (in a real app, you'd redirect)
      alert('Successfully signed in!');
      
    } catch (err) {
      setError('Authentication failed. Please check your credentials and try again.');
      console.error('Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' }}>
      <div className="card w-full max-w-md bg-gray-800 shadow-xl border border-gray-700">
        <figure className="px-6 pt-6">
          <div className="bg-blue-900 p-4 rounded-full w-32 h-32 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Admin Sign In</h2>
          
          {error && (
            <div className="alert bg-red-900 text-red-200 border border-red-800 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium text-blue-400">Sign in with</span>
              </label>
              <div className="flex gap-6 mb-2">
                <label className="label cursor-pointer justify-start gap-2">
                  <input 
                    type="radio" 
                    name="identifierType" 
                    className="radio radio-primary bg-gray-700 border-gray-600" 
                    value="email"
                    checked={identifierType === 'email'}
                    onChange={handleIdentifierTypeChange}
                  />
                  <span className="label-text text-gray-300">Email</span>
                </label>
                <label className="label cursor-pointer justify-start gap-2">
                  <input 
                    type="radio" 
                    name="identifierType" 
                    className="radio radio-primary bg-gray-700 border-gray-600" 
                    value="phone"
                    checked={identifierType === 'phone'}
                    onChange={handleIdentifierTypeChange}
                  />
                  <span className="label-text text-gray-300">Phone Number</span>
                </label>
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-blue-400">
                  {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
                </span>
              </label>
              <input
                type={identifierType === 'email' ? 'email' : 'tel'}
                name="identifier"
                placeholder={identifierType === 'email' ? 'admin@example.com' : '+1 (234) 567-8900'}
                className="input input-bordered bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                value={credentials.identifier}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-medium text-blue-400">Password</span>
                <a href="#" className="label-text-alt text-blue-400 hover:text-blue-300 link">Forgot password?</a>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="divider mt-6 text-gray-500">OR</div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400">Need access? <a href="#" className="text-blue-400 hover:text-blue-300 link">Contact system administrator</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;