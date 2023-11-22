import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLoginStore from '../stores/loginStore';
import CustomDatePicker from './CustomDatePicker';
import { AuctionItem } from './PurchaseItem';
import { AuctionContainer } from './ShoppingContainer';
import { AuctionDropdown } from './DropDown';
import { calculateRemainTime } from '../utils/timeUtils';

const axiosInstance = axios.create({
  baseURL: 'https://ka1425de5708ea.user-app.krampoline.com',
});

function AuctionRecord() {
  const auctionStatusOptions = {
    '': '전체',
    AUCTION_PROGRESS: '경매 진행중',
    AUCTION_SUCCESS: '낙찰 성공',
    AUCTION_FAIL: '낙찰 실패',
  };

  const [statusFilter, setStatusFilter] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { accessToken } = useLoginStore();

  // 현재 페이지에 표시할 아이템의 시작 인덱스
  const startIndex = currentPage * itemsPerPage;
  // 현재 페이지에 표시할 아이템의 끝 인덱스
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const accessToken = import.meta.env.VITE_TOKEN;
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const response = await axiosInstance.get(
          `/api/deal/bids?status=all&startDate=${formattedStartDate}&endDate=${formattedEndDate}&page=${currentPage}&size=8`,
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
  }, [startDate, endDate, currentPage]);

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
        <button
          type="button"
          key={i}
          className="mx-1  text-white rounded"
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="w-full max-w-[31rem] md:w-[40%] lg:mx-auto">
          <AuctionContainer />
          <div className="justufy-center max-w-[31rem] md:min-w-[35.9365rem] lg:max-w-xl mx-auto">
            <div className="p-1 bg-white rounded-xl max-w-[31rem] md:min-w-[35.9365rem]">
              <div className="flex flex-wrap md:flex-nowrap ">
                <AuctionDropdown
                  setStatusFilter={setStatusFilter}
                  dealStatusOptions={auctionStatusOptions}
                />
                <div className="flex space-x-2 pl-2">
                  <CustomDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                  />
                  <CustomDatePicker
                    startDate={endDate}
                    setStartDate={setEndDate}
                  />
                </div>
              </div>
              {items.length > 0 ? (
                filteredItems.slice(startIndex, endIndex).map(item => (
                  <AuctionItem
                    auctionId={item.auctionId}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    currentPrice={item.currentPrice}
                    myBidPrice={item.myBidPrice}
                    status={item.status}
                    time={calculateRemainTime(item.endAuctionTime)}
                    // endAuctionTime - 현재시간 현준님 코드 뽀려오기
                  />
                ))
              ) : (
                <div className="text-center py-8 text-sm text-gray-300">
                  아직 경매 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
          {items.length > 0 && (
            <div className="flex justify-center mt-12 mb-4 pt-8">
              {renderPageNumbers()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuctionRecord;
