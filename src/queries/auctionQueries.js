import axios from 'axios';

// 경매 생성
export async function createAuction() {
  await axios.post('/api/auction');
}

// 즉시 결제
export async function purchaseInstant(auctionId) {
  await axios.post(`/api/auction/${auctionId}/instant`);
}

// '상품 입찰하기' 페이지 구성에 필요한 데이터 받아오기
export async function fetchBidPage(auctionId) {
  const { data } = await axios.get(`/api/auction/${auctionId}/bid`);
  return data;
}

// 입찰하기
export async function bid(auctionId, price) {
  await axios.post(`/api/auction/${auctionId}/bid`, { price });
}

// 경매 상세 정보 조회
export async function fetchProductInfo(auctionId) {
  const { data } = await axios.get(`/api/auction/${auctionId}`);
  return data;
}

// 경매 삭제
export async function deleteAuction(auctionId) {
  await axios.delete(`/api/auction/${auctionId}`);
}

// 판매자 정보 조회
export async function fetchSellerInfo(auctionId) {
  const { data } = await axios.get(`/api/auction/${auctionId}/seller`);
  return data;
}

// 입찰 내역 조회
export async function fetchBidHistory(auctionId) {
  const { data } = await axios.get(`/api/auction/${auctionId}/bidHistory`);
  return data;
}
