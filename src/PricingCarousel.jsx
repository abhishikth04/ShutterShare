import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    description: "Temporary spaces that last less than a day.",
    bg: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    title: "Plus+",
    price: "$5 - $20",
    description: "Extended storage for up to weeks and months.",
    bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    title: "Pro",
    price: "$50+",
    description: "Extended storage for a longer period.",
    bg: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  {
    title: "Pro Plus",
    price: "$10/month",
    description: "Permanent storage with a monthly subscription.",
    bg: "bg-gradient-to-r from-gray-700 to-gray-900",
  },
  {
    title: "Pro Fam",
    price: "$20",
    description: "Affordable Permanent storage plans for family",
    bg: "bg-gradient-to-r from-pink-400 to-blue-500",
  }
];

export default function PricingCarousel() {
  return (

    <div className="flex justify-center items-center h-[400px] bg-black w-full p-3.5 overflow-visible">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="3"
        coverflowEffect={{
          rotate: 0,
          stretch: 10, 
          depth: 300,
          modifier: 1.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full max-w-2xl overflow-visible" 
      >
        {pricingPlans.map((plan, index) => (
          <SwiperSlide key={index} className="flex justify-center overflow-visible">
            <div
              className={`w-60 h-[250px] p-6 rounded-2xl shadow-xl text-white text-center transition-transform duration-300 ease-in-out transform hover:shadow-2xl ${plan.bg}`}
            >
              <h2 className="text-2xl font-bold">{plan.title}</h2>
              <p className="text-lg mt-2 font-semibold">{plan.price}</p>
              <p className="text-md mt-2 font-semibold"><i>{plan.description}</i></p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
