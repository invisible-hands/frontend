import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_APP_URL;

// 경매 생성
export async function createAuction(files, otherData, token) {
  const dataSet = { ...otherData, tags: otherData.tags.trim().split(' ') };

  const formData = new FormData();
  for (let i = 0; i < files.length; i += 1) {
    formData.append('images', files[i]);
  }

  formData.append(
    'request',
    new Blob([JSON.stringify(dataSet)], { type: 'application/json' }),
  );

  axios.post(`${API_URL}/api/auction`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function fetchBidPage(auctionId, token) {
  const { data } = await axios.get(`${API_URL}/api/auction/${auctionId}/bid`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
}

// 입찰하기
// export async function bid(auctionId, price) {
//   return axios.post(`${API_URL}/auction/${auctionId}/bid`, { price });
// }

// 특저 쿠키 값을 읽는 함수
export function getCookieValue(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

// 경매 상세 정보 조회
export async function fetchAuctionInfo(auctionId) {
  const res = await axios.get(`${API_URL}/api/auction/${auctionId}`, {
    withCredentials: true,
  });
  return res.data;
}

// 경매 삭제
export async function deleteAuction(auctionId, token) {
  await axios
    .delete(
      `${API_URL}/api/auction/${auctionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

// 판매자 정보 조회
export async function fetchSellerInfo(auctionId) {
  const { data } = await axios.get(
    `${API_URL}/api/auction/${auctionId}/seller`,
  );
  return data;
}

// 입찰 내역 조회
export async function fetchBidHistory(auctionId) {
  const { data } = await axios.get(
    `${API_URL}/api/auction/${auctionId}/bidHistory?page=0&size=10`,
  );
  return data;
}

export async function fetchBidsTime(auctionId) {
  const response = await axios.get(
    `${API_URL}/api/auction/${auctionId}/bidHistory?page=0&size=10`,
  );
  return response.data.data.bids.map(bid => bid.bidTime);
}

export async function fetchBidsPrice(auctionId) {
  const response = await axios.get(
    `${API_URL}/api/auction/${auctionId}/bidHistory?page=0&size=10`,
  );
  return response.data.data.bids.map(bid => bid.bidPrice);
}
