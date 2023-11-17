import React from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { purchaseInstant, fetchBidPage } from '../queries/auctionQueries';
import useLoginStore from '../stores/loginStore';

export default function PaymentConfirmModal({
  showModal,
  setShowModal,
  setShowPayModal,
  point,
  auctionName,
  auctionId,
}) {
  const { instantPoint } = point;
  const { accessToken: token } = useLoginStore();
  const { status, error, data } = useQuery({
    queryKey: ['BidInfo', auctionId],
    queryFn: () => fetchBidPage(auctionId, token),
  });

  if (status === 'pending') return <div>로딩중...</div>;
  if (status === 'error') return <div>에러: {error.message}</div>;
  if (status === 'success') console.log(data);
  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <TEModalDialog centered>
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              즉시 결제
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody>
            <p className="text-center py-4">
              {`"${auctionName}" 구매하시겠습니까?`}
            </p>
            <div className="px-responsive-modal-padding space-y-2">
              <div className="flex justify-between">
                <span>보유중인 포인트</span>
                <span>{data.data.money} point</span>
              </div>
              <div className="flex justify-between">
                <span>즉시 구매 금액</span>
                <span>{instantPoint} point</span>
              </div>
              <div className="flex justify-between">
                <span>잔여 포인트</span>
                <span>{data.data.money - instantPoint} point</span>
              </div>
              {data.data.money - instantPoint < 0 && (
                <div className="flex justify-center text-danger">
                  포인트가 부족합니다.
                </div>
              )}
            </div>
          </TEModalBody>
          <TEModalFooter className="flex justify-center">
            {data.data.money - instantPoint >= 0 ? (
              <TERipple rippleColor="light" rippleCentered>
                <button
                  type="button"
                  className="inline-block rounded-full bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => purchaseInstant(auctionId, token)}
                >
                  즉시결제
                </button>
              </TERipple>
            ) : (
              <TERipple rippleColor="light" rippleCentered>
                <button
                  type="button"
                  className="inline-block rounded-full bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setShowPayModal(true)}
                >
                  충전하기
                </button>
              </TERipple>
            )}
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

PaymentConfirmModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setShowPayModal: PropTypes.func.isRequired,
  point: PropTypes.shape({
    currentPoint: PropTypes.number.isRequired,
    instantPoint: PropTypes.number.isRequired,
  }).isRequired,
  auctionName: PropTypes.string.isRequired,
  auctionId: PropTypes.string.isRequired,
};
