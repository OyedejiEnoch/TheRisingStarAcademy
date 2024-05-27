import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../../app/redux/api/authApi";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
// import Navbar from "../../../app/components/layout/navbar/Navbar"

const Login = () => {

  const navigate =useNavigate()
  const [login, {isLoading, isSuccess, error}]=useLoginMutation()
  const [open, setOpen]=useState(false)

  useEffect(()=>{
    if(error){
      const customError = error as {
          status: number;
          data: {
            message:string
          };
          // Add any other properties that your error object contains
        };
      toast.error(customError.data?.message)
  }

    if(isSuccess){
      toast.success("Logged in successfully")
      navigate("/")
    }

  }, [error, isSuccess])

  const [credentials, setCredentials]=useState({
    email:"",
    password:""
  })

  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target

    setCredentials((prevValue)=>{
      return {...prevValue, [name]:value}
    })
  }
  
  const {email, password}= credentials
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    // const validName=/^[a-z A-Z]+$/
    const validEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    if(!validEmail.test(email)) return  toast.error("Invalid email")
    if(!password.trim()) return toast.error("Password is missing")
    if(password.length < 6) return toast.error("Password must be more than 6 characters")

    login(credentials)
  }

  return (
    <section className="w-full ">
      {/* <Navbar /> */}
      <div className="w-full flex justify-center items-center h-screen ">
     

          {/* right */}
          <div className="flex flex-col items-center justify-center bg-white w-full sm:w-[40%] px-6 sm:px-4 py-6 rounded-xl shadow ">
            <h1 className="text-[24px] sm:text-[28px] font-[700] text-center leading-[120%]">Login To Your Account</h1>
            <p className="text-sm text-gray-500 mt-2 ">Welcome back to Rising Star Academy </p>

            <div className="flex  flex-col items-center gap-2 mt-6">
            <div className="border-[1px] border-solid border-slate-200 items-center justify-center flex p-3 rounded-full cursor-pointer">
            <span ><FcGoogle size={20} /></span>
            </div>
            <p className="text-sm text-gray-500 ">Or use email verification</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full sm:w-[400px] mt-4 ">
         

              <div className="flex flex-col gap-2">
                <label htmlFor="Email" className="font-semibold text-[16px]" >Email</label>
                <div className="relative">
                  <input 
                    id="Email" 
                    type="email" 
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    className="w-full px-10 py-3 rounded-lg border-[1px] border-gray-300 outline-blue-900"
                    />
                  <IoMdMail size={20} className="absolute top-4 left-2 text-[#5721B7] " />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Password" className="font-semibold text-[16px]" >Password</label>
                <div className="relative">
                  <input 
                    id="Password" 
                    type={open ? "text" :"password"} 
                    name="password" 
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="***" 
                    className="w-full px-10 py-3 rounded-lg border-[1px] border-gray-300 outline-blue-900"
                    />
                  <MdPassword size={20} className="absolute top-4 left-2 text-[#5721B7] " />
                  {open ? 
                  <AiFillEye 
                    size={20}
                    onClick={()=>setOpen((prevValue)=> !prevValue)} 
                    className="absolute right-4 top-5 text-[#5721B7] cursor-pointer " /> :
                  
                  <AiFillEyeInvisible 
                    size={20} 
                    onClick={()=>setOpen((prevValue)=> !prevValue)} 
                    className="absolute right-4 top-5 text-[#5721B7] cursor-pointer " />}
                  
                </div> 
              </div>

              <button className="w-full px-6 py-3 bg-[#5721B7] hover:bg-gray-800 transition duration-150 shadow-md rounded-md text-white ">{isLoading ? "Loading..." :"Register"}</button>
              <div className="flex flex-col justify-center gap-4 items-center w-full mt-2">
                <p className="text-gray-600 text-sm cursor-pointer flex items-center gap-2"> Do not have an account? <Link to= {"/auth/register"} className="font-bold text-black ">Sign Up</Link></p>
               <p className="text-gray-600 text-sm cursor-pointer"> <Link to= {"/auth/register"}>Forgot Password? </Link></p>
              </div>
            </form>
              
          </div>
      </div>
    </section>
  )
}

export default Login