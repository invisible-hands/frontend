import React from 'react';
import { BsFillArrowRightCircleFill as RightArrowIcon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import detailBackground from '../assets/detailBackground.jpg';

function ItemSample({ navigatePath }) {
  const navigate = useNavigate();

  const handleRightArrowClick = () => {
    navigate(navigatePath);
  };

  return (
    <div className="text-center border p-1 rounded-md relative md:p-2 lg:p-3">
      <div className=" blur-sm">
        {/* 타이머 */}
        <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-xs px-2 py-1 rounded md:text-lg md:top-2 md:right-2">
          99:01:07
        </div>
        <img
          src={detailBackground}
          alt="더보기 상품 샘플"
          className="w-full h-20 object-cover mb-4 rounded-md md:h-30 lg:h-40"
        />
        <div className="text-xs font-bold mb-2 truncate md:text-lg lg:text-xl">
          미네랄사이다 지라치 봉제인형
        </div>
        <div className="text-xs mb-1 truncate md:text-lg">
          <span className="hidden md:inline">현재 입찰 </span>
          <span className="font-bold">10000</span> 원
        </div>
        <div className="text-xs font-bold text-deepblue1 truncate md:text-lg">
          <span className="hidden md:inline">즉시구매 </span>
          <span className="text-xs font-bold">77000</span> 원
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <RightArrowIcon
          size={48}
          className="cursor-pointer text-blue1 duration-300 bg-whitish border-2 rounded-full hover:text-deepblue1"
          onClick={handleRightArrowClick}
        />
      </div>
    </div>
  );
}

ItemSample.propTypes = {
  navigatePath: PropTypes.string.isRequired,
};

export default ItemSample;
