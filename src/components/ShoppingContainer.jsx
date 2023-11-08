import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export function PurchaseContainer() {
  const [purchaseData, setPurchaseData] = useState([
    { all: 0, before: 0, progress: 0, complete: 0 },
  ]);

  useEffect(() => {
    const mockData = {
      all: 12,
      before: 0,
      progress: 8,
      complete: 4,
    };

    setPurchaseData(mockData);
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // 여기서 accessToken을 가져오거나 저장된 토큰을 사용하세요.
  //       const accessToken = localStorage.getItem('accessToken'); // 예: 로컬 스토리지에서 토큰 가져오기

  //       if (!accessToken) {
  //         // 토큰이 없으면 알림 메시지 표시하고 메인 페이지로 이동
  //         alert('로그인이 필요합니다.');
  //         window.location.href = '/'; // 메인 페이지로 리디렉션
  //         return;
  //       }

  //       // Axios 요청 시 헤더에 accessToken 추가
  //       const response = await axios.get('/api/deal/purchases/count', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { data } = response.data;
  //       setPurchaseData({
  //         all: data.all,
  //         before: data.before,
  //         progress: data.progress,
  //         complete: data.complete,
  //       });
  //     } catch (error) {
  //       console.error('데이터 가져오기 실패:', error);
  //     }
  //   }

  //   // fetchData 함수 호출
  //   fetchData();
  // }, []);

  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">판매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[37.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div className="text-sm text-gray-600">전체</div>
              <div className="mt-2 text-sm text-white">{purchaseData.all}</div>
            </div>
            <div className="block pl-12 pr-6">
              <div className="text-sm text-gray-600">베송전</div>
              <div className="mt-2 text-sm text-white">
                {purchaseData.before}
              </div>
            </div>
            <div className="block pl-12 pr-6">
              <div className="text-sm text-gray-600">진행중</div>
              <div className="mt-2 text-sm text-white">
                {purchaseData.progress}
              </div>
            </div>
            <div className="block pl-8 pr-8">
              <div className="text-sm text-gray-600">완료</div>
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
  const [auctionData, setAuctionData] = useState([
    { all: 0, progress: 0, complete: 0 },
  ]);

  useEffect(() => {
    const mockData = {
      all: 12,
      progress: 8,
      complete: 4,
    };

    setAuctionData(mockData);
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // 여기서 accessToken을 가져오거나 저장된 토큰을 사용하세요.
  //       const accessToken = localStorage.getItem('accessToken'); // 예: 로컬 스토리지에서 토큰 가져오기

  //       if (!accessToken) {
  //         // 토큰이 없으면 알림 메시지 표시하고 메인 페이지로 이동
  //         alert('로그인이 필요합니다.');
  //         window.location.href = '/'; // 메인 페이지로 리디렉션
  //         return;
  //       }

  //       // Axios 요청 시 헤더에 accessToken 추가
  //       const response = await axios.get('/api/deal/bids/count', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { data } = response.data;
  //       setSellingData({
  //         all: data.all,
  //
  //         progress: data.progress,
  //         complete: data.complete,
  //       });
  //     } catch (error) {
  //       console.error('데이터 가져오기 실패:', error);
  //     }
  //   }

  //   // fetchData 함수 호출
  //   fetchData();
  // }, []);

  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">경매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[37.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div className="text-sm text-gray-600">전체</div>
              <div className="mt-2 text-sm text-white">{auctionData.all}</div>
            </div>
            <div className="block pl-12 pr-8">
              <div className="text-sm text-gray-600">경매 진행</div>
              <div className="mt-2 text-sm text-white">
                {auctionData.progress}
              </div>
            </div>
            <div className="block pl-8 pr-8">
              <div className="text-sm text-gray-600">경매 종료</div>
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
  const [sellingData, setSellingData] = useState([
    { all: 0, before: 0, progress: 0, complete: 0 },
  ]);

  useEffect(() => {
    const mockData = {
      all: 12,
      before: 0,
      progress: 8,
      complete: 4,
    };

    setSellingData(mockData);
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // 여기서 accessToken을 가져오거나 저장된 토큰을 사용하세요.
  //       const accessToken = localStorage.getItem('accessToken'); // 예: 로컬 스토리지에서 토큰 가져오기

  //       if (!accessToken) {
  //         // 토큰이 없으면 알림 메시지 표시하고 메인 페이지로 이동
  //         alert('로그인이 필요합니다.');
  //         window.location.href = '/'; // 메인 페이지로 리디렉션
  //         return;
  //       }

  //       // Axios 요청 시 헤더에 accessToken 추가
  //       const response = await axios.get('/api/deal/sales/count', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { data } = response.data;
  //       setSellingData({
  //         all: data.all,
  //         before: data.before,
  //         progress: data.progress,
  //         complete: data.complete,
  //       });
  //     } catch (error) {
  //       console.error('데이터 가져오기 실패:', error);
  //     }
  //   }

  //   // fetchData 함수 호출
  //   fetchData();
  // }, []);

  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">판매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[37.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div className="text-sm text-gray-600">전체</div>
              <div className="mt-2 text-sm text-white">{sellingData.all}</div>
            </div>
            <div className="block pl-12 pr-6">
              <div className="text-sm text-gray-600">베송전</div>
              <div className="mt-2 text-sm text-white">
                {sellingData.before}
              </div>
            </div>
            <div className="block pl-12 pr-6">
              <div className="text-sm text-gray-600">진행중</div>
              <div className="mt-2 text-sm text-white">
                {sellingData.progress}
              </div>
            </div>
            <div className="block pl-8 pr-8">
              <div className="text-sm text-gray-600">완료</div>
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
