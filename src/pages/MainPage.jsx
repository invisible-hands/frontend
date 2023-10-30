import React from 'react';
import ImageSlider from '../components/ImageSlider';
import slidesData from '../data/slidesData';

function MainPage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <ImageSlider slides={slidesData} />
    </div>
  );
}

export default MainPage;
