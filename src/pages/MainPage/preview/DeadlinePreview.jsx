import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ItemDetail from '../../../components/ItemDetail';
import ItemSample from '../../../components/ItemSample';

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
  const goToDeadlineDetail = auctionId => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="w-full px-6 mb-4 select-none">
      <div className="text-2xl font-extrabold mb-2 text-deepblue2">
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
        <ItemSample navigatePath="/deadline" />
      </div>
    </div>
  );
}

export default HotPreview;
