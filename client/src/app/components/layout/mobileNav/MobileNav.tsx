import { RxHamburgerMenu } from "react-icons/rx"
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "../../ui/sheet"
import {Link, useNavigate} from "react-router-dom"
import { NAV_LINKS2 } from "../../../../constants"
import { SlLogout } from "react-icons/sl"
import { useAppSelector } from "../../../redux/hooks"
import { useLazyLogoutQuery } from "../../../redux/api/authApi"

const MobileNav = () => {
  const navigate =useNavigate()
  const [logout, {}]=useLazyLogoutQuery()
  const {user} =useAppSelector((state)=>state.auth)

  const handleLogout =()=>{
    logout()
    navigate(0)
}
  return (
    <section className="w-full max-w-[300px]">
         <Sheet>
              <SheetTrigger asChild>
                <RxHamburgerMenu size={30} className="text-white cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="right" className="border-none  bg-opacity-80 backdrop-filter backdrop-blur-sm flex flex-col gap-6">
               {user && <Link to="/" className="flex items-center gap-2 mt-10 ">
                    <img src={user?.avatar?.url ? user?.avatar?.url : "/noavatar.png"} alt="img" className="w-[40px] rounded-full h-[40px]" />
                    <h2 className="text-sm font-semibold">{user?.name}</h2>
                </Link>}

                <div className="flex  flex-col justify-between overflow-y-auto h-full">
                    <SheetClose asChild>
                        <section>
                        <ul className="flex flex-col w-full justify-center items-start gap-6 mt-4 h-full ">
                            {NAV_LINKS2.map((link)=>( 
                              <SheetClose asChild key={link.href}>  
                                <Link to={link.href}>
                                <li key={link.key}
                                 className="text-[18px] text-semibold  cursor-pointer hover:font-bold hover:text-[#201658] transition duration-150">{link.label}</li>
                                 <hr  className="w-full"/>
                                 </Link>
                                 </SheetClose>
                            ))}
                        </ul>
                        <SheetClose>
                                 <a href="https://the-rising-star-academy-dashboard-goz8.vercel.app/"
                                 className="text-[18px] text-semibold  cursor-pointer hover:font-bold hover:text-[#201658] transition duration-150">Dashboard</a>
                
                        </SheetClose>
                        </section>
                    </SheetClose>


                  {user ? 
                   
                   <button onClick={handleLogout} className="px-4 bg-slate-950 py-3 rounded-lg flex items-center gap-2 justify-center text-white font-semibold ">
                      Logout <SlLogout size={20} />
                    </button>
                  :  
                  <button className="px-4 bg-slate-950 py-3 rounded-lg flex items-center gap-2 justify-center text-white font-semibold ">
                  Login/Sign up <SlLogout size={20} />
                </button>
                  }

                </div>
              </SheetContent>
            </Sheet>
            
    </section>
  )
}

export default MobileNav