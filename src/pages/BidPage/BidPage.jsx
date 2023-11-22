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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isBidButtonDisabled, setIsBidButtonDisabled] = useState(true);
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
        if (res.status === 200) {
          alert('입찰에 성공했습니다.');
          setShowBidSuccessModal(true);
        }
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  }

  useEffect(() => {
    if (data) {
      setNewPrice(data.data.currentPrice + 1000);
    }
    if (data) {
      setIsBidButtonDisabled(
        agreedToTerms ||
          newPrice > data.data.currentPrice + 1000 ||
          newPrice <= data.data.money,
      );
    }
  }, [data]);

  if (status === 'pending') return <div />;
  if (status === 'pending' && !!accessToken) return <div>로딩중</div>;
  if (status === 'error') return <div>{error.message}</div>;
  if (status === 'success') console.log(data.data);
  return (
    <div className="flex justify-center">
      <div className="w-full p-6 lg:w-[1024px]">
        <h1 className="text-4xl font-extrabold mb-4 text-deepblue2">
          상품 입찰하기
        </h1>
        <div className="flex flex-row space-x-5">
          {/* <!-- 상품이미지 --> */}
          <div className="w-96">
            <div className="relative w-96 h-96 overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${data.data.image})`,
                }}
                className="w-full h-full bg-center bg-cover duration-500"
              />
            </div>
          </div>

          {/* <!-- 상품정보 --> */}
          <div className="w-96 space-y-5">
            <div>
              <label>상품명</label>
              <p className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded">
                {data.data.title}
              </p>
            </div>
            <div className="flex flex-row space-x-10">
              <div className="flex-1">
                <label>현재 입찰가</label>
                <p className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded">
                  {data.data.currentPrice}
                </p>
              </div>
              <div className="flex-1">
                <label>남은 시간</label>
                <br />
                <p className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded">
                  {calculateRemainTime(data.data.endAuctionTime)}
                </p>
              </div>
            </div>
            <div className="flex flex-row space-x-10">
              <div className="flex-1">
                <label>보유 포인트</label>
                <p className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded">
                  {data.data.money}
                </p>
              </div>
              <div className="flex-1">
                <label>입찰 가격(직접 입력 가능)</label>
                <br />
                <input
                  type="number"
                  className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded"
                  id="exampleFormControlInputNumber"
                  label="Number input"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                />
                {/* <TERipple rippleColor="white">
                  <button
                    type="button"
                    className="inline-block rounded bg-blue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={() => setNewPrice(data.data.currentPrice + 1000)}
                  >
                    초기화
                  </button>
                </TERipple> */}
              </div>
            </div>

            <div className="flex justify-between">
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-blue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setShowPayModal(true)}
                >
                  충전하기
                </button>
              </TERipple>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setNewPrice(newPrice + 1000)}
                >
                  +1000
                </button>
              </TERipple>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setNewPrice(newPrice + 5000)}
                >
                  +5000
                </button>
              </TERipple>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-blackish px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
          <h1 className="text-3xl font-extrabold mb-4 text-deepblue2">
            입찰 내역
          </h1>
          <BidHistory auctionId={auctionId} />
        </div>
        <h1 className="text-3xl font-extrabold mb-4 text-deepblue2">
          이용 약관
        </h1>
        <div className="terms-agreement overflow-y-auto h-40 my-5 p-2 border border-grayish rounded">
          <p className="text-xs text-left whitespace-normal">
            <br />
            <br />
            <strong>약관 동의서:</strong>
            경매 규칙 준수: 참여자는 모든 경매 규칙과 절차를 준수할 것을
            동의합니다. 이는 경매 시작 및 종료 시간, 입찰 방법, 최소 입찰 가격
            증가액 등을 포함합니다.
            <br />
            정보의 정확성: 참여자는 제공하는 모든 정보가 정확하고 최신의 것임을
            보장합니다. 부정확한 정보 제공으로 인한 책임은 참여자에게 있습니다.
            <br />
            물품의 상태 확인: 참여자는 경매에 부쳐진 물품의 상태와 설명을 주의
            깊게 검토하고 이에 대한 책임은 참여자 본인에게 있음을 인지합니다.
            <br />
            결제 조건: 낙찰된 참여자는 경매 약관에 명시된 기간 내에 전체 결제를
            완료해야 합니다. 지불 지연은 추가 수수료 또는 경매 참여 자격 상실을
            초래할 수 있습니다.
            <br />
            책임의 한계: 경매 주최자는 경매 물품의 품질, 상태 또는 설명의
            정확성에 대해 책임을 지지 않습니다. 모든 물품은 {`'있는 그대로'`}의
            상태로 제공되며, 모든 판매는 최종적입니다.
            <br />
          </p>
        </div>

        <div className="flex justify-center">
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="checkboxDefault"
            >
              주의 사항에 동의하십니까?
              <input
                id="checkboxDefault"
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <p className="text-center mt-5">최종 입찰 신청 금액 : {newPrice}</p>
        <div className="flex justify-center space-x-2 my-5">
          <TERipple rippleColor="white">
            <button
              type="button"
              className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => navigate(-1)}
            >
              {`<-입찰 안하기`}
            </button>
          </TERipple>
          <TERipple rippleColor="white">
            <button
              type="button"
              className={`inline-block rounded ${
                isBidButtonDisabled
                  ? `bg-danger hover-bg-danger-300`
                  : `bg-deepblue1 hover:bg-deepblue2`
              } px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              disabled={isBidButtonDisabled}
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
      <PaymentModal
        showModal={showPayModal}
        setShowModal={setShowPayModal}
        money={data.data.money}
        price={data.data.currentPrice}
      />
      {/* 입찰 성공 모달  */}
      <BidSuccessModal
        showModal={showBidSuccessModal}
        setShowModal={setShowBidSuccessModal}
      />
    </div>
  );
}
