import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SendHorizontal } from "lucide-react";
import Shutter from "./assets/Shutter.png";

const Title = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 9]); 
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 520]); 
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]); 
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]); 
  const contentOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]); 

  return (
    <>
      <section
        className="relative flex flex-col justify-start items-center h-[300vh] bg-black overflow-hidden"
        ref={containerRef}
      >
        
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <motion.div
            className="flex items-center justify-center gap-2 relative"
            style={{ opacity }}
          >
            
            <motion.div
              className="relative z-10"
              style={{ opacity: textOpacity }}
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
            >
              <p className="text-white text-[99px] font-bold drop-shadow-[1px_2px_6px_white]">
                SHUTTER
              </p>
            </motion.div>

            <motion.img
              src={Shutter}
              alt="Shutter"
              className="relative z-20 w-[400px] h-auto saturate-200"
              initial={{ rotate: 270, scale: 1 }} 
              animate={{ rotate: 0 }} 
              style={{ scale, rotate, opacity }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            />


            <motion.div
              className="relative z-10"
              style={{ opacity: textOpacity }}
              initial={{ x: -450, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            >
              <div className="flex flex-row">
                <p className="text-white text-[99px] font-bold drop-shadow-[1px_2px_6px_white]">
                  SHARE
                </p>
                <SendHorizontal className="text-white" size={72} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Next Content  */}
      <section className="h-screen flex justify-center bg-black px-2.5 py-2.5">
        <motion.div
          className="text-center"
          style={{ opacity: contentOpacity }}
        >
          <h1 className="text-white text-5xl font-bold">Welcome to ShutterShare!</h1>
          <p className="text-gray-300 mt-4 text-lg max-w-2xl">
            A seamless way to share your best memories effortlessly.
          </p>
        </motion.div>
      </section>

      <section>
        <div>
          <h1 className="font-[50px] text-white">Hello World</h1>
        </div>
      </section>
    </>
  );
};

export default Title;
