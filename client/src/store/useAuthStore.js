import { useSetRecoilState } from "recoil";
import { axiosInstance } from "../lib/axios.js";
import { userState, authLoadingState } from "../atoms/atoms.js";
import { toast } from "react-hot-toast"
import { authUserState } from "../atoms/checkAuth.js"

export function useAuthStore() {
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(authLoadingState);
  const setAuthUser = useSetRecoilState(authUserState);


  const signup = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/signup", formData);
      setUser(res.data.user);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };


  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/login", formData);

      if (!res.data.user.isVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }
      const user = res.data.user;
      console.log(user);

      setUser(user);
      setAuthUser(user);
      toast.success(res.data.message);

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/verify/otp", {email, otp});

      const user = res.data.user;
      console.log(user);

      setAuthUser(user);
      toast.success(res.data.message);

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const requestPassReset = async (email) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/reset/password", {email});
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/reset-password", {token, password});
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.post("/logout", {}, {
      withCredentials: true 
    });
    setUser(null);
    setAuthUser(false);
    toast.success(res.data.message);
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Logout failed"); 
    return false;
  } finally {
    setLoading(false);
  }
};


  return {
    signup,
    login,
    verifyOtp,
    requestPassReset,
    resetPassword,
    logout
  };
}
