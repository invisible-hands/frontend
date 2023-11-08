import axios from 'axios';

const API_SERVER = import.meta.env.VITE_API_URL;

// 경매 생성
export async function createAuction() {
  await axios.post(`${API_SERVER}/auction`);
}

// 즉시 결제
export async function purchaseInstant(auctionId) {
  await axios.post(`${API_SERVER}/auction/${auctionId}/instant`);
}

// '상품 입찰하기' 페이지 구성에 필요한 데이터 받아오기
export async function fetchBidPage(auctionId) {
  const { data } = await axios.get(`${API_SERVER}/auction/${auctionId}/bid`);
  return data;
}

// 입찰하기
export async function bid(auctionId, price) {
  await axios.post(`${API_SERVER}/auction/${auctionId}/bid`, { price });
}

// 쿠키에서 특정 값을 추출하는 함수
function getCookieValue(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

// 경매 상세 정보 조회
export async function fetchProductInfo(auctionId) {
  const userUUID = getCookieValue('UserUUID'); // 'UserUUID' 쿠키 값을 읽음

  try {
    const response = await axios.get(`${API_SERVER}/auction/${auctionId}`, {
      headers: userUUID ? { UserUUID: userUUID } : {}, // 'UserUUID' 존재시 헤더에 추가
      withCredentials: true, // 쿠키를 포함시키기 위해 필요
    });

    return response.data;
  } catch (error) {
    console.log('Error fetching auction info:', error);
  }
  return null;
}

// 경매 삭제
export async function deleteAuction(auctionId) {
  await axios.delete(`${API_SERVER}/auction/${auctionId}`);
}

// 판매자 정보 조회
export async function fetchSellerInfo(auctionId) {
  const { data } = await axios.get(`${API_SERVER}/auction/${auctionId}/seller`);
  return data;
}

// 입찰 내역 조회
export async function fetchBidHistory(auctionId) {
  const { data } = await axios.get(
    `${API_SERVER}/api/auction/${auctionId}/bidHistory`,
  );
  return data;
}
