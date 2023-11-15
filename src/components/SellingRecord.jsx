import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SellingItem } from './PurchaseItem';
import { SellingContainer } from './ShoppingContainer';
import { SellingDropdown } from './DropDown';

const axiosInstance = axios.create({
  baseURL: 'https://ka1425de5708ea.user-app.krampoline.com',
});

function SellingRecord() {
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
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지
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
          `/api/deal/sales?status=all&startDate=2022-11-09&endDate=2023-11-13&page=${currentPage}&size=8`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        if (response.status === 200) {
          setItems(response.data.data.sales);
          console.log('요청 성공', response.data.data.sales);
          setTotalPages(response.data.data.totalPage);
          setItemsPerPage(response.data.data.cnt);
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
        <SellingContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
            <SellingDropdown
              setStatusFilter={setStatusFilter}
              dealStatusOptions={dealStatusOptions}
            />
            {filteredItems.slice(startIndex, endIndex).map(item => (
              <SellingItem
                auctionId={item.auctionId}
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

export default SellingRecord;

// useEffect(() => {
//   // 데이터를 불러오는 함수
//   const fetchItems = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

//       if (!accessToken) {
//         // 토큰이 없으면 로그인이 필요하다는 메시지를 보여줄 수 있습니다.
//         alert('로그인이 필요합니다.');
//         window.location.href('/');
//         return;
//       }

//       // API 요청 보내기
//       const response = await axios.get('/api/deal/sales', {
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

// useEffect(() => {
//   // 데이터를 불러오는 함수
//   const fetchItems = async () => {
//     try {
//       // const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기 (주석 처리)

//       // API 요청 보내기
//       const response = await axios.get('/api/deal/sales');

//       setItems(response.data); // 받아온 데이터로 items 상태 업데이트
//     } catch (error) {
//       console.error('Fetching items failed', error);
//     }
//   };

//   fetchItems(); // 함수 호출
// }, []); // 컴포넌트가 마운트될 때 한 번만 호출

// useEffect(() => {
//   const mockData = {
//     cnt: 5, // 총 아이템 수
//     currentPage: 0, // 현재 페이지 인덱스 (0부터 시작)
//     totalPage: 1, // 전체 페이지 수
//   };

//   const fetchPagedItems = async () => {
//     try {
//       // 페이지 번호를 파라미터로 보내서 해당 페이지 데이터 요청
//       const response = await axiosInstance.get(
//         `/api/deal/sales?page=0&size=1`,
//       );

//       if (response.status === 200) {
//         // 상태 코드 200일 때 목 데이터 사용
//         console.log('요청 성공');
//         setItems(mockData.items); // 받아온 아이템들로 상태 업데이트
//         setTotalPages(mockData.totalPage); // 전체 페이지 수 업데이트
//         setItemsPerPage(mockData.cnt); // 페이지 당 아이템 수 업데이트
//       } else {
//         console.error('API 요청 실패:', response.status);
//       }
//     } catch (error) {
//       console.error('Fetching items failed', error);
//     }
//   };

//   fetchPagedItems();
// }, [currentPage]); // currentPage가 바뀔 때마다 요청

// useEffect(() => {
//   // 데이터를 불러오는 함수
//   const fetchItems = async () => {
//     try {
//       // 인증 토큰 값
//       const accessToken =
//         'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc4LCJlbWFpbCI6Ik1lbGFueUBuYXZlci5jb20iLCJ1c2VybmFtZSI6Ik1lbGFueSIsIm5pY2tuYW1lIjoiTWVsYW55KDEyMykiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5OTg2MTYyNSwiZXhwIjoxNjk5OTQ4MDI1fQ._efjcoxvx5ozbwpivHacgoKOMoDT_APC3PyTQkhG0ww';
//       const response = await axiosInstance.get(
//         'api/deal/sales?status=all&startDate=2022-11-09&endDate=2023-11-13&page=0&size=1',
//         {
//           // 일단 여기를 고쳐야함 이렇게여??? ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
//           headers: {
//             // Authorization 헤더에 Bearer 토큰 추가
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );

//       if (response.status === 200) {
//         // 연결 상태가 200이면 목 데이터를 불러오는 함수 호출
//         console.log('요청 성공'); // 여기 콘솔
//         console.log('response', response);
//         setItems(response.data.data.auctions); // 그니까 리스폰스 바디가 ㄷ틀렷다..... 근데 머가 틀렷죠???
//       } else {
//         console.error('API 요청 실패:', response.status);
//       }
//     } catch (error) {
//       console.error('API 요청 실패:', error);
//     }
//   };

//   fetchItems(); // 함수 호출
// }, []);
