import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"

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
  subCourses:[],
  image:{
      public_id:string,
      url:string
  },
  author:string
}

type Props ={
  course:Course
}



const Lectures = ({course}:Props) => {
  return (
    <div className="p-2 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
      <div>
        <h1 className="font-semibold text-[28px] mt-2 mb-2 sm:mb-4 ">What you will learn </h1>

        <ul className="flex flex-col gap-4 p-4">
         {course.benefits.map((benefit)=>( 
           <li className="text-sm  text-gray-700 sm:text-[16px]" > 
           <span className="font-extrabold mr-3 text-2xl">.</span> {benefit}</li>
         ))} 
        </ul>
      </div>


      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-[32px]">Course Content</h1>
          <p className="text-sm text-gray-500 ">{course.topics.length} sections- 23 lectures-</p>
        </div>
      
      <div className=" w-full sm:w-[70%] p-2 sm:p-4">
         {course?.topics.length < 1 ? <h2 className="text-[18px]">No topics for this course yet</h2> : ""  }

      <Accordion type="single" collapsible>
        {course.topics.map((topic)=>(

          <AccordionItem value="item-1 " className=" border-b border-gray-200">
          <AccordionTrigger className="font-semibold text-[16px] sm:text-[18px]">{topic.title}</AccordionTrigger>
          <AccordionContent>
           {topic.body}
          </AccordionContent>
          </AccordionItem>

        ))
          
        
        }
       
      </Accordion>

      </div>
      
      </div>
    </div>
  )
}

export default Lectures