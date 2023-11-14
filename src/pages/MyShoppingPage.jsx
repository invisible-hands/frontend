import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
  const [bids, setBids] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const handleResponse = (response, setState) => {
      if (response.status === 200) {
        setState(response.data.data.auctions);
        console.log('요청 성공', response.data.data.auctions);
      } else {
        console.error('API 요청 실패:', response.status);
      }
    };
    const fetchItems = async () => {
      const accessToken = import.meta.env.VITE_TOKEN;
      const headers = { Authorization: `Bearer ${accessToken}` };

      try {
        const responsePurchases = await axiosInstance.get(
          `/api/deal/purchases?status=all&startDate=2022-11-09&endDate=2023-11-13&page=0&size=1`,
          { headers },
        );
        handleResponse(responsePurchases, setPurchases);

        const responseBids = await axiosInstance.get(
          `/api/deal/bids?status=all&startDate=2022-11-09&endDate=2023-11-13&page=0&size=8`,
          { headers },
        );
        handleResponse(responseBids, setBids);

        const responseSales = await axiosInstance.get(
          `/api/deal/sales?status=all&startDate=2022-11-09&endDate=2023-11-13&page=0&size=8`,
          { headers },
        );
        handleResponse(responseSales, setSales);
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    fetchItems();
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
            {purchases
              .filter(item => item.status === 'PURCHASE_COMPLETE_WAITING')
              .map(item => (
                <PurchaseItem
                  key={item.auctionId}
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
            {bids
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
                  // endAuctionTime - 현재시간 현준님 코드 뽀려오기
                />
              ))}
          </div>
        </div>
        <div className="mb-8" />
        <SellingContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
            <div className="text-sm font-bold mt-2 mb-4">
              송장 번호 입력 상품
            </div>
            {sales
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
              ))}
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

// useEffect(() => {
//   // 가짜 데이터를 불러오는 함수
//   const fetchMockItems = async () => {
//     // 목 데이터
//     const mockData = [
//       {
//         auctionId: '1',
//         imageUrl: '/harokIphone.png',
//         title: '아이폰',
//         price: 10000,
//         status: 'DELIVERY_WAITING',
//         currentPrice: 50000,
//         myBidPrice: 50100,
//         time: '8:55:38',
//       },
//       {
//         auctionId: '2',
//         imageUrl: '/harokIphone.png',
//         title: '아이폰',
//         price: 20000,
//         status: 'PURCHASE_COMPLETE_WAITING',
//         currentPrice: 50000,
//         myBidPrice: 50100,
//         time: '8:55:38',
//       },
//       {
//         auctionId: '4',
//         imageUrl: '/harokIphone.png',
//         title: '아이폰 3',
//         price: 20000,
//         status: 'AUCTION_PROGRESS',
//         currentPrice: 50000,
//         myBidPrice: 50100,
//         time: '8:55:38',
//       },
//       // ... 추가 데이터
//     ];

//     // setState를 사용하여 items 상태 업데이트
//     setItems(mockData);
//   };

//   fetchMockItems();
// }, []);

// useEffect(() => {
//   // 각각의 API를 호출하여 데이터를 가져오는 함수
//   const fetchData = async () => {
//     try {
//       // purchases API 호출
//       const purchasesResponse = await axios.get('/api/deal/purchases');
//       setPurchases(purchasesResponse.data);

//       // bids API 호출
//       const bidsResponse = await axios.get('/api/deal/bids');
//       setBids(bidsResponse.data);

//       // sales API 호출
//       const salesResponse = await axios.get('/api/deal/sales');
//       setSales(salesResponse.data);
//     } catch (error) {
//       console.error('Fetching data failed', error);
//     }
//   };

//   fetchData();
// }, []);
