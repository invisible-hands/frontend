import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_URL;

export function updateBidPrice(auctionId, newPrice, token) {
  return axios.post(
    `${API_URL}/api/auction/${auctionId}/bid`,
    {
      price: newPrice,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export function updateBidPriceOther(auctionId, price, token) {
  return axios.post(
    `${API_URL}/api/auction/${auctionId}/bid`,
    {
      price,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
