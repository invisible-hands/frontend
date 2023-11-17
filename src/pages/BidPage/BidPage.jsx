import React, { useEffect, useState } from 'react';
import { TERipple } from 'tw-elements-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import PaymentModal from '../../components/PaymentModal';
import BidSuccessModal from '../../components/BidSuccessModal';
import { fetchBidPage } from '../../queries/auctionQueries';

// import { updateBidPrice } from '../../queries/bidQueries';
import { calculateRemainTime } from '../../utils/timeUtils';
import useLoginStore from '../../stores/loginStore';
import BidHistory from '../../components/BidHistory';

export default function BidPage() {
  const { accessToken } = useLoginStore();
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_URL;
  const [showPayModal, setShowPayModal] = useState(false);
  const [showBidSuccessModal, setShowBidSuccessModal] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const { status, error, data } = useQuery({
    queryKey: ['BidInfo', auctionId],
    queryFn: () => fetchBidPage(auctionId, accessToken),
    enabled: !!accessToken,
  });

  function updateBidPrice(id, price, userToken) {
    const url = `${API_URL}/auction/${id}/bid`;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const priceData = {
      price,
    };

    axios
      .post(url, priceData, config)
      .then(res => {
        console.log(res);
        setShowBidSuccessModal(true);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  }

  useEffect(() => {
    if (data) {
      setNewPrice(data.data.currentPrice + 1000);
    }
  }, [data]);

  if (status === 'pending') return <div>로딩중...</div>;
  if (status === 'error') return <div>{error.message}</div>;
  if (status === 'success') console.log(data.data);
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-[1024px]">
        <div className="flex flex-row ">
          {/* <!-- 상품이미지 --> */}
          <div className="w-72">
            <div className="relative w-72 h-72 overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${data.data.image})`,
                }}
                className="w-full h-full bg-center bg-cover duration-500"
              />
            </div>
          </div>

          {/* <!-- 상품정보 --> */}
          <div>
            <p>상품이름 : {data.data.title}</p>
            <p>
              현재 입찰가 <span>{data.data.currentPrice}</span>
            </p>

            <p>남은 시간 : {calculateRemainTime(data.data.endAuctionTime)}</p>
            <label>보유 포인트</label>
            <input type="number" value={data.data.money} readOnly />
            <label>입찰 가격(직접 입력 가능) </label>
            <input
              type="number"
              id="exampleFormControlInputNumber"
              label="Number input"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
            />

            <div>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setShowPayModal(true)}
                >
                  충전하기
                </button>
              </TERipple>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setNewPrice(newPrice + 1000)}
                >
                  +1000
                </button>
              </TERipple>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setNewPrice(newPrice + 5000)}
                >
                  +5000
                </button>
              </TERipple>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setNewPrice(newPrice + 10000)}
                >
                  +10000
                </button>
              </TERipple>
            </div>
          </div>
        </div>

        {/* <!-- 상품설명 --> */}
        <div>
          <BidHistory auctionId={auctionId} />
        </div>
        <div>
          <h2>약관</h2>
          <p>약관 내용</p>
        </div>
        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="checkboxDefault"
            >
              위 주의 사항에 동의하십니까?
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="checkboxDefault"
              />
            </label>
          </div>
        </div>
        <p>최종 입찰 신청 금액 : {newPrice}</p>
        <div>
          <TERipple rippleColor="white">
            <button
              type="button"
              className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => navigate(-1)}
            >
              입찰 안하기
            </button>
          </TERipple>
          <TERipple rippleColor="white">
            <button
              type="button"
              className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => {
                updateBidPrice(auctionId, newPrice, accessToken);
              }}
            >
              상품 입찰하기
            </button>
          </TERipple>
        </div>
      </div>

      {/* 포인트 충전 모달  */}
      <PaymentModal showModal={showPayModal} setShowModal={setShowPayModal} />
      {/* 입찰 성공 모달  */}
      <BidSuccessModal
        showModal={showBidSuccessModal}
        setShowModal={setShowBidSuccessModal}
      />
    </div>
  );
}
