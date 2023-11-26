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
import axios from 'axios';
import useLoginStore from '../stores/loginStore';
import AddPointButton from '../assets/payment_icon_yellow_medium.png';

export default function PaymentModal({
  showModal,
  setShowModal,
  point,
  price,
}) {
  const [newPoint, setNewPoint] = useState(
    price + 1000 - point > 0 ? price + 1000 - point : 0,
  );
  const [pointError, setPointError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useLoginStore();
  const API_URL = import.meta.env.VITE_APP_URL;

  const handleChange = e => {
    let inputValue = e.target.value;
    // 숫자 이외의 문자를 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue > 1000000 || inputValue < 1000) {
      setPointError(true);
      setNewPoint(inputValue);
    } else {
      setPointError(false);
      setNewPoint(inputValue);
    }
  };

  const isMobile = () => {
    const user = navigator.userAgent;
    let isCheck = false;
    if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
      isCheck = true;
    }
    return isCheck;
  };

  const submitPayment = submitPoint => {
    if (submitPoint === 0) {
      alert('충전할 포인트를 입력해주세요');
      return;
    }
    if (pointError) {
      alert('충전할 포인트를 확인해주세요');
      return;
    }

    const url = `${API_URL}/api/payment/ready`;
    const priceData = {
      price: submitPoint,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `application/json`,
      },
    };

    setLoading(true);
    axios
      .post(url, JSON.stringify(priceData), config)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem('tid', res.data.tid);
          if (isMobile()) {
            window.location.href = res.data.next_redirect_mobile_url;
          } else {
            window.location.href = res.data.next_redirect_pc_url;
          }
        }
      })
      .catch(err => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 모달이 닫힐 때 newPoint를 초기화
  useEffect(() => {
    return () => {
      setNewPoint(Number(price) + 1000);
      setPointError(false);
    };
  }, []);

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
                  <div className="flex flex-col w-full">
                    <p className="flex justify-between">
                      <span>보유중인 포인트</span>
                      <span>{point} point</span>
                    </p>
                    {price !== 0 && (
                      <p className="flex justify-between">
                        <span>필요한 포인트</span>
                        <span>
                          {price + 1000 - point < 0 ? 0 : price + 1000 - point}{' '}
                          point
                        </span>
                      </p>
                    )}
                    <p className="flex justify-between">
                      <span>충전 후 포인트</span>{' '}
                      <span>
                        {(newPoint === '' ? 0 : parseInt(newPoint, 10)) + point}{' '}
                        point
                      </span>
                    </p>
                  </div>
                  <div>
                    {pointError && newPoint < 1000 && (
                      <p className="text-sm text-danger">
                        1000 point 이상 충전이 가능합니다.
                      </p>
                    )}
                    {pointError && newPoint > 1000000 && (
                      <p className="text-sm text-danger">
                        추가적인 포인트 충전이 불가능합니다 (최대 1,000,000
                        point 이하)
                      </p>
                    )}
                    <input
                      type="number"
                      className="w-full bg-deepblue1 text-white px-2 py-1 rounded text-right"
                      value={newPoint}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between space-x-auto my-5">
                    <TERipple rippleColor="light" rippleCentered>
                      <button
                        type="button"
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-deepblue2"
                        onClick={() =>
                          setNewPoint(state => Number(state) + 10000)
                        }
                      >
                        +10000
                      </button>
                    </TERipple>
                    <TERipple rippleColor="light" rippleCentered>
                      <button
                        type="button"
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-deepblue2"
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
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-deepblue2"
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
                        className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-whitish transition duration-150 ease-in-out hover:bg-deepblue2"
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
                  disabled={loading}
                  onClick={() => {
                    submitPayment(newPoint);
                  }}
                >
                  <img src={AddPointButton} alt="충전하기" />
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
  point: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
