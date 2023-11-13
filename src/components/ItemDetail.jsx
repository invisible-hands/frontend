import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ItemDetail({ item, onClick }) {
  const { title, currentPrice, instantPrice, imageUrl, endAuctionTime } = item;
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(endAuctionTime).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((difference / 1000 / 60) % 60);
        let seconds = Math.floor((difference / 1000) % 60);

        hours = hours < 10 ? `0${hours}` : `${hours}`;
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${hours}:${minutes}:${seconds}`;
      }
      return '00:00:00';
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endAuctionTime]);

  return (
    <div
      className="border p-4 rounded-md relative"
      onClick={onClick}
      role="button"
    >
      <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
        {timeLeft}
      </div>
      <img
        src={imageUrl}
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
    endAuctionTime: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

ItemDetail.defaultProps = {
  onClick: () => {},
};

export default ItemDetail;
