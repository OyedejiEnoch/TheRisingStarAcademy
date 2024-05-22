import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../../app/redux/api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate=useNavigate()
  // const {isAuthenticated}=useAppSelector((state)=>state.user)
  const [open, setOpen]=useState(false)

  const [register,{error, isLoading, isSuccess}]= useRegisterMutation()

  const [credentials, setCredentials]=useState({
    name:"",
    email:"",
    password:""
  })

  useEffect(()=>{
    if(error){
      const customError = error as {
          status: number;
          data: {
            message:string |[""]
          };
          // Add any other properties that your error object contains
        };
      if(typeof customError.data.message === "string"){
          toast.error(customError.data?.message )
        }else{
            toast.error(customError.data?.message[0])
      }      
  }
  if(isSuccess){
      toast.success("Registered Successfully")
      navigate("/")
  }

  },[error, isSuccess])

  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target

    setCredentials((prevValue)=>{
      return {...prevValue, [name]:value}
    })
  }

  const {name, email, password}= credentials
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const validName=/^[a-z A-Z]+$/
    const validEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!name.trim()) return toast.error("Name is missing")
    if(!validName.test(name)) return toast.error("Invalid name")
    if(!validEmail.test(email)) return  toast.error("Invalid email")
    if(!password.trim()) return toast.error("Password is missing")
    if(password.length < 6) return toast.error("Password must be more than 6 characters")

    register(credentials)
  }

  return (
    <section className="w-full  ">
      <div className="w-full flex justify-center items-center h-screen  ">

        {/* left */}
        <div className="flex-1 hidden sm:flex ">
          <div className="w-full relative">
          <h2 className="absolute bottom-10 right-10 font-inter text-white">Rising Star Academy</h2>
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
            <img src="/background.jpg" alt="background " className="h-screen w-full" />
          </div>
        </div>

          {/* right */}
          <div className="flex-2 w-full sm:w-[50%] flex flex-col items-center justify-center bg-white  px-6 sm:px-4 py-6 rounded-xl shadow ">
          <img src="/rsalogo.png" alt="logo" className="h-[70px]" />
            {/* <h1 className="text-[24px] sm:text-[28px] font-[700] text-center leading-[120%] font-inter">Welcome To RSA</h1> */}
            <p className="text-sm text-gray-500 mt-2 ">Register with Rising Star Academy today </p>

            <div className="flex  flex-col items-center gap-2 mt-4">
            <div className="border-[1px] border-solid border-slate-200 items-center justify-center flex p-3 rounded-full cursor-pointer">
            <span ><FcGoogle size={20} /></span>
            </div>
            <p className="text-sm text-gray-500 ">Or use email verification</p>
            </div>
{/*https://www.loom.com/share/8f38554bf6ad4428a65b03309c1e79c1?sid=e3e5d8bd-11c3-4aa0-a723-8990bdfc5113  */}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:w-[400px] mt-4 ">

            {/* <div className="flex justify-start items-start w-full">
              <h2 className=" text-start text-2xl font-bold font-inter">Register</h2>
            </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="Name" className="font-semibold text-[16px]" >Name</label>
              <div className="relative">
                <input 
                  id="Name" 
                  type="text" 
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  placeholder="Name" 
                  className="w-full px-10 py-2 rounded-sm border-[1px] border-gray-300 outline-blue-900"
                  />
                <FaUser size={16} className="absolute top-3 left-2 text-slate-950 " />
              </div>
            </div>

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
                    className="w-full px-10 py-2 rounded-lg border-[1px] border-gray-300 outline-blue-900"
                    />
                  <IoMdMail size={16} className="absolute top-3 left-2 text-slate-950 " />
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
                    className="w-full px-10 py-2 rounded-lg border-[1px] border-gray-300 outline-blue-900"
                    />
                  <MdPassword size={16} className="absolute top-3 left-2 text-slate-950 " />
                  {open ? 
                  <AiFillEye 
                    size={16}
                    onClick={()=>setOpen((prevValue)=> !prevValue)} 
                    className="absolute right-4 top-5 text-slate-950 cursor-pointer " /> :
                  
                  <AiFillEyeInvisible 
                    size={16} 
                    onClick={()=>setOpen((prevValue)=> !prevValue)} 
                    className="absolute right-4 top-3 text-slate-950 cursor-pointer " />}
                  
                </div> 
              </div>

              {/* <div className="flex flex-col gap-2">
                <label htmlFor="Name" className="font-semibold text-[16px]" >Name</label>
                <div className="relative">
                  <input 
                    id="Name" 
                    type="text" 
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    placeholder="Name" 
                    className="w-full px-10 py-4 rounded-lg border-[1px] border-gray-300 outline-blue-900"
                    />
                  <FaUser size={20} className="absolute top-5 left-2 text-[#5721B7] " />
                </div>
              </div> */}

              <button className="w-full px-6 py-3 bg-slate-950 hover:bg-gray-800 transition duration-150 shadow-md rounded-md text-white ">{isLoading ? "Loading" : "Register"}</button>
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

export default Register

https://www.loom.com/share/4c773f206fa84e4ebe40eb20a6ecf120?sid=aeb38c2b-473d-4768-bff8-f8264c941272

{/* <div className="flex flex-1 flex-col bg-white w-full items-center justify-center">
<h1 className="text-[32px] sm:text-[38px] font-[700] text-center leading-[120%]">Create Your Account</h1>
<p className="text-sm text-gray-500 ">Register with Rising Star Academy today</p>

<div className="flex  flex-col items-center gap-2 mt-6">
<div className="border-[1px] border-solid border-slate-200 items-center justify-center flex p-3 rounded-full cursor-pointer">
<span ><FcGoogle size={20} /></span>
</div>
<p className="text-sm text-gray-500 ">Or use email verification</p>
</div>

<form className="flex flex-col gap-4 w-full sm:w-[400px] mt-4 p-2">
  <div className="flex flex-col gap-2">
    <label htmlFor="Name" className="font-semibold text-[16px]" >Name</label>
    <div className="relative">
      <input 
        id="Name" 
        type="text" 
        name="name"
        value={credentials.name}
        onChange={handleChange}
        placeholder="Name" 
        className="w-full px-10 py-4 rounded-lg border-[1px] border-gray-300 outline-blue-900"
        />
      <FaUser size={20} className="absolute top-5 left-2 text-[#5721B7] " />
    </div>
  </div>

  <div className="flex flex-col gap-2">
    <label htmlFor="Email" className="font-semibold text-[16px]" >Email</label>
    <div className="relative">
      <input 
        id="Email" 
        type="email" 
        name="email"
        value={credentials.email}
        placeholder="Email" 
        className="w-full px-10 py-4 rounded-lg border-[1px] border-gray-300 outline-blue-900"
        />
      <IoMdMail size={20} className="absolute top-5 left-2 text-[#5721B7] " />
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
        placeholder="***" 
        className="w-full px-10 py-4 rounded-lg border-[1px] border-gray-300 outline-blue-900"
        />
      <MdPassword size={20} className="absolute top-5 left-2 text-[#5721B7] " />
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

  <button className="w-full px-6 py-4 bg-[#5721B7] hover:bg-gray-800 transition duration-150 shadow-md rounded-md text-white ">Register</button>
  <div className="flex justify-between items-center w-full mt-2">
  <Link to= {"/auth/login"}> <p className="text-gray-600 text-sm cursor-pointer">
     Have an Account?</p></Link>
     <Link to= {"/auth/forgot-password"}><p className="text-gray-600 text-sm cursor-pointer">Forgot Password</p></Link>
  </div>
</form>
  
</div> */}