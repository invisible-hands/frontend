import React from 'react';
import ItemDetail from '../../components/ItemDetail.jsx';

function NewDetailPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        방금 올라온 상품
      </div>
      <ItemDetail />
    </div>
  );
}

export default NewDetailPage;
