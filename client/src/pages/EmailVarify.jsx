import { useRef, useState } from "react";
import { authLoadingState, userState } from '../atoms/atoms'
import { useRecoilValue } from 'recoil'
import { Link, useNavigate } from "react-router-dom"

import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from "lucide-react";

export default function EmailVerify() {
  const inputRefs = useRef(Array(6).fill().map(() => null));
  const [otp, setOtp] = useState(Array(6).fill(""));
  const users = useRecoilValue(userState);
  const { verifyOtp } = useAuthStore();
  const navigate = useNavigate();
  const loading = useRecoilValue(authLoadingState);


  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData={
    //   email:users.email,
    //   otp:otp
    // }

    try {
      const isLoggin = await verifyOtp(users.email, otp.join(""));

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
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-8 text-center text-sm">
          Enter the 6-digit code we sent to <b>{users.email}</b>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-10 h-12 text-xl text-center font-bold text-green-700 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Verify...
            </>
          ) : (
            'Verify Otp'
          )}
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Didn't receive the code?{" "}
          <span className="text-green-700 underline cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
}
