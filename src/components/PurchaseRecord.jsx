import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PurchaseItem } from './PurchaseItem';
import { PurchaseContainer } from './ShoppingContainer';
import { PurchaseDropdown } from './DropDown';

const axiosInstance = axios.create({
  baseURL: 'https://ka1425de5708ea.user-app.krampoline.com',
});

function PurchaseRecord() {
  const dealStatusOptions = {
    '': '전체',
    DELIVERY_WAITING: '배송 대기중',
    PURCHASE_COMPLETE_WAITING: '구매 확정 대기',
    PURCHASE_COMPLETE: '구매 확정',
    PURCHASE_CANCEL: '취소',
    SALE_FAIL: '판매 실패',
  };

  const [statusFilter, setStatusFilter] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  // 현재 페이지에 표시할 아이템의 시작 인덱스
  const startIndex = currentPage * itemsPerPage;
  // 현재 페이지에 표시할 아이템의 끝 인덱스
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const accessToken = import.meta.env.VITE_TOKEN;
        // const page = currentPage; // 현재 페이지 번호
        // const size = 1; // 한 페이지에 표시할 항목 수
        // const status = 'all';
        // const startDate = '2022-11-09'; // 시작 날짜
        // const endDate = '2023-11-13'; // 끝 날짜

        const response = await axiosInstance.get(
          `/api/deal/purchases?status=all&startDate=2022-11-09&endDate=2023-11-13&page=${currentPage}&size=8`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        if (response.status === 200) {
          setItems(response.data.data.auctions);
          console.log('요청 성공', response.data.data.auctions);
          setTotalPages(response.data.data.totalPage);
          setItemsPerPage(response.data.data.cnt); // 전체 페이지 수 업데이트
          // 다른 페이징 관련 상태도 필요하다면 여기에서 업데이트
        } else {
          console.error('API 요청 실패:', response.status);
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    fetchItems();
  }, [currentPage]);

  // 드롭다운에서 선택한 상태에 따라 아이템을 필터링하는 함수
  const filteredItems = items.filter(item => {
    // '전체' 옵션이 선택되었거나 statusFilter 값이 없으면 모든 아이템을 반환
    if (statusFilter === '') return true;

    // 아이템의 상태와 드롭다운에서 선택한 상태가 매칭되는지 확인
    return item.status === statusFilter;
  });

  // 페이지 번호 버튼을 렌더링하는 함수
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i += 1) {
      pages.push(
        <button type="button" key={i} onClick={() => setCurrentPage(i)}>
          {i + 1}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="w-[50%] mx-auto">
        <PurchaseContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
            <PurchaseDropdown
              setStatusFilter={setStatusFilter}
              dealStatusOptions={dealStatusOptions}
            />
            {filteredItems.slice(startIndex, endIndex).map(item => (
              <PurchaseItem
                dealId={item.dealId}
                auctionId={item.auctionId}
                imageUrl={item.imageUrl}
                title={item.title}
                purchasePrice={item.purchasePrice}
                status={item.status}
              />
            ))}
          </div>
        </div>
        <div>{renderPageNumbers()}</div>
      </div>
    </div>
  );
}

export default PurchaseRecord;

// useEffect(() => {
//   // 데이터를 불러오는 함수
//   const fetchItems = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

//       if (!accessToken) {
//         // 토큰이 없으면 로그인이 필요하다는 메시지를 보여줄 수 있습니다.
//         alert('로그인이 필요합니다.');
//         return;
//       }

//       // API 요청 보내기
//       const response = await axios.get('/api/deal/purchases', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setItems(response.data); // 받아온 데이터로 items 상태 업데이트
//     } catch (error) {
//       console.error('Fetching items failed', error);
//     }
//   };

//   fetchItems(); // 함수 호출
// }, []); // 컴포넌트가 마운트될 때 한 번만 호출

//   // 데이터를 불러오는 함수
//   const fetchItems = async () => {
//     try {
//       // API 요청 보내기
//       const response = await axios.get('/api/deal/purchases');

//       if (response.status === 200) {
//         // 연결 상태가 200이면 목 데이터를 불러오는 함수 호출
//         fetchMockItems();
//       } else {
//         console.error('API 요청 실패:', response.status);
//       }
//     } catch (error) {
//       console.error('API 요청 실패:', error);
//     }
//   };

//   fetchItems(); // 함수 호출
// }, []);

// useEffect(() => {
//   const mockData = [
//     {
//       auctionId: '아이템 1',
//       imageUrl: '/harokIphone.png',
//       title: '아이템 1',
//       price: 10000,
//       status: 'DELIVERY_WAITING',
//     },
//     {
//       auctionId: '아이템 2',
//       imageUrl: '/harokIphone.png',
//       title: '아이템 2',
//       price: 20000,
//       status: 'PURCHASE_COMPLETE_WAITING',
//     },
//     {
//       auctionId: '아이템 3',
//       imageUrl: '/harokIphone.png',
//       title: '아이템 3',
//       price: 10000,
//       status: 'DELIVERY_WAITING',
//     },
//     {
//       auctionId: '아이템 4',
//       imageUrl: '/harokIphone.png',
//       title: '아이템 4',
//       price: 10000,
//       status: 'DELIVERY_WAITING',
//     },
//     {
//       auctionId: '아이템 5',
//       imageUrl: '/harokIphone.png',
//       title: '아이템 5',
//       price: 10000,
//       status: 'DELIVERY_WAITING',
//     },
//     // ... 추가 데이터
//   ];

//   setItems(mockData); // 여기서 setItems는 상태를 설정하는 함수라고 가정
// }, []);