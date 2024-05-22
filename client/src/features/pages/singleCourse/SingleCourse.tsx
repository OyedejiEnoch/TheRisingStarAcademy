import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../app/components/ui/accordion"
import Lectures from "../../../app/components/singleCourse/lectures/Lectures"
import About from "../../../app/components/singleCourse/about/About"
  

const SingleCourse = () => {

    const [contentChange, setContentChange]= useState("Default")

  return (
    <section className="w-full flex mb-20 ">
        <div className="w-full flex flex-col sm:flex-row p-2 ">
       
        {/* left */}
        <div className="flex flex-col w-full sm:w-[70%] ">
            <div className="w-full h-[300px] sm:h-[500px]">
            <img src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img" 
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
              <About />
            </>
            )
        : contentChange === "Lectures" ? 
            (
                <>
                    <Lectures />   
                </>
            )  
        : contentChange === "SubCourses" ?
            (
              <>
                <div className="p-2 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
                <div>
                  <h1 className="font-bold text-[32px]">Sub Courses</h1>
                  <p className="text-sm text-gray-500 ">10 Sub-Courses- 23 lectures-</p>
                </div>


                  <div className=" w-full sm:w-[70%] p-2 sm:p-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1 " className=" border-b border-gray-200">
                      <AccordionTrigger className="font-semibold text-[16px] sm:text-[18px]">Introduction</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="font-semibold text-[16px] sm:text-[18px]">What is Emotional Intelligence </AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="font-semibold text-[16px] sm:text-[18px]">Introduction</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
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
                <div className="w-full flex flex-col justify-between h-[400px] bg-white border border-gray-200 p-4">
                    <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-[20px] sm:text-[22px] text-gray-800 font-inter">Summary</h2>
                    <hr />
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat temporibus omnis minus sunt alias, possimus incidunt, sit porro placeat pariatur excepturi ullam illum, molestiae odit! Rerum, consectetur? Animi, ex placeat?</p>
                    </div>
                    

                    <button className="font-inter w-full bg-[#5721B7] px-6 py-4 text-white text-[16px] font-semibold cursor-pointer rounded-md">Enroll Today</button>
                </div>
            </div>
        </div>

        </div>
    </section>
  )
}

export default SingleCourse