import { NAV_LINKS } from "../../../../constants"
import {SlLogout} from "react-icons/sl"
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import MobileNav from "../mobileNav/MobileNav.tsx"
import { useUserProfileQuery } from "../../../redux/api/userApi.ts";

const Navbar = () => {

  const {} =useUserProfileQuery()
  // console.log(data)
  const {user} = useAppSelector ((state) => state.auth)

    const [isScrolled, setIsScrolled]=useState(false)

    const isActive = () => {
        window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
      };

    useEffect(()=>{
        window.addEventListener("scroll", isActive);
    
        return () => {
          window.removeEventListener("scroll", isActive);
        };
    }, [])


  return (
    <nav className={`${isScrolled ? " sticky top-0 right-0 z-50 bg-transparent text-black bg-opacity-90 backdrop-filter backdrop-blur-sm" : ""}   z-50 w-full bg-slate-950 transition`}>
        <div className="max-w-6xl mx-auto flex items-center px-2 py-4 justify-between ">
            {/* logo */}
            <div>
                <img src="/rsalogo.png" alt="logo" className="h-[50px] sm:h-[70px] text-white" />
                {/* <h1 className={`${ isScrolled ? "text-black" : "text-[#201658]"} text-[20px] `}>RisingStarAcademy</h1> */}
            </div>

            {/* mid menu */}
            <ul className=" hidden sm:flex items-center gap-6 ">
                {NAV_LINKS.map((link)=>(
                    <Link to={link.href}>
                    <li key={link.key}
                     className="text-[16px] text-white cursor-pointer hover:font-bold hover:text-[#201658] transition duration-150">{link.label}</li>
                     </Link>
                ))}
            </ul>

            {/* right menu */}
            <div className="hidden sm:flex items-center gap-6">
               {user ? <>
              <button className=" text-[16px] text-white flex items-center gap-2 hover:font-semibold transition duration-150">
                <span className="text-black"> <FaUser  size={20} /></span>Dashboard</button>


                <button className={`text-[16px] text-white  flex items-center gap-2 hover:font-semibold transition duration-150`}>
                <span><SlLogout size={20} /></span>Logout</button>
                </>
            
                :
                <>
                <Link to="/auth/login" className="text-[16px]  text-white flex items-center gap-2 hover:font-semibold transition duration-150">
                <span><SlLogout size={20} /></span>Login/SignUp</Link>
                </>
            }
            </div>
            
            
            <div className="sm:hidden">
            <MobileNav />
            </div>
        </div>
    </nav>
  )
}

export default Navbar


// https://www.loom.com/share/db7a10842f7c41d1930bb0ff4ddf56ad?sid=3e8188dc-ea7a-4afd-bf2f-3c748f8b7cc9