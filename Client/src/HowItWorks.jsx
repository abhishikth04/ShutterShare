import { useState } from "react";
import { motion } from "framer-motion";
import joinSpace from "./assets/CreateJoin.jpg";
import uploadPhotosImg from "./assets/Upload.png";
import selectFavoritesImg from "./assets/Favourite.jpg";
import closeSpaceImg from "./assets/Closed.png";

const steps = [
  { id: 1, title: "Create or Join a Space", details: "Generate a unique code to create a new space or enter a code to join an existing one.", img: joinSpace },
  { id: 2, title: "Upload & Browse Photos", details: "Upload photos into the shared gallery and scroll through all images uploaded by others.", img: uploadPhotosImg },
  { id: 3, title: "Select & Save Favorites", details: "Choose the best photos from the gallery and save them to your personal collection.", img: selectFavoritesImg },
  { id: 4, title: "Close the Space", details: "Manually close the space or The space auto-closes after a set time, ensuring only temporary storage.", img: closeSpaceImg }
];

const gradients = [
  "linear-gradient(#d03715, #f87c61)",
  "linear-gradient(#0c69bb, #60b1e7)", 
  "linear-gradient(#a60298, #fe3dea)", 
  "linear-gradient(#0f8029, #4adb51)" 
];

const HowItWorks = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="flex flex-col justify-center items-center bg-black py-10 px-6">
        <h1 className="text-white text-5xl font-semibold mb-10 drop-shadow-[0px_1px_5px_gray]">How ShutterShare works</h1>
      <motion.div className="w-full max-w-5xl flex flex-row justify-center items-center gap-3"
       initial={{ opacity: 0, x: -80 }} 
       whileInView={{ opacity: 1, x: 0 }} 
       transition={{ duration: 1, ease: "easeOut" }}
       viewport={{ once: true }} >
        {steps.map((step, index) => {
          const isOpen = expanded === step.id;
          const defaultGradient = gradients[index];

          return (
            <motion.div
              key={step.id}
              className="relative flex flex-col items-center justify-start min-h-[350px] text-white text-center cursor-pointer px-4"
              layout
              
              animate={{
                
                width: isOpen ? "54%" : "18%", 
                backgroundImage: isOpen ? "linear-gradient(135deg, #1F2937, #374151)" : defaultGradient,
                borderRadius: isOpen ? 20 : 0
              }}
              whileHover={{ backgroundImage: "linear-gradient(135deg, #ffffff33, #ffffff55)" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setExpanded(isOpen ? null : step.id)}
            >
              <h3 className="text-2xl font-bold my-2">Step {step.id}</h3>
              {!isOpen && <h2 className="text-gray-300 font-semibold text-3xl">{step.title}</h2>}

              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                layoutId={`content-${step.id}`} 
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "linear", delay: 0.3 }}
    
              >
                
                {isOpen && <p className="text-gray-300 mt-2 text-[20px] font-semibold"><i>{step.details}</i></p>}

                {isOpen && (
                  <motion.img
                    src={step.img}
                    alt={step.title}
                    className="w-[300px] h-[190px] mx-auto mt-4"
                    initial={{ opacity: 0, y: 0 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.4, ease: "linear", delay:0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
        <h1 className="text-gray-500 text-3xl font-semibold mt-9">Start Using ShutterShare Today </h1>

      <motion.button 
      initial = {{y: -15}}
      animate = {{y: 0}}
      transition = {{repeat: Infinity , duration: 1.6 , ease: "easeInOut"}}
      className="h-10 w-[170px] bg-red-500 text-2xl rounded-lg mt-7 transition-discrete duration-200  
      hover:w-[175px] hover:h-11 hover:bg-red-900 hover:font-semibold"><i>Get Started &#8594; </i></motion.button>
    </section>
  );
};

export default HowItWorks;
