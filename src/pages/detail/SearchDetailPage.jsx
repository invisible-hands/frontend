import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemDetail from '../../components/ItemDetail.jsx';

function SearchDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://ka1425de5708ea.user-app.krampoline.com/api/auction/search?keyword=${keyword}&page=${page}&size=20`,
        );

        if (response.data.status === 'Success') {
          setSearchResults(prevResults => [
            ...prevResults,
            ...response.data.data.items,
          ]);
          setHasMore(page < response.data.data.totalPage - 1);
        }
      } catch (error) {
        console.error('Error while fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [keyword, page]);

  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const goToProductDetail = productId => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        검색 키워드: {keyword}
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

export default SearchDetailPage;