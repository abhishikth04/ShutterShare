
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <Navbar/>
      <section>
        <motion.h1 
          animate={{ fontSize: "50px" }} 
          className="text-red-500 text-2xl"
        >
        
          ShutterShare
        </motion.h1>
      </section>
    </>
  );
}

export default App;
