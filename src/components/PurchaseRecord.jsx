import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PurchaseItem } from './PurchaseItem';
import { PurchaseContainer } from './ShoppingContainer';
import { PurchaseDropdown } from './DropDown';

function PurchaseRecord() {
  const dealStatusOptions = {
    '': '전체',
    DELIVERY_WAITING: '배송 대기중',
    PURCHASE_COMPLETE_WAITING: '구매 확정 대기',
    PURCHASE_COMPLETED: '구매 확정',
    PURCHASE_CANCEL: '취소',
  };

  const [statusFilter, setStatusFilter] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // 현재 페이지에 표시할 아이템의 시작 인덱스
  const startIndex = currentPage * itemsPerPage;
  // 현재 페이지에 표시할 아이템의 끝 인덱스
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // 페이지 번호를 파라미터로 보내서 해당 페이지 데이터 요청
        const response = await axios.get(`/api/deal/sales?page=${currentPage}`);
        setItems(response.data.items); // 받아온 아이템들로 상태 업데이트
        setTotalPages(response.data.totalPage); // 전체 페이지 수 업데이트
        setItemsPerPage(response.data.cnt); // 페이지 당 아이템 수 업데이트
      } catch (error) {
        error();
      }
    };

    fetchItems();
  }, [currentPage]); // currentPage가 바뀔 때마다 요청

  useEffect(() => {
    // 가짜 데이터를 불러오는 함수
    const fetchMockItems = async () => {
      // 목 데이터
      const mockData = [
        {
          id: '아이템 1',
          imageUrl: '/harokIphone.png',
          title: '아이템 1',
          price: 10000,
          status: 'DELIVERY_WAITING',
        },
        {
          id: '아이템 2',
          imageUrl: '/harokIphone.png',
          title: '아이템 2',
          price: 20000,
          status: 'PURCHASE_COMPLETE_WAITING',
        },
        {
          id: '아이템 3',
          imageUrl: '/harokIphone.png',
          title: '아이템 3',
          price: 10000,
          status: 'DELIVERY_WAITING',
        },
        {
          id: '아이템 4',
          imageUrl: '/harokIphone.png',
          title: '아이템 4',
          price: 10000,
          status: 'DELIVERY_WAITING',
        },
        {
          id: '아이템 5',
          imageUrl: '/harokIphone.png',
          title: '아이템 5',
          price: 10000,
          status: 'DELIVERY_WAITING',
        },
        // ... 추가 데이터
      ];

      // setState를 사용하여 items 상태 업데이트
      setItems(mockData);
    };

    fetchMockItems();
  }, []);

  // useEffect(() => {
  //   // 데이터를 불러오는 함수
  //   const fetchItems = async () => {
  //     try {
  //       const response = await axios.get('/api/deal/sales'); // 가정한 API endpoint
  //       setItems(response.data); // 받아온 데이터로 items 상태 업데이트
  //     } catch (error) {
  //       console.error('Fetching items failed', error);
  //     }
  //   };

  //   fetchItems(); // 함수 호출
  // }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  // 드롭다운에서 선택한 상태에 따라 아이템을 필터링하는 함수
  const filteredItems = items.filter(item => {
    // '전체' 옵션이 선택되었거나 statusFilter 값이 없으면 모든 아이템을 반환
    console.log('필터 되냐?');
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
                key={item.title}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
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
