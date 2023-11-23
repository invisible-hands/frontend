import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ItemDetail({ item, onClick }) {
  const { title, currentPrice, instantPrice, imageUrl, endAuctionTime } = item;
  const [timeLeft, setTimeLeft] = useState('');
  const [isLessThanAnHour, setIsLessThanAnHour] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(endAuctionTime).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        let hours = Math.floor(difference / (1000 * 60 * 60));
        let minutes = Math.floor((difference / 1000 / 60) % 60);
        let seconds = Math.floor((difference / 1000) % 60);

        setIsLessThanAnHour(hours === 0);

        hours = hours < 10 ? `0${hours}` : `${hours}`;
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${hours}:${minutes}:${seconds}`;
      }
      return '경매 마감';
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endAuctionTime]);

  const timeStyle = isLessThanAnHour
    ? 'absolute top-1 right-1 bg-danger/20 text-danger text-xs px-2 py-1 rounded md:text-lg md:top-2 md:right-2'
    : 'absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-xs px-2 py-1 rounded md:text-lg md:top-2 md:right-2';

  return (
    <div
      className="text-center border p-1 rounded-md relative md:p-2 lg:p-3"
      onClick={onClick}
      role="button"
    >
      <div className={timeStyle}>{timeLeft}</div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-20 object-cover mb-4 rounded-md md:h-30 lg:h-40"
      />
      <div className="text-xs text-blue2 font-bold mb-2 truncate md:text-lg lg:text-xl">
        {title}
      </div>

      <div className="text-xs mb-1 truncate md:text-lg">
        <span className="hidden md:inline">현재 입찰 </span>
        <span className="font-bold">{currentPrice}</span> 원
      </div>
      {instantPrice && (
        <div className="text-xs font-bold text-deepblue1 truncate md:text-lg">
          <span className="hidden md:inline">즉시구매 </span>
          <span className="font-bold">{instantPrice}</span> 원
        </div>
      )}
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
