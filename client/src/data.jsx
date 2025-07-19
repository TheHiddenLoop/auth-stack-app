import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authUserState, isCheckingAuthState } from "./atoms/checkAuth.js";
import useCheckAuth from "./atoms/useCheckAuth.js";

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
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="font-poppins text-2xl font-bold text-center text-red-800">
      {authUser ? `Welcome, ${authUser.name}` : "Not logged in"}
    </div>
  );
}

export default App;
