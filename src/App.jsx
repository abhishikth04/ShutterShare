import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { SendHorizontal } from 'lucide-react';
import Shutter from "./assets/Shutter.png";
import Title from "./Title";
import Hero from "./Hero";
import Features from "./Features";

const App = () => {
  return (
    <>
      <Navbar />
      <Title/>
      <Features/>
      
    </> 
  );
}

export default App;
