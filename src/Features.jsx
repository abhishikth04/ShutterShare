import SharedGallery from "./assets/SharedGallery.jpg";
import TempStorage from "./assets/TempStorage.jpg";
import Creators from "./assets/CreatorHub.jpg";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="w-full h-min-h-screen flex flex-col items-center bg-black py-16 overflow-x-hidden">

      {/* Website Name & Subtitle */}
      <motion.h1 
      className="text-white font-bold text-6xl text-center"
      initial = {{ y:-50, opacity:0 }}
      animate = {{ y:0, opacity:1 }}
      transition = {{ duration: 2.8 }}>Welcome to ShutterShare</motion.h1>
      <p className="text-2xl text-gray-400 text-center my-4">
        <i>Every captured moment, now shared effortlessly</i> 📷🚀
      </p>
 {/*_____________________________________________________________________________________________________________*/}


      {/* Shared Gallery Section */}
      <div className="h-[40vh] flex flex-col md:flex-row items-center mt-14 mx-10 mb-10 max-w-6xl">
        {/* Text Section */}
        <motion.div className="border border-gray-500 bg-gray-900 p-8 rounded-lg w-full 
                               md:w-1/2 h-64 drop-shadow-[0px_1px_12px_grey]"
                    initial={{ opacity: 0, x: -90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}>
          <h2 className="text-white text-5xl font-semibold">Shared Gallery</h2>
          <p className="text-gray-300 mt-10">
            <i>Create and join private spaces with a unique access code, making it easy to share event photos with friends. 
                Scroll through the gallery, select your favorite moments, and download them
                 before the space auto-closes. You can also choose to keep the space permanent for long-term access.</i>
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center"
                    initial={{ opacity: 0, x: 90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}>
          <img
            src={SharedGallery}
            alt="Shared Gallery"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>
      </div>

    {/*---------------------------------Another Feature ----------------------------------------------------*/}

    {/* Temp Storage Section */}

      <div className="h-[40vh] flex flex-col md:flex-row items-center mt-14 mx-10 mb-10 max-w-6xl">
        {/* Image Section */}
        <motion.div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center"
                    initial={{ opacity: 0, x: -90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}>
          <img
            src={TempStorage}
            alt="Shared Gallery"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div className="border border-gray-500 bg-gray-900 p-8 rounded-lg w-full 
                              md:w-1/2 h-64 drop-shadow-[0px_1px_12px_grey]"
                    initial={{ opacity: 0, x: 90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}>
          <h2 className="text-white text-5xl font-semibold">Temporary Spaces</h2>
          <p className="text-gray-300 mt-8">
            <i>Upload and access photos for a limited time, ensuring hassle-free sharing. Ideal for group trips, 
                events, functions and collaborations, where capturing and exchanging moments needs to be fast and efficient.
                 Once the time expires, the space automatically closes, keeping everything organized.</i>
          </p>
        </motion.div>
      </div>

    {/*---------------------------------Another Feature ----------------------------------------------------*/}

    {/* Creators Section */}

    <div className="h-[40vh] flex flex-col md:flex-row items-center mt-14 mx-10 mb-10 max-w-6xl">
        {/* Text Section */}
        <motion.div className="border border-gray-500 bg-gray-900 p-8 rounded-lg w-full 
                               md:w-1/2 h-64 drop-shadow-[0px_1px_12px_grey]"
                    initial={{ opacity: 0, x: -90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}>
          <h2 className="text-white text-5xl font-semibold">Creator's Hub</h2>
          <p className="text-gray-300 mt-10">
            <i>A private space for vloggers and YouTubers to share personal moments, travel memories, and daily life 
                snapshots without the pressure of likes or comments. A simple and relaxed
                 way to connect with close friends and family through photos and short videos.</i>
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center"
                    initial={{ opacity: 0, x: 90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}>
          <img
            src={Creators}
            alt="Shared Gallery"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>
      </div>

    </section>
  );
};

export default Features;
