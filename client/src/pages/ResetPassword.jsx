import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authLoadingState } from '../atoms/atoms';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export default function ResetPassword() {
  const loading = useRecoilValue(authLoadingState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const success = await resetPassword(token, password);
      if (success) {
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
      toast.error('Reset failed. Please try again.');
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
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">New Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-green-600" />
              <input
                type="password"
                required
                placeholder="Enter new password"
                className="pl-10 pr-10 py-2 w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-green-600" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="Confirm password"
                className="pl-10 pr-10 py-2 w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-green-600"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
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
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="text-right mt-5 text-sm text-gray-600">
            Back to sign up?{' '}
            <Link to="/signup" className="text-green-800 font-medium underline hover:text-green-900">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
