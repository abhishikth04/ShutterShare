import { motion } from "framer-motion";
import { SendHorizontal } from 'lucide-react';
import Shutter from "./assets/Shutter.png";

const Title = () => {
    return(

        <section className="relative flex justify-center items-center pt-20 overflow-hidden">
        
        
        <div className="flex items-center justify-center gap-3 relative">
          
         
          <motion.div 
            className="relative z-10"  
            style={{ overflow: "hidden" }}  
            initial={{ x: 200, width: 0 }}
            animate={{ x: 0, width:"100%" }}
            transition={{ duration: 3, ease: "easeIn", delay: 0.9 }}
          >
            <p className="text-white text-[99px] w-114 font-bold drop-shadow-[1px_2px_6px_white]">SHUTTER</p>
          </motion.div>

          
          <motion.img 
            src={Shutter} 
            alt="Shutter" 
            className="h-[360px] relative z-20 saturate-150"  
            initial={{ opacity: 1 }}
            animate={{ rotate: [0, 270], opacity: 1 }}
            transition={{ duration: 4, ease: "linear", delay: 0.2 }}
          />

          
          <motion.div 
            className="relative z-10"  
            style={{ overflow: "hidden" }}  
            initial={{ x: -200, width: 0 }}
            animate={{ x: 0, width:"100%" }}
            transition={{ duration: 3, ease: "easeIn", delay: 0.9 }}
          >
            <div className="flex flex-row">
              <p className="text-white text-[99px] font-bold drop-shadow-[1px_2px_6px_white]">SHARE</p> 
              <SendHorizontal className="text-white" size={72} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </motion.div>

        </div>

      </section>
    );
}

export default Title;