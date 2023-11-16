import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemDetail from '../../components/ItemDetail';

function DeadlineDetailPage() {
  const navigate = useNavigate();
  const [deadlineItems, setDeadlineItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchDeadlineItems = async () => {
      try {
        const response = await axios.get(
          `https://ka1425de5708ea.user-app.krampoline.com/api/auction?page=${page}&size=20&sort=deadline,asc&progressFilter=true`,
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
      }
    };

    fetchDeadlineItems();
  }, [page]);

  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const goToProductDetail = auctionId => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        마감 임박 상품
      </div>
      <InfiniteScroll
        dataLength={deadlineItems.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<h4>불러오는 중...</h4>}
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
