import React from 'react';
import ImageSlider from './ImageSlider';
import slidesData from './slidesData';
import HotPreview from './preview/HotPreview';
import NewPreview from './preview/NewPreview';
import DeadlinePreview from './preview/DeadlinePreview';

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
