import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-gray-300 p-4 sm:p-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between  gap-6">
        <div className="flex flex-col gap-2 flex-1"> 
          <div className="flex items-center gap-2">
            <img src="/rsalogo.png" alt="logo" className="w-[70px] text-white" />
            <h2 className="font-bold text-white text-[26px]">Rising Star Academy</h2>
          </div>
          <p className=" text-white max-w-[400px] ">Rising Stars Academy is an initiative, born from a deep passion and divine guidance, with a clear mission to nurture the potential in young adults by helping them discover their
           identity and purpose. We empower through quality education, coaching, and mentoring</p>
          
          <ul className="flex items-center gap-2 mt-4">
            <li><FaLinkedin size={24} className="text-white" /></li>
            <li><FaSquareXTwitter size={24} className="text-white" /></li>
            <li><FaInstagramSquare size={24} className="text-white" /></li>
          </ul>
        </div>

        {/* right */}

        <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-between flex-1">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-white text-[18px] sm:text-[20px] font-inter">Pages</h2>

            <ul className="flex flex-col gap-2">
              <li className="text-[15px] cursor-pointer">About</li>
              <li className="text-[15px] cursor-pointer">Courses</li>
              <li className="text-[15px] cursor-pointer">Facilitators</li>
              <li className="text-[15px] cursor-pointer">Dashboard</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-white text-[18px] sm:text-[20px] font-inter">Features</h2>

            <ul className="flex flex-col gap-2">
              <li className="text-[15px] cursor-pointer">About</li>
              <li className="text-[15px] cursor-pointer">Courses</li>
              <li className="text-[15px] cursor-pointer">Facilitators</li>
              <li className="text-[15px] cursor-pointer">Dashboard</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-white text-[18px] sm:text-[20px] font-inter">Contact</h2>

            <ul className="flex flex-col gap-2">
              <li className="text-white flex items-center gap-3"><IoCall size={24} /> +2349025766940</li>
              <li className="text-white flex items-center gap-3"><IoMdMail size={24} /> info@therisingstaracademy.com</li>
              <li className="text-white flex items-center gap-3"><IoLocation size={24} /> Lagos state, Nigeria</li>
           
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center mt-10 text-[14px]">@RisingStarAcademy|2024</h2>
      </div>
    </footer>
  )
}

export default Footer