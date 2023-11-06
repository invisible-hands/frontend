import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InvoiceInputModal from './InvoiceInputModal';
import PurchaseConfirmModal from './PurchaseConfirmModal';
import ComplainModal from './ComplainModal';

const truncateProductName = title => {
  // 제품 이름이 제공되지 않았거나 유효하지 않을 경우 안전하게 처리
  if (typeof title !== 'string' || !title) {
    // 적절한 기본값으로 대체하거나 오류를 처리
    return '제품 이름 없음';
  }
  if (title.length > 15) {
    return `${title.substring(0, 15)}...`;
  }
  return title;
};

const dealStatusOptions = {
  DELIVERY_WAITING: '배송 대기중',
  PURCHASE_COMPLETE_WAITING: '구매 확정 대기',
  PURCHASE_COMPLETED: '구매 확정',
  PURCHASE_CANCEL: '취소',
};

export function PurchaseItem({ imageUrl, title, price, status }) {
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [isComplainModalOpen, setComplainModalOpen] = useState(false);
  const showConfirmPurchaseButton = status === 'PURCHASE_COMPLETE_WAITING';
  const displayStatus = dealStatusOptions[status] || '알 수 없음';

  return (
    <div className="flex justify-between items-center mb-4 pl-5">
      <img
        src={imageUrl}
        alt="상품 이미지"
        className="w-14 h-14 object-cover p-2 pl-3"
      />
      <div className="text-sm font-bold">
        제품명: {truncateProductName(title)}
      </div>
      <div className="text-sm font-bold text-blackish">{price}원</div>
      <div className="flex flex-col items-center">
        <div className="pt-4 text-sm text-danger">{displayStatus}</div>
        <div className="flex pt-1">
          {showConfirmPurchaseButton && (
            <>
              <button
                type="button"
                className="bg-grayish text-xs px-1 rounded"
                onClick={() => setPurchaseModalOpen(true)}
              >
                구매 확정
              </button>
              <PurchaseConfirmModal
                isModalOpen={isPurchaseModalOpen}
                setIsModalOpen={setPurchaseModalOpen}
              />
              <button
                type="button"
                className="bg-grayish text-xs px-1 rounded ml-1"
                onClick={() => setComplainModalOpen(true)}
              >
                신고
              </button>
              <ComplainModal
                isModalOpen={isComplainModalOpen}
                setIsModalOpen={setComplainModalOpen}
              />
            </>
          )}
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
    <div className="flex justify-between items-center mb-4 pl-6">
      <img
        src={imageUrl}
        alt="상품 이미지"
        className="w-14 h-14 object-cover p-2 pl-3"
      />
      <div className="text-sm font-bold pr-2">
        제품명: {truncateProductName(productName)}
      </div>
      <div className="text-sm font-bold text-danger pr-2">{currentPrice}원</div>
      <div className="text-sm font-bold text-blackish">{myPrice}원</div>
      <div className="flex flex-col items-center">
        <div className="pt-5 text-sm text-danger">{status}</div>
        <div>{time}</div>
      </div>
    </div>
  );
}

export function SellingItem({ imageUrl, productName, totalPrice, status }) {
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
  return (
    <div className="flex justify-between items-center mb-4 pl-5">
      <img
        src={imageUrl}
        alt="상품 이미지"
        className="w-14 h-14 object-cover p-2 pl-3"
      />
      <div className="text-sm font-bold">
        제품명: {truncateProductName(productName)}
      </div>
      <div className="text-sm font-bold text-blackish pl-1">{totalPrice}원</div>
      <div className="flex flex-col items-center">
        <div className="pt-4 text-sm text-danger">{status}</div>
        <div className="flex pt-1">
          <button
            type="button"
            className="bg-grayish text-xs px-1 rounded ml-2"
            onClick={() => setInvoiceModalOpen(true)}
          >
            송장 번호 입력
          </button>
          <InvoiceInputModal
            isModalOpen={isInvoiceModalOpen}
            setIsModalOpen={setInvoiceModalOpen}
          />
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
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
