import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RequesResetPassword from "./pages/RequesResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { authUserState, isCheckingAuthState } from "./atoms/checkAuth";
import useCheckAuth from "./atoms/useCheckAuth";
import EmailVerify from "./pages/EmailVarify";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const isChecking = useRecoilValue(isCheckingAuthState);
  const authUser = useRecoilValue(authUserState);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="font-poppins min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/request-reset-password" element={<RequesResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
