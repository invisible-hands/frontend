import React from 'react';
import Detail from '../components/ItemDetail';

function SearchDetailPage() {
  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        검색 결과
      </div>
      <Detail />
    </div>
  );
}

export default SearchDetailPage;
