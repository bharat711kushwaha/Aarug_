import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Embrace a Sustainable Future",
    description: "Say goodbye to disposable pads and embrace a healthier, eco-friendly alternative. Our reusable pads are designed for comfort, hygiene, and sustainability—so you can care for yourself and the planet at the same time.",
    img: "https://media.istockphoto.com/id/1521121105/photo/young-indian-woman-educating-other-traditional-women-about-sanitary-pad-and-how-to-use-it.jpg?s=1024x1024&w=is&k=20&c=hZCesO-UEn3q5Gr04_FrE_MtUSMzBw3XpN6x2NbxQs8="
  },
  {
    title: "Smart Choices, Lasting Impact",
    description: "Invest in quality that lasts. Our reusable menstrual products are crafted from soft, breathable, and highly absorbent materials, offering superior protection for years. Save money while reducing your environmental footprint—one cycle at a time.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7c2AIoLq1S_BS2S-cJNmbTqKRUGZAoN3bw&s"
  },
  {
    title: "Join Thousands Making a Difference",
    description: "Over 5,000 women have already switched to our reusable products, preventing millions of disposable pads from ending up in landfills. By making the switch today, you're not just choosing comfort and convenience—you're becoming part of a global movement for a greener future.",
    img: "https://images.unsplash.com/photo-1597173215351-16d4faf23ea3?w=500&auto=format&fit=crop&q=60"
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(() => {
      goToNextSlide();
    }, 10000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-white">
      {/* Slide Wrapper */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-10 md:py-20">
              {/* Image Always Visible */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
                <img
                  src={slide.img}
                  alt="Slide"
                  className="rounded-xl shadow-lg max-h-[300px] md:max-h-[400px] w-full object-cover"
                />
              </div>

              {/* Content (hidden on small screens) */}
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left hidden md:block">
                <h1 className="text-3xl md:text-5xl font-bold text-[#2A9D8F]">{slide.title}</h1>
                <p className="text-lg text-gray-700 leading-relaxed">{slide.description}</p>
                <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                  <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 bg-[#F4A261] hover:bg-[#E76F51] text-white font-semibold rounded-lg transition"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="px-6 py-2 border-2 border-[#2A9D8F] text-[#2A9D8F] hover:bg-[#2A9D8F] hover:text-white font-semibold rounded-lg transition"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-20"
        onClick={goToPrevSlide}
      >&#9664;</button>
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-20"
        onClick={goToNextSlide}
      >&#9654;</button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${currentIndex === index ? 'bg-[#F4A261]' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

