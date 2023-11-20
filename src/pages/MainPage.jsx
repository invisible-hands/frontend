import React from 'react';
import ImageSlider from '../components/ImageSlider';
import slidesData from '../data/slidesData';
import HotPreview from '../components/preview/HotPreview';
import NewPreview from '../components/preview/NewPreview';
import DeadlinePreview from '../components/preview/DeadlinePreview';

function MainPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <ImageSlider slides={slidesData} />
      <HotPreview />
      <DeadlinePreview />
      <NewPreview />
    </div>
  );
}

export default MainPage;
