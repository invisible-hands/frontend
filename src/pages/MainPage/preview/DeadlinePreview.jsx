import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArrowRightCircleFill as RightArrowIcon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import detailBackground from '../../../assets/detailBackground.jpg';
import ItemDetail from '../../../components/ItemDetail';

function HotPreview() {
  const navigate = useNavigate();
  const [deadlineItems, setDeadlineItems] = useState([]);
  const API_URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const fetchDeadlineItems = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/auction?page=0&size=3&sort=deadline,asc&progressFilter=true`,
        );
        setDeadlineItems(response.data.data.items);
      } catch (error) {
        console.error('Error fetching deadline items:', error);
      }
    };

    fetchDeadlineItems();
  }, []);

  const handleRightArrowClick = () => {
    navigate('/deadline');
  };

  const goToDeadlineDetail = auctionId => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="w-full px-6 mb-4">
      <div className="text-lg font-extrabold mb-2 text-deepblue2">
        경매 마감 임박!
      </div>
      <div className="grid grid-cols-4 gap-4">
        {deadlineItems.map(item => (
          <ItemDetail
            key={item.auctionId}
            item={item}
            onClick={() => goToDeadlineDetail(item.auctionId)}
          />
        ))}
        {/* 더보기 상품 */}
        <div className="text-center border p-1 rounded-md relative">
          <div className=" blur-sm">
            {/* 타이머 */}
            <div className="absolute top-1 right-1 danger/20 text-danger text-xs px-2 py-1 rounded md:text-lg md:top-2 md:right-2">
              00:01:07
            </div>
            <img
              src={detailBackground}
              alt="더보기 상품 샘플"
              className="w-full h-20 object-cover mb-4 rounded-md md:h-30 lg:h-40"
            />
            <div className="text-xs font-bold mb-2 truncate">
              미네랄사이다 지라치 봉제인형
            </div>
            <div className="text-xs mb-1 truncate">
              <span className="hidden md:inline">현재 입찰 </span>
              <span className="text-xs font-bold">10000</span> 원
            </div>
            <div className="text-xs font-bold text-deepblue1 truncate">
              <span className="hidden md:inline">즉시구매 </span>
              <span className="text-xs font-bold">77000</span> 원
            </div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <RightArrowIcon
              size={48}
              className="cursor-pointer text-blue1 duration-300 bg-whitish rounded-full hover:text-deepblue1"
              onClick={handleRightArrowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotPreview;
