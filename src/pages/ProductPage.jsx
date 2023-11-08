import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RxDotFilled } from 'react-icons/rx';
import useModalStore from '../stores/modalStore';
import useLoginStore from '../stores/loginStore';
import PaymentConfirmModal from '../components/PaymentConfirmModal';
import PaymentModal from '../components/PaymentModal';
import {
  isWithinFiveMinute,
  isAuctionEnd,
  calculateRemainTime,
} from '../utils/timeUtils';
import BidHistoryModal from '../components/BidHistoryModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const demoData = {
  status: 'string',
  message: 'string',
  data: {
    auctionInfo: {
      auctionId: 1,
      sellerId: 1,
      title: '아이패드 에어4',
      content: '미개봉 새 제품, 스카이블루',
      itemCondition: 'NEW',
      currentPrice: 175000,
      instantPrice: 200000,
      createdAt: '2023-11-08 10:44:10',
      endAuctionTime: '2023-11-08 11:11:10',
      duration: 24,
      bidderCnt: 8,
      viewCnt: 32,
    },
    images: [
      {
        imageId: 14,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/slides/041.jpg',
      },
      {
        imageId: 15,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
      },
    ],
    tags: [
      {
        tagId: 6,
        tagName: '#애플',
      },
    ],
    authorCheck: true,
  },
};
// 로그인 여부에 따라서 조건부 렌더링 user/visitor/author

export default function ProductPage() {
  const { loggedIn } = useLoginStore();
  const { openModal } = useModalStore();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const testPoint = {
    currentPoint: 2000,
    instantPoint: 20000,
  };

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-[1024px]">
        <div className="flex flex-row ">
          {/* <!-- 상품이미지 --> */}
          <ImageSlider slides={demoData.data.images} />

          {/* <!-- 상품정보 --> */}
          <div>
            <p>{demoData.data.auctionInfo.title}</p>
            <p>
              현재 입찰가 <span>{demoData.data.auctionInfo.currentPrice}</span>{' '}
              바로 구매가 <span>{demoData.data.auctionInfo.instantPrice}</span>
            </p>
            <p>{demoData.data.auctionInfo.bidderCnt}명 경매 참여중</p>
            <p>남은 시간 : 12h 12m 12s</p>
            <p>
              상품 상태 :{' '}
              {demoData.data.auctionInfo.itemCondition === 'NEW'
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
            {demoData.data.authorCheck === true &&
              isWithinFiveMinute(demoData.data.auctionInfo.createdAt) && (
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
            {demoData.data.authorCheck === false &&
              !isWithinFiveMinute(demoData.data.auctionInfo.createdAt) &&
              !isAuctionEnd(demoData.data.auctionInfo.endAuctionTime) && (
                <>
                  <TERipple rippleColor="white">
                    <button
                      type="button"
                      className="inline-block rounded bg-blue2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue1 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={() => {
                        if (!loggedIn) {
                          openModal();
                        }
                        navigate(`/bid/${demoData.data.auctionInfo.auctionId}`);
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
                        if (!loggedIn) {
                          openModal();

                          setShowConfirmModal(true);
                        } else {
                          setShowConfirmModal(true);
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

        {/* <!-- 상품설명 --> */}
        <div>
          <h2>상품 정보</h2>
          <p>{demoData.data.auctionInfo.content}</p>
          <p>{demoData.data.tags.map(tag => tag.tagName)}</p>
        </div>

        <SellerInfo auctionId={productId} />
      </div>
      {/* 게시글 삭제 확정 모달  */}
      <DeleteConfirmModal
        showModal={showDeleteConfirmModal}
        setShowModal={setShowDeleteConfirmModal}
        productName="PS4랑 CD개"
      />

      {/* 결제 확정 모달  */}
      <BidHistoryModal
        showModal={showBidHistoryModal}
        setShowModal={setShowBidHistoryModal}
        auctionId={productId}
      />
      {/* 결제 확정 모달  */}
      <PaymentConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        setShowPayModal={setShowPayModal}
        point={testPoint}
        productName="PS4랑 CD개"
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
function SellerInfo({ auctionId }) {
  // 데이터 받아올 때 auctionId 필요!
  console.log(auctionId);
  const demoSellerData = {
    sellerId: 6,
    nickname: 'biggu',
    profileImage: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
    auctionCnt: 5,
    auctionList: [
      {
        auctionId: 15,
        title: '생로랑 부츠',
        currentPrice: 175000,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
        createdAt: '2023-11-01 07:56:51',
        auctionStartTime: '2023-11-01 07:56:51',
        duration: 24,
      },
      {
        auctionId: 16,
        title: '아크네 부츠',
        currentPrice: 200000,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
        createdAt: '2023-11-01T07:56:51.574Z',
        auctionStartTime: '2023-11-01T07:56:51.575Z',
        duration: 24,
      },
      {
        auctionId: 17,
        title: '토가 부츠',
        currentPrice: 155000,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
        createdAt: '2023-11-01T07:56:51.574Z',
        auctionStartTime: '2023-11-01T07:56:51.575Z',
        duration: 24,
      },
      {
        auctionId: 18,
        title: '토가 부츠',
        currentPrice: 155000,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
        createdAt: '2023-11-01T07:56:51.574Z',
        auctionStartTime: '2023-11-01T07:56:51.575Z',
        duration: 24,
      },
      {
        auctionId: 19,
        title: '토가 부츠',
        currentPrice: 155000,
        imageUrl: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
        createdAt: '2023-11-01T07:56:51.574Z',
        auctionStartTime: '2023-11-01T07:56:51.575Z',
        duration: 24,
      },
    ],
    currentPage: 0,
    totalPage: 3,
  };
  return (
    <>
      {/* <!-- 판매자 프로필 --> */}
      <h3>판매자 정보</h3>
      <div className="flex">
        <div>
          <img
            src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
            className="mx-auto mb-4 w-32 rounded-full"
            alt="판매자프로필"
          />
        </div>
        <div className="flex flex-col justify-center ml-2">
          <p className="mb-2 text-xl font-medium leading-tight">
            {demoSellerData.nickname}
          </p>
          <p className="text-neutral-500 dark:text-neutral-400">
            상품 {demoSellerData.auctionCnt}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <span className="cursor-pointer text-sm">{`더보기 >`}</span>
      </div>
      {demoSellerData.auctionList.map(
        (auction, index) =>
          index < 3 && (
            <div
              className="inline-block rounded-lg bg-whitish shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-blacktish-700"
              key={auction.auctionId}
            >
              <TERipple>
                <div className="relative w-72 h-72 overflow-hidden">
                  <img
                    src={auction.imageUrl}
                    alt="Description"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="w-72 p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {auction.title}
                  </h5>
                  <p className="flex justify-between mb-4 text-xs text-neutral-600 dark:text-neutral-200">
                    <span>{auction.currentPrice} 원</span>
                    <span>
                      남은 경매 시간{' '}
                      {calculateRemainTime(
                        auction.auctionStartTime,
                        auction.duration,
                      )}
                    </span>
                  </p>
                  <a href={`/product/${auction.auctionId}`}>
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
                  </a>
                </div>
              </TERipple>
            </div>
          ),
      )}
    </>
  );
}

ImageSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imageId: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

SellerInfo.defaultProps = {
  auctionId: 1,
};
SellerInfo.propTypes = {
  auctionId: PropTypes.string,
};
