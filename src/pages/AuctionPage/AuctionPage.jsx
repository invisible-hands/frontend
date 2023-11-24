import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RxDotFilled } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
import useLoginStore from '../../stores/loginStore';
import useModalStore from '../../stores/modalStore';
import PaymentConfirmModal from './PaymentConfirmModal';
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
  const { loggedIn, userId } = useLoginStore();
  const { openModal } = useModalStore();

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  const auctionQuery = useQuery({
    queryKey: ['auctionInfo', auctionId],
    queryFn: () => fetchAuctionInfo(auctionId),
  });

  if (auctionQuery.data) {
    console.log(auctionQuery.data);
    return (
      <div className="flex justify-center">
        <div className="w-full lg:w-[1024px] p-6">
          <div className="flex flex-row space-x-12">
            {/* <!-- 상품이미지 --> */}
            <div className="relative">
              <ImageSlider slides={auctionQuery.data.data.images} />
              {auctionQuery.data.data.auctionInfo.auctionStatus ===
                ('AUCTION_FAIL' || 'AUCTION_SUCCESS') && (
                <div className="absolute top-0 left-0 w-full h-96 bg-blackish bg-opacity-50 text-whitish text-2xl text-center flex items-center justify-center">
                  <p>종료된 경매입니다</p>
                </div>
              )}
              {auctionQuery.data.data.auctionInfo.auctionStatus ===
                'AUCTION_PROGRESS' &&
                isWithinFiveMinute(
                  auctionQuery.data.data.auctionInfo.createdAt,
                ) && (
                  <div className="absolute top-0 left-0 w-full h-96 bg-blackish bg-opacity-50 text-whitish text-2xl text-center flex items-center justify-center">
                    <p>아직 시작 전인 경매입니다</p>
                  </div>
                )}
            </div>
            {/* <!-- 상품정보 --> */}
            <div className="space-y-5">
              <p className="text-3xl font-extrabold mb-4">
                {auctionQuery.data.data.auctionInfo.title}
              </p>
              <p>{}</p>
              <p>
                현재 입찰가{' '}
                <span className="text-2xl font-extrabold mb-4">
                  {auctionQuery.data.data.auctionInfo.currentPrice}
                </span>{' '}
                바로 구매가{' '}
                <span className="text-2xl font-extrabold mb-4">
                  {auctionQuery.data.data.auctionInfo.instantPrice}
                </span>
              </p>
              <p>
                {auctionQuery.data.data.auctionInfo.bidderCnt}명 경매 참여중
              </p>
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
              <div className="space-x-3">
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
                {loggedIn &&
                  userId === auctionQuery.data.data.auctionInfo.sellerId &&
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
                {userId !== auctionQuery.data.data.auctionInfo.sellerId &&
                  !isWithinFiveMinute(
                    auctionQuery.data.data.auctionInfo.createdAt,
                  ) &&
                  !isAuctionEnd(
                    auctionQuery.data.data.auctionInfo.endAuctionTime,
                  ) &&
                  auctionQuery.data.data.auctionInfo.auctionStatus ===
                    'AUCTION_PROGRESS' && (
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
                            if (loggedIn) {
                              setShowConfirmModal(true);
                            } else {
                              alert('로그인이 필요합니다.');
                              openModal();
                            }
                          }}
                        >
                          즉시결제
                        </button>
                      </TERipple>
                    </>
                  )}
              </div>
            </div>
          </div>
          {/* <!-- 상품설명 --> */}
          <div className="space-y-5 my-5">
            <h2 className="text-2xl font-extrabold mb-4 text-deepblue2">
              상품 정보
            </h2>
            <p>{auctionQuery.data.data.auctionInfo.content}</p>
            <div>
              <h2 className="text-2xl font-extrabold mb-4 text-deepblue2">
                태그
              </h2>
              <p className="space-x-2">
                {auctionQuery.data.data.tags.length !== 0 &&
                  auctionQuery.data.data.tags.map(tag => (
                    <span
                      role="button"
                      key={tag.tagName}
                      onClick={() =>
                        navigate(
                          `/search?keyword=${encodeURIComponent(tag.tagName)}`,
                        )
                      }
                    >
                      #{tag.tagName}
                    </span>
                  ))}
              </p>
            </div>
          </div>
          <SellerInfo auctionId={auctionId} />
        </div>
        {/* 게시글 삭제 확정 모달  */}
        {showDeleteConfirmModal && (
          <DeleteConfirmModal
            setShowModal={setShowDeleteConfirmModal}
            auctionName={auctionQuery.data.data.auctionInfo.title}
            auctionId={auctionQuery.data.data.auctionInfo.auctionId}
          />
        )}

        {/* 경매 기록 모달  */}
        {showBidHistoryModal && (
          <BidHistoryModal
            showModal={showBidHistoryModal}
            setShowModal={setShowBidHistoryModal}
            auctionId={auctionId}
            sellerId={auctionQuery.data.data.auctionInfo.sellerId}
          />
        )}

        {/* 결제 확정 모달  */}
        {showConfirmModal && (
          <PaymentConfirmModal
            showModal={showConfirmModal}
            setShowModal={setShowConfirmModal}
            setShowPayModal={setShowPayModal}
            point={{
              currentPoint: auctionQuery.data.data.auctionInfo.currentPrice,
              instantPoint: auctionQuery.data.data.auctionInfo.instantPrice,
            }}
            auctionName={auctionQuery.data.data.auctionInfo.title}
            auctionId={auctionId}
          />
        )}

        {/* 포인트 충전 모달  */}
        {showPayModal && (
          <PaymentModal setShowModal={setShowPayModal} money={0} price={0} />
        )}
      </div>
    );
  }
  if (auctionQuery.status === 'error')
    return <div>{auctionQuery.error.message}</div>;
  return <div>{}</div>;
}

// Image slider
export function ImageSlider({ slides }) {
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
  if (slides.length === 0) return null;

  return (
    <div className="w-96">
      <div className="relative w-96 h-96 overflow-hidden">
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
