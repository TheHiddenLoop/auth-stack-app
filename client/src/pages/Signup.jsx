import { Mail, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuthStore } from '../store/useAuthStore.js';
import { authLoadingState } from '../atoms/atoms.js';
import { toast } from "react-hot-toast"


export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { signup } = useAuthStore();
  const loading = useRecoilValue(authLoadingState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isSignedUp = await signup(formData);

      if (isSignedUp) {
        setTimeout(() => navigate("/verify-email"), 100);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="shadow-2xl rounded-xl p-10 bg-white w-full max-w-md">
        <h1 className="font-bold text-3xl mb-8 text-center text-green-700">Signup Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-3 text-green-600" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 pr-4 py-2 w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

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
              'Create Account'
            )}
          </button>
          <div className="text-right mt-5">
            <p className="text-right mt-5 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-800 font-medium underline hover:text-green-900">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
