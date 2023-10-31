import React from 'react';
import ImageSlider from '../components/ImageSlider';
import slidesData from '../data/slidesData';
import HotPreview from '../components/HotPreview';

function MainPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <ImageSlider slides={slidesData} />
      <HotPreview />
    </div>
  );
}

export default MainPage;
