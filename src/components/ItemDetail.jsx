import React from 'react';
import PropTypes from 'prop-types';

function ItemDetail({ item }) {
  const { title, currentPrice, instantPrice, imageUrl } = item;

  return (
    <div className="border p-4 rounded-md relative">
      <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
        {/* 타이머 로직을 추가할 수 있습니다 */}
      </div>
      <img
        src={imageUrl} // 서버에서 이미지 URL을 받거나, 기본 이미지 사용
        alt={title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <div className="text-xl font-bold mb-2 truncate">{title}</div>
      <div className="text-md mb-1">
        현재 입찰 <span className="text-lg font-bold">{currentPrice}</span> 원
      </div>
      <div className="text-md font-bold text-deepblue1">
        즉시구매 <span className="text-lg font-bold">{instantPrice}</span> 원
      </div>
    </div>
  );
}

ItemDetail.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    instantPrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ItemDetail;
