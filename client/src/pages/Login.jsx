import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from '../store/useAuthStore';
import { useRecoilValue } from 'recoil';
import { authLoadingState } from '../atoms/atoms';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuthStore();
  const loading = useRecoilValue(authLoadingState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isLoggin = await login(formData);

      if (isLoggin) {
        setTimeout(() => navigate("/"), 100);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="shadow-2xl rounded-xl p-10 bg-white w-full max-w-md">
        <h1 className="font-bold text-3xl mb-8 text-center text-green-700">Login Page</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-3 text-green-600" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="pl-10 pr-4 py-2 w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-green-600" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 py-2 w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-green-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right my-5">
            <p className="text-base-content/60">
              <Link to="/request-reset-password" className="text-green-800 font-normal underline hover:text-green-900">
                Reset Password
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              'Login'
            )}
          </button>
          <div className="text-right mt-5">
            <p className="text-right mt-5 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signup" className="text-green-800 font-medium underline hover:text-green-900">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
