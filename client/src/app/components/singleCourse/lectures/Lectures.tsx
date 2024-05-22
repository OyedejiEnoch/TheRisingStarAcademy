import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"

const Lectures = () => {
  return (
    <div className="p-2 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
      <div>
        <h1 className="font-semibold text-[28px] mt-2 mb-2 sm:mb-4 ">What you will learn </h1>

        <ul className="flex flex-col gap-4 p-4">
          <li className="text-sm  text-gray-700 sm:text-[16px]" > <span className="font-extrabold mr-3 text-2xl">.</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis voluptatibus nemo corporis voluptates facere ut placeat laudantium </li>
          <li className="text-sm text-gray-700 sm:text-[16px]"><span className="font-extrabold mr-3 text-2xl">.</span>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis voluptatibus nemo corporis voluptates facere ut placeat laudantium </li>
          <li className="text-sm text-gray-700 sm:text-[16px]"><span className="font-extrabold mr-3 text-2xl">.</span>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis voluptatibus nemo corporis voluptates facere ut placeat laudantium </li>
          <li className="text-sm text-gray-700 sm:text-[16px]"><span className="font-extrabold mr-3 text-2xl">.</span>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis voluptatibus nemo corporis voluptates facere ut placeat laudantium</li>
        </ul>
      </div>


      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-[32px]">Course Content</h1>
          <p className="text-sm text-gray-500 ">10 sections- 23 lectures-</p>
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
    </div>
  )
}

export default Lectures