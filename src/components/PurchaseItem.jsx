import React from 'react';
import PropTypes from 'prop-types';

const truncateProductName = name => {
  if (name.length > 15) {
    return `${name.substring(0, 15)}...`;
  }
  return name;
};

export function PurchaseItem({
  imageUrl,
  productName,
  price,
  totalPrice,
  status,
}) {
  return (
    <div className="p-1 bg-white rounded-xl ">
      <div className="text-sm font-bold mt-2 mb-4">구매 확정 대기 상품</div>
      <div className="flex justify-between items-center mb-4 pl-5">
        <img
          src={imageUrl}
          alt="상품 이미지"
          className="w-14 h-14 object-cover p-2 pl-3"
        />
        <div className="text-sm font-bold">
          제품명: {truncateProductName(productName)}
        </div>
        <div className="text-sm font-bold text-blackish">{price}원</div>
        <div className="text-sm font-bold text-blackish">{totalPrice}원</div>
        <div className="flex flex-col items-center">
          <div className="pt-4 text-sm text-danger">{status}</div>
          <div className="flex pt-1">
            <button type="button" className="bg-grayish text-xs px-1 rounded">
              구매 확정
            </button>
            <button
              type="button"
              className="bg-grayish text-xs px-1 rounded ml-2"
            >
              신고
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuctionItem({
  imageUrl,
  productName,
  currentPrice,
  myPrice,
  status,
  time,
}) {
  return (
    <div className="p-1 bg-white rounded-xl ">
      <div className="text-sm font-bold mt-2 mb-4">참여 중인 구매 목록</div>
      <div className="flex justify-between items-center mb-4 pl-5">
        <img
          src={imageUrl}
          alt="상품 이미지"
          className="w-14 h-14 object-cover p-2 pl-3"
        />
        <div className="text-sm font-bold">
          제품명: {truncateProductName(productName)}
        </div>
        <div className="text-sm font-bold text-danger">{currentPrice}원</div>
        <div className="text-sm font-bold text-blackish">{myPrice}원</div>
        <div className="flex flex-col items-center">
          <div className="pt-5 text-sm text-danger">{status}</div>
          <div>{time}</div>
        </div>
      </div>
    </div>
  );
}

export function SellingItem({ imageUrl, productName, totalPrice, status }) {
  return (
    <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
      <div className="text-sm font-bold mt-2 mb-4">송장 번호 입력 상품</div>
      <div className="flex justify-between items-center mb-4 pl-5">
        <img
          src={imageUrl}
          alt="상품 이미지"
          className="w-14 h-14 object-cover p-2 pl-3"
        />
        <div className="text-sm font-bold">
          제품명: {truncateProductName(productName)}
        </div>
        <div className="text-sm font-bold text-blackish pl-1">
          {totalPrice}원
        </div>
        <div className="flex flex-col items-center">
          <div className="pt-4 text-sm text-danger">{status}</div>
          <div className="flex pt-1">
            <button
              type="button"
              className="bg-grayish text-xs px-1 rounded ml-2"
            >
              송장 번호 입력
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SellingItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

AuctionItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  myPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

PurchaseItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
