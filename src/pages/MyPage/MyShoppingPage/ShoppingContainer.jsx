import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../../stores/loginStore.js';

const API_URL = import.meta.env.VITE_APP_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export function PurchaseContainer() {
  const { accessToken } = useLoginStore();
  const [purchaseData, setPurchaseData] = useState({
    all: 0,
    before: 0,
    progress: 0,
    complete: 0,
  });
  const navigate = useNavigate();
  const goToPurchase = () => {
    navigate('/profile/shopping/purchase');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/deal/purchases/count', {
          headers: {
            // Authorization 헤더에 Bearer 토큰 추가
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setPurchaseData(response.data.data);
        } else {
          console.error('API 요청 실패:', response.status);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 pt-6 block text-md font-semibold">
        구매 목록
      </div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md sm:min-w-[10rem] md:min-w-[35.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                전체
              </div>
              <div className="mt-2 text-sm text-white">{purchaseData.all}</div>
            </div>
            <div className="block pl-12 pr-6">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                배송전
              </div>
              <div className="mt-2 text-sm text-white">
                {purchaseData.before}
              </div>
            </div>
            <div className="block pl-12 pr-6">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                진행중
              </div>
              <div className="mt-2 text-sm text-white">
                {purchaseData.progress}
              </div>
            </div>
            <div className="block pl-8 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                완료
              </div>
              <div className="mt-2 text-sm text-white">
                {purchaseData.complete}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AuctionContainer() {
  const { accessToken } = useLoginStore();
  const [auctionData, setAuctionData] = useState({
    all: 0,
    progress: 0,
    complete: 0,
  });
  const navigate = useNavigate();
  const goToPurchase = () => {
    navigate('/profile/shopping/auction');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/deal/bids/count', {
          headers: {
            // Authorization 헤더에 Bearer 토큰 추가
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setAuctionData(response.data.data);
        } else {
          console.error('API 요청 실패:', response.status);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 pt-6 block text-md font-semibold">
        경매 목록
      </div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md sm:min-w-[10rem] md:min-w-[35.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                전체
              </div>
              <div className="mt-2 text-sm text-white">{auctionData.all}</div>
            </div>
            <div className="block pl-12 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                경매 진행
              </div>
              <div className="mt-2 text-sm text-white">
                {auctionData.progress}
              </div>
            </div>
            <div className="block pl-8 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                경매 종료
              </div>
              <div className="mt-2 text-sm text-white">
                {auctionData.complete}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SellingContainer() {
  const { accessToken } = useLoginStore();
  const [sellingData, setSellingData] = useState({
    all: 0,
    before: 0,
    progress: 0,
    complete: 0,
  });
  const navigate = useNavigate();
  const goToPurchase = () => {
    navigate('/profile/shopping/selling');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/deal/sales/count', {
          headers: {
            // Authorization 헤더에 Bearer 토큰 추가
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setSellingData(response.data.data);
        } else {
          console.error('API 요청 실패:', response.status);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 pt-6 block text-md font-semibold">
        판매 목록
      </div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md sm:min-w-[10rem] md:min-w-[35.25rem] text-center ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                전체
              </div>
              <div className="mt-2 text-sm text-white">{sellingData.all}</div>
            </div>
            <div className="block pl-12 pr-6">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                배송전
              </div>
              <div className="mt-2 text-sm text-white">
                {sellingData.before}
              </div>
            </div>
            <div className="block pl-12 pr-6">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                진행중
              </div>
              <div className="mt-2 text-sm text-white">
                {sellingData.progress}
              </div>
            </div>
            <div className="block pl-8 pr-8">
              <div
                role="button"
                className="text-sm text-gray-600"
                onClick={goToPurchase}
              >
                완료
              </div>
              <div className="mt-2 text-sm text-white">
                {sellingData.complete}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
