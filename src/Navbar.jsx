import { Aperture } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import { motion } from "framer-motion";
const Navbar = () => {

    return (
        <motion.nav className="h-15 border-3 border-black bg-gray-400 flex flex-row justify-between py-2 px-4
        text-2xl" initial = {{y: -100 , opacity: 0}}
                  animate = {{y: 0 , opacity: 1}}
                  transition = {{duration: 0.6, ease: "easeOut"}}>
            <div className='flex flex-row'>
                    <motion.div animate = {{ rotate: 360 }} transition={{ delay: 0.4, repeat:1 , duration: 0.8}}>
                        <Aperture size={38}/>
                    </motion.div>
                    <motion.div initial = {{x: -100 , opacitiy: 0}} animate = {{x: 0, opacity: 1}} 
                    transition={{delay: 1.3 , duration: 0.5, type:'spring', bounce: 0.5}}>
                        <SendHorizontal size={38}/>
                    </motion.div>
            </div>

            <ul className="flex flex-row">
                <li className="px-2.5"><a href="#">Home</a></li>
                <li className="px-2.5"><a href="#">About</a></li>
                <li className="px-2.5"><a href="#">Services</a></li>
                <li className="px-2.5"><a href="#">Login</a></li>
            </ul>
        </motion.nav>
    );
}


export default Navbar;