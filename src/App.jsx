
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { SendHorizontal } from 'lucide-react';
import Shutter from "./assets/Shutter.png";

const App = () => {
  return (
    <>
      <Navbar/>
      
      <section>
  <div className="flex flex-row justify-center items-center pt-20">
        <motion.div initial = {{scale:1 , x:200}}
                    animate = {{x:0, scale:1}}
                    transition = {{duration: 4 , ease:"easeIn" , delay:3}}>
          <p className="text-white text-[130px]">Shutter</p>
        </motion.div>

        <div>
        <motion.img src={Shutter} alt="Shutter" className="h-90 z-50"
        initial={{ opacity: 0}}
        animate={{ rotate: 270, opacity: 1}}
        transition={{ duration: 5, ease: "linear" }}/>
      </div>

      <motion.div initial = {{scale:1 , x:-100}}
                    animate = {{x:0, scale:1}}
                    transition = {{duration: 4 , ease:"easeIn", delay:3}}>
        <div className="flex flex-row">
        <p className="text-white text-[130px]">Share</p> <SendHorizontal className="text-white" size ={58}/>
        </div>
      </motion.div>

  </div>
      </section>
  </> 
  );
}

export default App;
