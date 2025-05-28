import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgSlider1 from "../../../assets/img/slider1.avif";
import imgSlider2 from "../../../assets/img/slider2.avif";
import imgSlider3 from "../../../assets/img/slider3.avif";


const sliderImages = [
  {
    id: 1,
    url: imgSlider1,
    title: 'Summer Collection',
    subtitle: 'Discover our new arrivals',
    buttonText: 'Shop Now'
  },
  {
    id: 2,
    url: imgSlider2,
    title: 'Exclusive Offers',
    subtitle: 'Limited time discounts up to 50%',
    buttonText: 'View Deals'
  },
  {
    id: 3,
    url: imgSlider3,
    title: 'Premium Quality',
    subtitle: 'Crafted with care for your comfort',
    buttonText: 'Explore'
  }
];

const HeroSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
    customPaging: function () {
      return (
        <div className="w-3 h-3 mx-1 rounded-full bg-white bg-opacity-40 hover:bg-opacity-100 transition-all duration-300"></div>
      );
    },
    dotsClass: "slick-dots bottom-5"
  };

  return (
    <section className="relative">
      <Slider {...sliderSettings}>
        {sliderImages.map((slide) => (
          <div key={slide.id} className="relative h-[80vh] min-h-[calc(100vh-64px)]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-800/40"></div>
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90">
                    {slide.subtitle}
                  </p>
                  <button className="px-8 py-3 bg-purple-800 hover:bg-purple-700 rounded-lg font-bold text-white transition duration-300 transform hover:scale-105 shadow-lg">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider; 