import React from 'react';
import ItemDetail from '../../components/ItemDetail';

function HotDetailPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        인기상품
      </div>
      <ItemDetail />
    </div>
  );
}

export default HotDetailPage;