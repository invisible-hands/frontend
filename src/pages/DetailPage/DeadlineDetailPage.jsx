import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemDetail from '../../components/ItemDetail';

function DeadlineDetailPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_URL;
  const [deadlineItems, setDeadlineItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchDeadlineItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/api/auction?page=${page}&size=20&sort=deadline,${sortOrder}&progressFilter=true`,
        );
        if (response.data.status === 'Success') {
          setDeadlineItems(prevItems => [
            ...prevItems,
            ...response.data.data.items,
          ]);
          setHasMore(page < response.data.data.totalPage - 1);
        }
      } catch (error) {
        console.error('Error while fetching deadline items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeadlineItems();
  }, [page, sortOrder]);

  const handleSortOrderChange = event => {
    setSortOrder(event.target.value);
    setPage(0);
    setDeadlineItems([]);
  };

  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const goToProductDetail = auctionId => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto p-4">
      <div className="text-3xl font-extrabold m-4 text-deepblue2">
        마감 임박 상품
      </div>
      <div className="m-4">
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="border mr-4 px-2 outline-none rounded"
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={deadlineItems.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={isLoading && <p className="text-center my-4">불러오는 중...</p>}
        endMessage={<p>마지막 페이지입니다.</p>}
      >
        <div className="grid grid-cols-4 gap-4">
          {deadlineItems.map(item => (
            <ItemDetail
              key={item.auctionId}
              item={item}
              onClick={() => goToProductDetail(item.auctionId)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default DeadlineDetailPage;
