import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function ImageSlider({ slides }) {
  const [currentId, setcurrentId] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentId === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentId - 1;
    setcurrentId(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentId === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentId + 1;
    setcurrentId(newIndex);
  };

  const goToSlide = slideIndex => {
    setcurrentId(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentId]);

  return (
    <div className="w-full h-[400px] m-auto p-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentId].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      />
      {/* Left Arrow */}
      <div
        role="button"
        tabIndex="0"
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-deepblue1/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Right Arrow */}
      <div
        role="button"
        tabIndex="0"
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-deepblue1/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map(slide => (
          <div
            role="button"
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled
              className={slide.id === currentId ? 'text-blue1' : 'text-blue2'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ImageSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImageSlider;
