import React, { useState, useRef, useEffect } from 'react';

const slides = [
  {
    title: "Sustainable Living Starts Here",
    description: "Reusable pads? Yes, it's possible! Comfortable, eco-friendly, and better for the planet.",
    img: "https://media.istockphoto.com/id/1521121105/photo/young-indian-woman-educating-other-traditional-women-about-sanitary-pad-and-how-to-use-it.jpg?s=1024x1024&w=is&k=20&c=hZCesO-UEn3q5Gr04_FrE_MtUSMzBw3XpN6x2NbxQs8="
  },
  {
    title: "Save Money, Save Earth",
    description: "Our reusable products last for years, saving you money while reducing waste.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7c2AIoLq1S_BS2S-cJNmbTqKRUGZAoN3bw&s"
  },
  {
    title: "Join The Eco-Revolution",
    description: "Over 5,000 women have switched to our products, eliminating millions of disposable pads from landfills.",
    img: "https://images.unsplash.com/photo-1597173215351-16d4faf23ea3?w=500&auto=format&fit=crop&q=60"
  }
];

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    startAutoScroll();
    
    // Clean up the interval when the component unmounts
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    
    autoScrollRef.current = setInterval(() => {
      if (!isPaused) {
        const nextSlide = (activeSlide + 1) % slides.length;
        scrollToSlide(nextSlide);
      }
    }, 5000); // Change slide every 5 seconds
  };

  const scrollToSlide = (index: number) => {
    setActiveSlide(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.offsetWidth;
      const newActiveSlide = Math.round(scrollPosition / slideWidth);
      
      if (newActiveSlide !== activeSlide) {
        setActiveSlide(newActiveSlide);
      }
    }
  };

  // Pause auto-scroll when user interacts with carousel
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="relative w-full h-[500px] bg-[#FFEFD5] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat"></div>
      
      {/* Carousel Container - Horizontally Scrollable */}
      <div 
        ref={carouselRef}
        className="relative h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
        onScroll={handleScroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full w-full h-full flex flex-col md:flex-row items-center justify-center px-8 md:px-16 snap-center"
          >
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left pb-8 md:pb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2A9D8F]">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 bg-[#F4A261] hover:bg-[#E76F51] text-white font-semibold rounded-full transition-colors">
                  Shop Now
                </button>
                <button className="px-8 py-3 border-2 border-[#2A9D8F] text-[#2A9D8F] hover:bg-[#2A9D8F] hover:text-white font-semibold rounded-full transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img 
                src={slide.img} 
                alt="Eco-friendly period products" 
                className="rounded-lg shadow-xl max-h-96 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              activeSlide === index ? 'bg-[#F4A261]' : 'bg-[#FFE6C7]/40 hover:bg-[#F4A261]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-[#2A9D8F] text-sm mb-1">Scroll</span>
          <svg className="w-6 h-6 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;