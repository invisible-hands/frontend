import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemDetail from '../components/ItemDetail.jsx';

function SellerDetailPage() {
  const API_URL = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();
  const { auctionId } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [nickname, setNickname] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/auction/${auctionId}/seller?page=${page}?size=20`,
        );

        if (response.data.status === 'Success') {
          setSearchResults(prevResults => [
            ...prevResults,
            ...response.data.data.auctionList,
          ]);
          setNickname(response.data.data.nickname);
          setHasMore(page < response.data.data.totalPage - 1);
        }
      } catch (error) {
        console.error('Error while fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [page]);

  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const goToProductDetail = id => {
    navigate(`/auction/${id}`);
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto p-4">
      <div className="text-lg mb-4 text-deepblue2">
        {' '}
        {nickname} 님이 판매한 상품은요...
      </div>
      <InfiniteScroll
        dataLength={searchResults.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<h4>불러오는 중...</h4>}
        endMessage={<p>마지막 페이지입니다.</p>}
      >
        <div className="grid grid-cols-4 gap-4">
          {searchResults.map(item => (
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

export default SellerDetailPage;
