import { LiaPrayingHandsSolid } from "react-icons/lia";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { FaHands } from "react-icons/fa";
// import { IoTelescope } from "react-icons/io5";
// import { TiZoom } from "react-icons/ti";

const About = () => {

  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  return (
    <section className="max-w-6xl mx-auto  flex flex-col sm:flex-row  justify-between gap-4 p-4">
       
            {/* left */}
            <div className="flex flex-col gap-2 " >
                <p>About Us</p>
                <h2 className="text-[42px] font-inter font-semibold">About Rising Star Academy</h2>
                <p className="text-[16px] text-gray-600 max-w-[600px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nisi neque cupiditate voluptatibus libero eius, aliquid provident animi. Eaque officiis 
                ipsa in, veritatis perferendis voluptas vitae fugiat illum corrupti ab.
                veritatis perferendis voluptas vitae fugiat illum corrupti ab.
                veritatis perferendis voluptas vitae fugiat illum corrupti ab.
                veritatis perferendis voluptas vitae fugiat illum corrupti ab.
                veritatis perferendis voluptas vitae fugiat illum corrupti ab.
                </p>
                <button className="px-6 py-4 bg-[#0F1035] text-white font-semibold w-[200px] rounded-full">View More</button>
            </div>

            {/* right */}
            <div className="">
                <img src="https://images.pexels.com/photos/2574616/pexels-photo-2574616.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className=" h-[600px] " alt="Circular Image" />
            </div>

       
    </section>
  )
}

export default About


// animate={controls}
// initial="hidden"
// variants={{
//   visible: { opacity: 1 },
//   hidden: { opacity: 0 }
// }}
// transition={{ duration: 0.5 }}