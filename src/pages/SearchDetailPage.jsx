import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ItemDetail from '../components/ItemDetail';

function SearchDetailPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ka1425de5708ea.user-app.krampoline.com/api/auction/search?keyword=${keyword}&page=0&size=20`,
        );

        if (response.data.status === 'Success') {
          setSearchResults(response.data.data.items);
        }
      } catch (error) {
        console.error('Error while fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]);

  const renderSearchResults = () => {
    if (isLoading) {
      return <p>검색 중...</p>;
    }
    if (searchResults.length > 0) {
      return (
        <div className="grid grid-cols-4 gap-4">
          {searchResults.map(item => (
            <ItemDetail key={item.auctionId} item={item} />
          ))}
        </div>
      );
    }
    return <p>검색 결과가 없습니다.</p>;
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        검색 키워드: {keyword}
      </div>
      {renderSearchResults()} {/* 검색 결과 렌더링 */}
    </div>
  );
}

export default SearchDetailPage;
