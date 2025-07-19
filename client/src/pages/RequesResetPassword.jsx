import { Loader2, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authLoadingState } from '../atoms/atoms';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function RequesResetPassword() {
  const loading = useRecoilValue(authLoadingState);
  const [email, setEmail] = useState('');
  const { requestPassReset } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isRequesting = await requestPassReset(email);

      if (isRequesting) {
        setTimeout(() => navigate("/login"), 100);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md">

        <div className="flex justify-center mb-4">
          <div className="bg-green-700 p-3 rounded-full animate-bounce">
            <Mail className="text-white w-6 h-6" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-green-600 w-4 h-4" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 pr-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold text-white flex items-center justify-center gap-2 transition 
              ${loading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Link...
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="text-right mt-5 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signup" className="text-green-800 font-medium underline hover:text-green-900">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
