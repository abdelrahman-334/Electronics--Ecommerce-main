import { useState, useEffect } from "react";
import slide1 from '../assets/Slide-1.png';
import slide2 from '../assets/Slide-2.png';
import slide3 from '../assets/Slide-3.png';


export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides = [slide1, slide2, slide3]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [slides.length]);
  return (
    <div>
      <div className="carousel w-full overflow-hidden relative z-10">
        <div
          className="carousel-track flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-item w-full flex-shrink-0">
              <img src={slide} className="w-full" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
          <button
            className="btn btn-circle"
            onClick={() =>
              setActiveSlide((prevSlide) =>
                prevSlide === 0 ? slides.length - 1 : prevSlide - 1
              )
            }
          ></button>
          <button
            className="btn btn-circle"
            onClick={() =>
              setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length)
            }
          ></button>
        </div>
      </div>
    </div>
  );
}
