import React from 'react';
import Detail from '../components/ItemDetail';

function NewDetailPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        방금 올라온 상품
      </div>
      <Detail />
    </div>
  );
}

export default NewDetailPage;
