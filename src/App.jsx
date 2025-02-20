import Header from "./Header";
import { motion } from "framer-motion"; // ✅ Correct import

const App = () => {
  return (
    <>
      <Header />
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
