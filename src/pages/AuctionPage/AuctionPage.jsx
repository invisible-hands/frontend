import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RxDotFilled } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
// import useModalStore from '../../stores/modalStore';
// import useLoginStore from '../../stores/loginStore';
import PaymentConfirmModal from '../../components/PaymentConfirmModal';
import PaymentModal from '../../components/PaymentModal';
import {
  isWithinFiveMinute,
  isAuctionEnd,
  calculateRemainTime,
} from '../../utils/timeUtils';
import BidHistoryModal from './BidHistoryModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import SellerInfo from './SellerInfo';
import { fetchAuctionInfo } from '../../queries/auctionQueries';

export default function AuctionPage() {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  // const { loggedIn } = useLoginStore();
  // const { openModal } = useModalStore();

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  // const [remainTime, setRemainTime] = useState(0);

  const auctionQuery = useQuery({
    queryKey: ['auctionInfo', auctionId],
    queryFn: () => fetchAuctionInfo(auctionId),
  });

  console.log(auctionQuery.data);

  if (auctionQuery.status === 'pending') return <div>로딩중...</div>;
  if (auctionQuery.status === 'error')
    return <div>{auctionQuery.error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-[1024px]">
        <div className="flex flex-row ">
          {/* <!-- 상품이미지 --> */}
          <ImageSlider slides={auctionQuery.data.data.images} />

          {/* <!-- 상품정보 --> */}
          <div>
            <p>{auctionQuery.data.data.auctionInfo.title}</p>
            <p>{}</p>
            <p>
              현재 입찰가{' '}
              <span>{auctionQuery.data.data.auctionInfo.currentPrice}</span>{' '}
              바로 구매가{' '}
              <span>{auctionQuery.data.data.auctionInfo.instantPrice}</span>
            </p>
            <p>{auctionQuery.data.data.auctionInfo.bidderCnt}명 경매 참여중</p>
            <p>
              남은 시간 :{' '}
              {calculateRemainTime(
                auctionQuery.data.data.auctionInfo.endAuctionTime,
              )}
            </p>
            <p>
              상품 상태 :{' '}
              {auctionQuery.data.data.auctionInfo.itemCondition === 'NEW'
                ? '새상품'
                : '중고'}
            </p>
            <TERipple rippleColor="white">
              <button
                type="button"
                className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => setShowBidHistoryModal(true)}
              >
                입찰 내역 보기
              </button>
            </TERipple>
            {/* 게시글 author면서 생성한 지 5분 이내에 만든 게시물이면 버튼을 보여준다 */}
            {auctionQuery.data.data.authorCheck === true &&
              isWithinFiveMinute(
                auctionQuery.data.data.auctionInfo.createdAt,
              ) && (
                <TERipple rippleColor="white">
                  <button
                    type="button"
                    className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={() => setShowDeleteConfirmModal(true)}
                  >
                    게시글 삭제
                  </button>
                </TERipple>
              )}
            {/* 게시글 author 아니면서 판매종료가 되지 않고, 5분이 지난 게시물 */}
            {auctionQuery.data.data.authorCheck === false &&
              !isWithinFiveMinute(
                auctionQuery.data.data.auctionInfo.createdAt,
              ) &&
              !isAuctionEnd(
                auctionQuery.data.data.auctionInfo.endAuctionTime,
              ) && (
                <>
                  <TERipple rippleColor="white">
                    <button
                      type="button"
                      className="inline-block rounded bg-blue2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue1 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={() => {
                        navigate(
                          `/bid/${auctionQuery.data.data.auctionInfo.auctionId}`,
                        );
                      }}
                    >
                      입찰하기
                    </button>
                  </TERipple>
                  <TERipple rippleColor="white">
                    <button
                      type="button"
                      className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={() => {
                        setShowConfirmModal(true);
                      }}
                    >
                      즉시결제
                    </button>
                  </TERipple>
                </>
              )}
          </div>
        </div>
        {/* <!-- 상품설명 --> */}
        <div>
          <h2>상품 정보</h2>
          <p>{auctionQuery.data.data.auctionInfo.content}</p>
          <h2>태그</h2>
          <p>{auctionQuery.data.data.tags.map(tag => tag.tagName)}</p>
        </div>
        <SellerInfo auctionId={auctionId} />
      </div>
      {/* 게시글 삭제 확정 모달  */}
      <DeleteConfirmModal
        showModal={showDeleteConfirmModal}
        setShowModal={setShowDeleteConfirmModal}
        productName={auctionQuery.data.data.auctionInfo.title}
        productId={auctionQuery.data.data.auctionInfo.auctionId}
      />

      {/* 경매 기록 모달  */}
      <BidHistoryModal
        showModal={showBidHistoryModal}
        setShowModal={setShowBidHistoryModal}
        auctionId={auctionId}
      />
      {/* 결제 확정 모달  */}
      <PaymentConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        setShowPayModal={setShowPayModal}
        point={{
          currentPoint: auctionQuery.data.data.auctionInfo.instantPrice,
          instantPoint: auctionQuery.data.data.auctionInfo.currentPrice,
        }}
        auctionName={auctionQuery.data.data.auctionInfo.title}
        auctionId={auctionId}
      />
      {/* 포인트 충전 모달  */}
      <PaymentModal showModal={showPayModal} setShowModal={setShowPayModal} />
    </div>
  );
}

// Image slider
function ImageSlider({ slides }) {
  const [currentIndex, setcurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };

  const goToSlide = slideIndex => {
    setcurrentIndex(slideIndex);
  };

  return (
    <div className="w-72">
      <div className="relative w-72 h-72 overflow-hidden">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        />
        <div className="flex justify-between absolute w-full left-0 top-1/2 transform -translate-y-1/2">
          {/* Left Arrow */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-12 h-12 cursor-pointer"
              onClick={prevSlide}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {/* Right Arrow */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-12 h-12 cursor-pointer"
              onClick={nextSlide}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map(({ imageId }, index) => (
          <div
            role="button"
            key={imageId}
            onClick={() => goToSlide(index)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled
              className={
                index === currentIndex ? 'text-deepblue1' : 'text-blue2'
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// 판매자 정보

ImageSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imageId: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
