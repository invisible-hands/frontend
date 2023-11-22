import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArrowRightCircleFill as RightArrowIcon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import detailBackground from '../../assets/detailBackground.jpg';
import ItemDetail from '../ItemDetail';

function HotPreview() {
  const navigate = useNavigate();
  const [hotItems, setHotItems] = useState([]);
  const API_URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const fetchHotItems = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/auction?page=0&size=3&sort=view,desc&progressFilter=true`,
        );
        setHotItems(response.data.data.items);
      } catch (error) {
        console.error('Error fetching hot items:', error);
      }
    };

    fetchHotItems();
  }, []);

  const handleRightArrowClick = () => {
    navigate('/hot');
  };

  const goToProductDetail = auctionId => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="w-full px-6 mb-4">
      <div className="text-lg font-extrabold mb-2 text-deepblue2">인기상품</div>
      <div className="grid grid-cols-4 gap-4">
        {hotItems.map(item => (
          <ItemDetail
            key={item.auctionId}
            item={item}
            onClick={() => goToProductDetail(item.auctionId)}
          />
        ))}
        {/* 더보기 상품 */}
        <div className="text-center border p-1 rounded-md relative md:p-2 lg:p-3">
          <div className=" blur-sm">
            {/* relative for positioning the timer */}
            <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-xs px-2 py-1 rounded md:text-lg md:top-2 md:right-2">
              99:01:07
            </div>
            {/* 타이머 */}
            <img
              src={detailBackground}
              alt="더보기 상품 샘플"
              className="w-full h-20 object-cover mb-4 rounded-md md:h-30 lg:h-40"
            />
            <div className="text-xs font-bold mb-2 truncate md:text-lg lg:text-xl">
              미네랄사이다 지라치 봉제인형
            </div>
            <div className="text-xs mb-1 truncate md:text-lg">
              <span className="hidden md:inline">현재 입찰 </span>
              <span className="font-bold">10000</span> 원
            </div>
            <div className="text-xs font-bold text-deepblue1 truncate md:text-lg">
              <span className="hidden md:inline">즉시구매 </span>
              <span className="font-bold">77000</span> 원
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
