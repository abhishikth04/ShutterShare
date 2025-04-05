import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Shutter from "./assets/Shutter.png";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start", "end"] });

  // Image zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 3]); // Zooms 3x at 50% scroll
  const opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]); // Blackout transition

  return (
    <section ref={ref} className="h-screen w-full relative flex justify-center items-center overflow-hidden">
      
      {/* Shutter Image Zoom Effect */}
      <motion.img 
        src={Shutter} 
        alt="Shutter" 
        className="absolute w-[300px] h-[300px]" // Adjust size as needed
        style={{ scale }}
      />

      {/* Black Overlay Effect */}
      <motion.div 
        className="absolute inset-0 bg-black" 
        style={{ opacity }}
      />

    </section>
  );
};

export default Hero;
