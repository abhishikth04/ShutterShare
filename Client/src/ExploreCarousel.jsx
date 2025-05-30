import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import img1 from './assets/TempStorage.jpg'
import img2 from './assets/Favourite.jpg'
import img3 from './assets/Closed.png'

const images = [img1, img2, img3]

export default function ExploreCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows:true
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-200 ml-4">Explore </h2>
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              alt={`explore-${i}`}
              className="rounded-xl w-[90vw] h-[300px] object-cover mx-auto" 
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
