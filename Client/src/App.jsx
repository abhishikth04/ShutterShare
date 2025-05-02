import Navbar from "./Navbar";
import Title from "./Title";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import PricingCarousel from "./PricingCarousel";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <main>
        <Title />
        <Features />
        <HowItWorks />
        <PricingCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default App;
