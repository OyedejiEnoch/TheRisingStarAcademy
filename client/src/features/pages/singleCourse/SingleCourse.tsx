import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../app/components/ui/accordion"
import Lectures from "../../../app/components/singleCourse/lectures/Lectures"
import About from "../../../app/components/singleCourse/about/About"
import { useNavigate, useParams } from "react-router-dom"
import { useLazyEnrollCourseQuery, useSingleCourseQuery } from "../../../app/redux/api/coursesApi"
import Spinner from "../../../app/components/spinner/Spinner"
import { useAppSelector } from "../../../app/redux/hooks"
import { toast } from "react-toastify"
  

type Course ={
  _id:string,
  title:string,
  description:string,
  summary:string,
  body:string,
  about:string,
  benefits:[],
  topics:[{
      title:string,
      body:string,
      summary:string
  }],
  author:string,
  subCourses:string[],
  image:{
      public_id:string,
      url:string
  }
}

const SingleCourse = () => {

  const navigate=useNavigate()
    const params=useParams()
    const {user}=useAppSelector((state)=>state.auth)
    const {data, isLoading} = useSingleCourseQuery((params.id as string))
    const [enrollCourse,{isLoading:isEnrollLoading}]=useLazyEnrollCourseQuery()
    const [contentChange, setContentChange]= useState("Default")

    console.log(data)
    console.log(params.id)

    const handleEnrollCourse =()=>{
      if(!user){
        navigate("/auth/login")
        toast.error("Login first to enroll")
      }else{
       enrollCourse((params.id as string))
      }
    }

    const findEnrolledCourse =  user?.myCourses.find((course)=> course === params.id)

    if(isLoading){
      return <Spinner />
    }

  return (
    <section className="w-full flex mb-20 ">
        <div className="w-full flex flex-col sm:flex-row p-2 ">
       
        {/* left */}
        <div className="flex flex-col w-full sm:w-[70%] ">
            <div className="w-full h-[300px] sm:h-[500px]">
            <img src={data?.course.image?.url ? data.course.image?.url : "/default_product.png" } alt="img" 
            className="object-cover w-full h-full "/>
            </div>

            <div className="w-full mt-4">
                <div className="flex items-center gap-4 p-4 overflow-x-auto">
                    <span className="font-semibold bg-black px-4 py-2 rounded-full text-white cursor-pointer text-sm " onClick={()=>setContentChange("Default")}>About</span>
                    <span className="font-semibold bg-black px-4 py-2 rounded-full text-white cursor-pointer text-sm" onClick={()=>setContentChange("Lectures")}>Lectures</span>
                    <span className="font-semibold bg-black px-4 py-2 rounded-full text-white cursor-pointer text-sm" onClick={()=>setContentChange("SubCourses")}>SubCourses</span>
                </div>
            </div>
            <hr className="mt-4"  />

            {contentChange ==="Default" ?  
            (
            <>
              <About course={(data?.course as Course)} />
            </>
            )
        : contentChange === "Lectures" ? 
            (
                <>
                    <Lectures course={(data?.course as Course)} />   
                </>
            )  
        : contentChange === "SubCourses" ?
            (
              <>
                <div className="p-2 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
                <div>
                  <h1 className="font-bold text-[32px]">Sub Courses</h1>
                  <p className="text-sm text-gray-500 ">{data?.course?.subCourses.length} Sub-Courses- 23 lectures-</p>
                </div>


                  <div className=" w-full sm:w-[70%] p-2 sm:p-4">
                  <Accordion type="single" collapsible>
                    {data?.course?.subCourses.map((subCourse)=>(
                         <AccordionItem value="item-1 " className=" border-b border-gray-200">
                         <AccordionTrigger className="font-semibold text-[16px] sm:text-[18px]">{subCourse}</AccordionTrigger>
                         <AccordionContent>
                          {subCourse}
                         </AccordionContent>
                       </AccordionItem>
                    ))
                    }
                  
                  </Accordion>
                  </div>
                </div>
              </>
            )
          : ""
        }
        </div>

        {/* right */}
        <div className="hidden sm:flex flex-1 justify-end sticky top-0 w-[46%] right-0 z-20">
            <div className="flex w-[90%] ">
                {<div className="w-full flex flex-col justify-between h-[400px] bg-white border border-gray-200 p-4">
                    <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-[20px] sm:text-[22px] text-gray-800 font-inter">Summary</h2>
                    <hr />
                    

                    <p className="text-sm text-gray-600">{data?.course?.summary}</p>
                    </div>
                    
                    {!user ?
                    <button onClick={handleEnrollCourse} className="font-inter w-full bg-slate-950 px-6 py-4 text-white text-[16px] font-semibold cursor-pointer rounded-md">{isEnrollLoading? "Loading ":"Enroll Today"}</button>
                    : 
                      findEnrolledCourse ? "" :
                    
                      <button onClick={handleEnrollCourse} className="font-inter w-full bg-slate-950 px-6 py-4 text-white text-[16px] font-semibold cursor-pointer rounded-md">{isEnrollLoading? "Loading ":"Enroll Today"}</button>
                    
                    }

                </div>}
            </div>
        </div>

        </div>
    </section>
  )
}

export default SingleCourse