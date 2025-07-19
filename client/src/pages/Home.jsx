import { useEffect, useState } from 'react';
import { userState } from '../atoms/atoms'
import { useRecoilValue } from 'recoil'
import { LogOut } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
export default function Home() {
  const users = useRecoilValue(userState);
  const user = { name: users.name }
  const {logout} =useAuthStore();
  const [displayText, setDisplayText] = useState("")
  const navigate = useNavigate();
  const fullName = user.name.charAt(0).toUpperCase() + user.name.slice(1)

  useEffect(() => {
    let timeoutId

    const typeText = () => {
      setDisplayText("")

      for (let i = 0; i <= fullName.length; i++) {
        timeoutId = setTimeout(() => {
          setDisplayText(fullName.slice(0, i))

          if (i === fullName.length) {
            setTimeout(() => {
              typeText()
            }, 1000)
          }
        }, i * 100)
      }
    }

    typeText()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [fullName])

  const handleClick=async()=>{
    try {
      const islogout = await logout();

      if (islogout) {
        setTimeout(() => navigate("/login"), 100);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center font-semibold text-3xl">

      <div onClick={handleClick} className="absolute top-4 right-4 cursor-pointer">
        <LogOut className='bg-green-700 h-[50px] w-[50px] p-2 text-white rounded-full hover:bg-green-400'/>
      </div>

      <div className="text-center">
        Hii There{" "}
        <span className="text-green-700 ml-2 relative">
          {displayText}
        </span>
      </div>
    </div>

  )
}
