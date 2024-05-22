import { RxHamburgerMenu } from "react-icons/rx"
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "../../ui/sheet"
import {Link} from "react-router-dom"
import { NAV_LINKS2 } from "../../../../constants"
import { SlLogout } from "react-icons/sl"

const MobileNav = () => {
  return (
    <section className="w-full max-w-[300px]">
         <Sheet>
              <SheetTrigger asChild>
                <RxHamburgerMenu size={24} />
              </SheetTrigger>
              <SheetContent side="right" className="border-none  bg-opacity-80 backdrop-filter backdrop-blur-sm flex flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 mt-10 ">
                    <img src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=600" alt="logo" className="h-[40px] rounded-full w-[40px]" />
                    <h2 className="text-sm font-semibold">Enoch Oyedeji</h2>
                </Link>

                <div className="flex  flex-col justify-between overflow-y-auto h-full">
                    <SheetClose asChild>
                        <section>
                        <ul className="flex flex-col w-full justify-center items-start gap-6 mt-4 h-full ">
                            {NAV_LINKS2.map((link)=>( 
                              <SheetClose asChild key={link.href}>  
                                <Link to="/courses">
                                <li key={link.key}
                                 className="text-[18px] text-semibold  cursor-pointer hover:font-bold hover:text-[#201658] transition duration-150">{link.label}</li>
                                 <hr  className="w-full"/>
                                 </Link>
                                 </SheetClose>
                            ))}
                        </ul>
                        </section>
                    </SheetClose>


                    <button className="px-4 bg-blue-700 py-3 rounded-lg flex items-center gap-2 justify-center text-white font-semibold ">
                      Logout <SlLogout size={20} />
                    </button>

                </div>
              </SheetContent>
            </Sheet>
            
    </section>
  )
}

export default MobileNav