import React, { useEffect, useState } from 'react';
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

export default function PaymentModal({
  showModal,
  setShowModal,
  money,
  price,
}) {
  const [newPoint, setNewPoint] = useState(Number(price) + 1000);
  const [pointError, setPointError] = useState(false);

  const handleChange = e => {
    const inputValue = e.target.value;
    const regExp = /^[0-9\b]+$/;
    if (regExp.test(inputValue)) {
      setNewPoint(inputValue);
    }

    if (Number(inputValue) < Number(price) + 1000) {
      setPointError(true);
    } else {
      setPointError(false);
    }
  };

  useEffect(() => {
    setNewPoint(Number(price) + 1000);
    console.log('값 초기화');
  }, [showModal]);

  return (
    <div className="flex justify-center items-center min-h-full place-items-center">
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                포인트 충전하기
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => {
                  setShowModal(false);
                }}
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
              <div className="flex justify-center">
                <div className="w-96 space-y-5">
                  <h5 className="text-2xl font-extrabold mb-4">
                    충전 금액을 입력해주세요
                  </h5>
                  <div>
                    <p>필요한 포인트 {price + 1000 - money} point</p>
                    <p>충전 후 포인트 {Number(newPoint) + money} point</p>
                  </div>
                  <div>
                    {pointError && (
                      <p className="text-sm text-danger">{`추가적인 포인트 충전이 필요합니다 (최소 ${
                        price + 1000
                      } point 이상)`}</p>
                    )}
                    <input
                      type="number"
                      className="w-full bg-deepblue1 text-white px-2 py-1 rounded"
                      value={newPoint}
                      onChange={e => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="flex justify-between space-x-2 my-5">
                    <TERipple rippleColor="light" rippleCentered>
                      <button
                        type="button"
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-blue3 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        onClick={() =>
                          setNewPoint(state => Number(state) + 20000)
                        }
                      >
                        +20000
                      </button>
                    </TERipple>
                    <TERipple rippleColor="light" rippleCentered>
                      <button
                        type="button"
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-blue3 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        onClick={() =>
                          setNewPoint(state => Number(state) + 50000)
                        }
                      >
                        +50000
                      </button>
                    </TERipple>
                    <TERipple rippleColor="light" rippleCentered>
                      <button
                        type="button"
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-blue3 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        onClick={() =>
                          setNewPoint(state => Number(state) + 100000)
                        }
                      >
                        +100000
                      </button>
                    </TERipple>
                  </div>
                </div>
              </div>
            </TEModalBody>
            <TEModalFooter className="flex justify-center">
              <TERipple rippleColor="light" rippleCentered>
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  즉시결제
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

PaymentModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  money: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
