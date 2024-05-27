import {NAV_LINKS} from "../../../constants"
import { FaPeopleGroup } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";

import { PiChats } from "react-icons/pi";
import { IoMdCodeWorking } from "react-icons/io";
import { FaPeopleArrows } from "react-icons/fa6";

const Features = () => {
  return (
    <section className="px-6 py-4  bg-white mt-8">
        <div className="flex flex-col w-full gap-6 items-center justify-center ">
            <div className="flex flex-col gap-2 items-center justify-center">
                <span className="text-xl sm:text-[18px] font-medium text-[#8576FF]">Services</span>
                <h2 className="font-semibold text-[32px] sm:text-[52px] text-[#0F1035]">What do we offer?</h2>
                <p className="text-sm text-gray-500 text-center">With experience from our various tutors, what we offer at RSA are: </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-white flex flex-col w-[350px] border border-gray-100 rounded-lg">

                    <div className="w-[80px] flex justify-center items-center bg-[#e3ebf7] rounded-br-[50%] h-[70px]">
                        <span><IoBookOutline  size={30} className="text-[#102C57] " /></span>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[350px] px-8 py-4 ">
                        <h2 className="font-semibold text-[20px] font-inter">One on One mentorship</h2>
                        <p className="text-sm text-gray-600">One on One mentorship from industry professionals. We believe in the power of one-on-one mentorship to unlock hidden talents and shape the character of future leaders</p>
                    </div>
                </div>
                
                <div className="bg-white flex flex-col w-[350px] border border-gray-100 rounded-lg">
                    <div className="w-[80px] flex justify-center items-center bg-[#e3ebf7] rounded-br-[50%] h-[70px]">
                         <span><FaPeopleGroup size={30} className="text-[#102C57]" /></span>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[350px] px-8 py-4">
                        <h2 className="font-semibold text-[20px] font-inter">Community to grow</h2>
                        <p className="text-sm text-gray-600">A wholesome community to interact and grow. We foster and develop a community for everyone to fill and grow in. A community that fits everyone's needs and foster a healthy relationship</p>
                    </div>
                </div>

                <div className="bg-white flex flex-col w-[350px] border border-gray-100 rounded-lg">
                    <div className="w-[80px] flex justify-center items-center bg-[#e3ebf7] rounded-br-[50%] h-[70px]">
                        <span><PiChats size={30} className="text-[#102C57]" /></span>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[350px]  px-8 py-4">
                        <h2 className="font-semibold text-[20px] font-inter">Instant Communication</h2>
                        <p className="text-sm text-gray-600">Welcome to MailJet, the best transactional email service on the web. We provide reliable, scalable, and customizable email solutions for your business. Whether you're sending order confirmations,</p>
                    </div>
                </div>

                <div className="bg-white flex flex-col w-[350px] border border-gray-100 rounded-lg">
                    <div className="w-[80px] flex justify-center items-center bg-[#e3ebf7] rounded-br-[50%] h-[70px]">
                        <span><IoMdCodeWorking size={30} className="text-[#102C57]" /></span>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[350px]  px-8 py-4">
                        <h2 className="font-semibold text-[20px] font-inter">Projects for skills</h2>
                        <p className="text-sm text-gray-600">Practical projects to showcase your newfound skills Whether you're sending order confirmations,</p>
                    </div>
                </div>

                <div className="bg-white flex flex-col w-[350px] border border-gray-100 rounded-lg">
                    <div className="w-[80px] flex justify-center items-center bg-[#e3ebf7] rounded-br-[50%] h-[70px]">
                        <span><FaPeopleArrows size={30} className="text-[#102C57]" /></span>
                    </div>
{/* 1E0342 */}
                    <div className="flex flex-col gap-2 max-w-[3500px] px-8 py-4">
                        <h2 className="font-semibold text-[20px] font-inter">Networking</h2>
                        <p className="text-sm text-gray-600">Networking opportunities with peers and mentors scalable, and customizable email solutions for your business. Whether you're sending order confirmations,</p>
                    </div>
                </div>
                 
                <div className="bg-white flex flex-col w-[350px] border border-gray-100 rounded-lg">
                    <div className="w-[80px] flex justify-center items-center bg-[#e3ebf7] rounded-br-[50%] h-[70px]">
                        <span><IoMdCodeWorking size={30} className="text-[#102C57]" /></span>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[350px] px-8 py-4">
                        <h2 className="font-semibold text-[20px] font-inter">Networking</h2>
                        <p className="text-sm text-gray-600">Networking opportunities with peers and mentors scalable, and customizable email solutions for your business. Whether you're sending order confirmations,</p>
                    </div>
                </div>
                


            </div>
        </div>
    </section>
  )
}

export default Features