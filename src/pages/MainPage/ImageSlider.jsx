import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function ImageSlider({ slides }) {
  const [currentId, setcurrentId] = useState(0);
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);

  const prevSlide = () => {
    if (!isAnimationInProgress) {
      const isFirstSlide = currentId === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentId - 1;
      setcurrentId(newIndex);
      setIsAnimationInProgress(true);

      // 애니메이션이 끝난 후 클릭 가능 상태로 변경
      setTimeout(() => {
        setIsAnimationInProgress(false);
      }, 500); // 애니메이션 시간에 따라 조절
    }
  };

  const nextSlide = () => {
    if (!isAnimationInProgress) {
      const isLastSlide = currentId === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentId + 1;
      setcurrentId(newIndex);
      setIsAnimationInProgress(true);

      // 애니메이션이 끝난 후 클릭 가능 상태로 변경
      setTimeout(() => {
        setIsAnimationInProgress(false);
      }, 500); // 애니메이션 시간에 따라 조절
    }
  };

  const goToSlide = slideIndex => {
    if (!isAnimationInProgress) {
      setcurrentId(slideIndex);
      setIsAnimationInProgress(true);

      // 애니메이션이 끝난 후 클릭 가능 상태로 변경
      setTimeout(() => {
        setIsAnimationInProgress(false);
      }, 500); // 애니메이션 시간에 따라 조절
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimationInProgress) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentId, isAnimationInProgress]);

  return (
    <div className="w-full h-52 mx-auto mb-4 p-4 relative group md:h-72 lg:h-80">
      <div
        style={{ backgroundImage: `url(${slides[currentId].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      />
      {/* Left Arrow */}
      <div
        role="button"
        tabIndex="0"
        className={`${
          isAnimationInProgress ? 'pointer-events-none' : ''
        } hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-deepblue1/20 text-white cursor-pointer`}
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Right Arrow */}
      <div
        role="button"
        tabIndex="0"
        className={`${
          isAnimationInProgress ? 'pointer-events-none' : ''
        } hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-deepblue1/20 text-white cursor-pointer`}
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
