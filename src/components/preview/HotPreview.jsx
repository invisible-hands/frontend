import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArrowRightCircleFill as RightArrowIcon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import detailBackground from '../../assets/detailBackground.jpg';
import ItemDetail from '../ItemDetail';

function HotPreview() {
  const navigate = useNavigate();
  const [hotItems, setHotItems] = useState([]);

  useEffect(() => {
    const fetchHotItems = async () => {
      try {
        const response = await axios.get(
          'https://ka1425de5708ea.user-app.krampoline.com/api/auction?page=0&size=3&sort=view,desc',
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

  const goToProductDetail = productId => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-full p-6">
      <div className="text-4xl font-extrabold mb-4 text-deepblue2">
        인기상품
      </div>
      <div className="grid grid-cols-4 gap-4">
        {hotItems.map(item => (
          <ItemDetail
            key={item.auctionId}
            item={item}
            onClick={() => goToProductDetail(item.auctionId)}
          />
        ))}
        {/* 더보기 상품 */}
        <div className="border p-4 rounded-md relative">
          <div className=" blur-sm">
            {/* relative for positioning the timer */}
            <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
              99:01:07
            </div>
            {/* 타이머 */}
            <img
              src={detailBackground}
              alt="더보기 상품 샘플"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <div className="text-xl font-bold mb-2 truncate">
              미네랄사이다 지라치 봉제인형
            </div>
            <div className="text-md mb-1">
              현재 입찰 <span className="text-lg font-bold">10000</span> 원
            </div>
            <div className="text-md font-bold text-deepblue1">
              즉시구매 <span className="text-lg font-bold">77000</span> 원
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
