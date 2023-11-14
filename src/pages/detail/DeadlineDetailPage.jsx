import React from 'react';
import ItemDetail from '../../components/ItemDetail';

function DeadlineDetailPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        마감 임박 상품
      </div>
      <ItemDetail />
    </div>
  );
}

export default DeadlineDetailPage;
