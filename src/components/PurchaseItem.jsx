import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  if (title.length > 10) {
    return `${title.substring(0, 10)}...`;
  }
  return title;
};

const dealStatusOptions = {
  DELIVERY_WAITING: '배송 대기중',
  PURCHASE_COMPLETE_WAITING: '구매 확정 대기',
  PURCHASE_COMPLETE: '구매 확정',
  PURCHASE_CANCEL: '취소',
  SALE_FAIL: '판매 실패',
};

const auctionStatusOptions = {
  '': '전체',
  AUCTION_PROGRESS: '경매 진행중',
  AUCTION_SUCCESS: '낙찰 성공',
  AUCTION_FAIL: '낙찰 실패',
};

export function PurchaseItem({
  imageUrl,
  title,
  purchasePrice,
  status,
  dealId,
  auctionId,
}) {
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [isComplainModalOpen, setComplainModalOpen] = useState(false);
  const showConfirmPurchaseButton = status === 'PURCHASE_COMPLETE_WAITING';
  const displayStatus = dealStatusOptions[status] || '알 수 없음';
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="flex justify-between items-center mb-4 pl-8 mt-2 mr-10">
      <button
        type="button"
        onClick={goToPage}
        className="w-14 h-14 p-2 pl-3 cursor-pointer hover:opacity-80"
      >
        <img src={imageUrl} alt="상품 이미지" className="object-cover" />
      </button>
      <div
        className="pt-3 text-sm font-bold cursor-pointer hover:underline rounded"
        onClick={goToPage}
        role="button"
      >
        제품명: {truncateProductName(title)}
      </div>
      <div className="pt-3 text-sm font-bold text-blackish ">
        {purchasePrice}원
      </div>
      <div className="flex flex-col items-center">
        <div
          className={`pt-4 text-sm text-danger pl-3 text-center pr-6 ${
            status === 'PURCHASE_CANCEL' ? 'ml-4 mr-3' : ''
          } ${status === 'PURCHASE_COMPLETE_WAITING' ? 'pt-5' : ''}
          `}
        >
          {displayStatus}
        </div>
        <div className="flex pt-1 pl-2.5 pr-6">
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
                dealId={dealId}
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
  title,
  currentPrice,
  myBidPrice,
  status,
  auctionId,
  time,
}) {
  const showConfirmPurchaseButton = status === 'AUCTION_PROGRESS';
  const displayStatus = auctionStatusOptions[status] || '알 수 없음';
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="flex justify-between items-center mb-4 pl-8 mt-2 mr-8">
      <button
        type="button"
        onClick={goToPage}
        className="w-14 h-14 p-2 pl-3 cursor-pointer hover:opacity-80"
      >
        <img src={imageUrl} alt="상품 이미지" className="object-cover" />
      </button>
      <div
        className="pt-3 text-sm font-bold cursor-pointer hover:underline rounded"
        onClick={goToPage}
        role="button"
      >
        제품명: {truncateProductName(title)}
      </div>
      <div className="pt-3 text-sm font-bold text-danger pr-2">
        {currentPrice}원
      </div>
      <div className="pt-3 text-sm font-bold text-blackish">{myBidPrice}원</div>
      <div className="flex flex-col items-center">
        <div className="pt-4 text-sm text-danger pr-6">{displayStatus}</div>
        {showConfirmPurchaseButton && (
          <div className="text-xs text-deepblue1 pr-6">{time}</div>
        )}
      </div>
    </div>
  );
}

export function SellingItem({
  imageUrl,
  title,
  price,
  status,
  time,
  auctionId,
}) {
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const showConfirmPurchaseButton = status === 'DELIVERY_WAITING';
  const displayStatus = dealStatusOptions[status] || '알 수 없음';
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`/auction/${auctionId}`);
  };

  console.log('옥션 아이디', auctionId);
  return (
    <div className="flex justify-between items-center mb-4 pl-12 pt-2 mr-8">
      <button
        type="button"
        onClick={goToPage}
        className="w-14 h-14 p-2 pl-3 cursor-pointer hover:opacity-80"
      >
        <img src={imageUrl} alt="상품 이미지" className="object-cover" />
      </button>
      <div
        className="pt-3 text-sm font-bold cursor-pointer hover:underline rounded"
        onClick={goToPage}
        role="button"
      >
        제품명: {truncateProductName(title)}
      </div>
      <div className="pt-3 text-sm font-bold text-blackish pl-1 ">
        {price}원
      </div>
      <div className="flex flex-col items-center">
        <div
          className={`pt-4 text-sm pr-12 text-danger ${
            status === 'SALE_FAIL' ? 'mr-4' : ''
          }`}
        >
          {displayStatus}
        </div>
        <div className="flex flex-col items-center pt-1">
          {showConfirmPurchaseButton && (
            <>
              <button
                type="button"
                className="bg-grayish text-xs px-1 rounded mr-12"
                onClick={() => setInvoiceModalOpen(true)}
              >
                송장 번호 입력
              </button>
              <InvoiceInputModal
                isModalOpen={isInvoiceModalOpen}
                setIsModalOpen={setInvoiceModalOpen}
                auctionId={auctionId}
              />
              <div>{time}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

PurchaseItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  purchasePrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  dealId: PropTypes.number.isRequired,
  auctionId: PropTypes.number.isRequired,
};

AuctionItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  myBidPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  auctionId: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

SellingItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  auctionId: PropTypes.number.isRequired,
};
