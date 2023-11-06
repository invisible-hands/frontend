import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

function DefaultContent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 가짜 데이터를 불러오는 함수
    const fetchMockItems = async () => {
      // 목 데이터
      const mockData = [
        {
          id: '아이폰',
          imageUrl: '/harokIphone.png',
          title: '아이폰',
          price: 10000,
          status: 'DELIVERY_WAITING',
        },
        {
          id: '아이폰',
          imageUrl: '/harokIphone.png',
          title: '아이폰',
          price: 20000,
          status: 'PURCHASE_COMPLETE_WAITING',
        },
        // ... 추가 데이터
      ];

      // setState를 사용하여 items 상태 업데이트
      setItems(mockData);
    };

    fetchMockItems();
  }, []);
  return (
    <div className="w-[50%] mx-auto">
      <div className="p-8 bg-white ">
        <h1 className="text-2xl font-extrabold ">쇼핑 정보</h1>
        <PurchaseContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl ">
            <div className="text-sm font-bold mt-2 mb-4">
              구매 확정 대기 상품
            </div>
            {items
              .filter(item => item.status === 'PURCHASE_COMPLETE_WAITING')
              .map(item => (
                <PurchaseItem
                  key={item.title}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  price={item.price}
                  status={item.status}
                />
              ))}
          </div>
        </div>
        <div className="mb-8" />
        <AuctionContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl ">
            <div className="text-sm font-bold mt-2 mb-4">
              참여 중인 경매 목록
            </div>
            <AuctionItem
              imageUrl="/harokIphone.png"
              productName="최하록이 만든 마법의 아이폰"
              currentPrice="500"
              myPrice="200"
              status="경매 진행"
              time="8:55:03"
            />
          </div>
        </div>
        <div className="mb-8" />
        <SellingContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
            <div className="text-sm font-bold mt-2 mb-4">
              송장 번호 입력 상품
            </div>
            <SellingItem
              imageUrl="/harokIphone.png"
              productName="최하록이 만든 마법의 아이폰"
              totalPrice="200"
              status="진행중"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MyShoppingPage() {
  const { recordType } = useParams();

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
    <div className="flex">
      <Sidebar />
      <ContentComponent className="flex-1" />
    </div>
  );
}

export default MyShoppingPage;
