import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PurchaseRecord from '../components/PurchaseRecord';
import SellingRecord from '../components/SellingRecord';
import AuctionRecord from '../components/AuctionRecord';
import {
  ShoppingContainer,
  AuctionContainer,
  SellingContainer,
} from '../components/ShoppingContainer';
import {
  PurchaseItem,
  AuctionItem,
  SellingItem,
} from '../components/PurchaseItem';

function DefaultContent() {
  return (
    <div className="w-[50%] mx-auto">
      <div className="p-8 bg-white ">
        <h1 className="text-2xl font-extrabold ">쇼핑 정보</h1>
        <ShoppingContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <PurchaseItem
            imageUrl="/harokIphone.png"
            productName="최하록이 만든 마법의 아이폰이 아니라면"
            price="100"
            totalPrice="200"
            status="구매확정대기"
          />
        </div>
        <div className="mb-8" />
        <AuctionContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <AuctionItem
            imageUrl="/harokIphone.png"
            productName="최하록이 만든 마법의 아이폰"
            currentPrice="500"
            myPrice="200"
            status="경매 진행"
            time="8:55:03"
          />
        </div>
        <div className="mb-8" />
        <SellingContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <SellingItem
            imageUrl="/harokIphone.png"
            productName="최하록이 만든 마법의 아이폰"
            totalPrice="200"
            status="진행중"
          />
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
