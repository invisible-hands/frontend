import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLoginStore from '../stores/loginStore';
import Sidebar from '../components/Sidebar';
import PurchaseRecord from '../components/PurchaseRecord';
import SellingRecord from '../components/SellingRecord';
import AuctionRecord from '../components/AuctionRecord';
import {
  PurchaseContainer,
  AuctionContainer,
  SellingContainer,
} from '../components/ShoppingContainer';
import {
  PurchaseItem,
  AuctionItem,
  SellingItem,
} from '../components/PurchaseItem';

const axiosInstance = axios.create({
  baseURL: 'https://ka1425de5708ea.user-app.krampoline.com',
});

function DefaultContent() {
  // const [items, setItems] = useState([]);

  const [purchases, setPurchases] = useState([]);
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const { accessToken } = useLoginStore();
  // const accessToken = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasesResponse = await axiosInstance.get(
          `/api/deal/purchases?status=progress&page=0&size=1`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (purchasesResponse.status === 200) {
          // API 성공 시 목 데이터 사용
          setPurchases(purchasesResponse.data.data.auctions);
          console.log('되냐?', purchasesResponse.data.data.auctions);
        }

        // bids API 호출
        const response = await axiosInstance.get(
          `/api/deal/bids?status=progress&page=0&size=1`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        if (response.status === 200) {
          setItems(response.data.data.auctions);
          console.log('소리 질러', response.data.data.auctions);
        }

        // sales API 호출
        const salesResponse = await axiosInstance.get(
          '/api/deal/sales?status=before&page=0&size=1',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        if (salesResponse.status === 200) {
          // API 성공 시 목 데이터 사용
          setSales(salesResponse.data.data.sales);
          console.log('뒤질래?', salesResponse.data.data.sales);
        }
      } catch (error) {
        console.error('Fetching data failed', error);
        // API 요청에 실패하면 오류 처리를 해야 할 수도 있어
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-[31rem] md:w-[40%] lg:mx-auto">
        <div className="pt-8">
          <h1 className="text-2xl font-extrabold pt-6">쇼핑 정보</h1>
          <PurchaseContainer />
          <div className="p-1 justufy-center max-w-[31rem] md:min-w-[35.9365rem] lg:max-w-xl mx-auto">
            <div className="p-1 bg-white rounded-xl max-w-[31rem] md:min-w-[35.9365rem]">
              <div className="text-sm font-bold mt-2 mb-4">
                구매 확정 대기 상품
              </div>
              {purchases.some(
                item => item.status === 'PURCHASE_COMPLETE_WAITING',
              ) ? (
                purchases
                  .filter(item => item.status === 'PURCHASE_COMPLETE_WAITING')
                  .map(item => (
                    <PurchaseItem
                      key={item.auctionId}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      purchasePrice={item.purchasePrice}
                      status={item.status}
                    />
                  ))
              ) : (
                <div className="text-center py-8 text-sm text-gray-300">
                  아직 구매 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
          <div className="mb-8" />
          <AuctionContainer />
          <div className="p-1 justufy-center max-w-[31rem] md:min-w-[35.9365rem] lg:max-w-xl mx-auto">
            <div className="p-1 bg-white rounded-xl max-w-[31rem] md:min-w-[35.9365rem]">
              <div className="text-sm font-bold mt-2 mb-4">
                참여 중인 경매 목록
              </div>
              {items.some(item => item.status === 'AUCTION_PROGRESS') ? (
                items
                  .filter(item => item.status === 'AUCTION_PROGRESS')
                  .map(item => (
                    <AuctionItem
                      key={item.auctionId}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      currentPrice={item.currentPrice}
                      myBidPrice={item.myBidPrice}
                      status={item.status}
                      time={item.time}
                      // 여기에 endAuctionTime - 현재 시간 로직 추가
                    />
                  ))
              ) : (
                <div className="text-center py-8 text-sm text-gray-300">
                  아직 경매 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
          <div className="mb-8" />
          <SellingContainer />
          <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
            <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
              <div className="text-sm font-bold mt-2 mb-4">
                송장 번호 입력 상품
              </div>
              {sales.some(item => item.status === 'DELIVERY_WAITING') ? (
                sales
                  .filter(item => item.status === 'DELIVERY_WAITING')
                  .map(item => (
                    <SellingItem
                      key={item.auctionId}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      price={item.price}
                      status={item.status}
                      time={item.time}
                    />
                  ))
              ) : (
                <div className="text-center py-8 text-sm text-gray-300">
                  아직 판매 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyShoppingPage() {
  const { recordType } = useParams();
  const { accessToken } = useLoginStore();
  const navigate = useNavigate();
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // 로그인 상태가 아니면 메인 페이지로 리디렉션
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // 로그인 상태가 아니면 빈 화면 반환

    return (
      <div className="whitespace-nowrap max-w-screen-lg mx-auto">
        <div className="flex">
          <Sidebar />
        </div>
      </div>
    );
  }

  let ContentComponent;

  switch (recordType) {
    case 'purchase':
      ContentComponent = PurchaseRecord;
      break;
    case 'selling':
      ContentComponent = SellingRecord;
      break;
    case 'auction':
      ContentComponent = AuctionRecord;
      break;
    default:
      ContentComponent = DefaultContent;
  }

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="w-full flex">
        <Sidebar />
        <ContentComponent className="flex-1" />
      </div>
    </div>
  );
}

export default MyShoppingPage;
