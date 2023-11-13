import React from 'react';
import Detail from '../../components/ItemDetail.jsx';

function DeadlineDetailPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        마감 임박 상품
      </div>
      <Detail />
    </div>
  );
}

export default DeadlineDetailPage;
