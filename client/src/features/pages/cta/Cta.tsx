import { motion } from "framer-motion";
import { LampContainer } from "../../../app/components/ui/lamp";

export function Cta() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-2 bg-gradient-to-br from-slate-600 to-slate-950 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Register With  <br /> The Rising Star Academy

      </motion.h1>
        {/* <button className="text-center bg-black text-white px-6 py-4">Register</button> */}
    </LampContainer>
  );
}
