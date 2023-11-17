import axios from 'axios';

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

  axios.post(`${API_URL}/auction`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

/*
"title": "내가 만든 쿠키",
  "content": "뉴진스가 아니라 제가 구운 쿠키 전혀 건강을 생각하지 않아 버터를 때려박았어요",
  "itemCondition": "NEW",
  "startPrice": 10000,
  "instantPrice": 25000,
  "duration": "DAY",
  "tags": [
    "아이폰", "애플", "갤럭시"
  ]
*/

export async function purchaseInstant(id, userToken) {
  const url = `${API_URL}/auction/${id}/instant`;
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  await axios
    .post(url, {}, config)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      if (err.response.data.status === 'NOT_ENOUGH_MONEY') {
        alert('충전이 필요합니다');
      }
      console.log(err);
    });
}

// 즉시 결제
// export async function purchaseInstant(auctionId) {
//   return axios.post(`${API_URL}/auction/${auctionId}/instant`);
// }

// '상품 입찰하기' 페이지 구성에 필요한 데이터 받아오기 - 토큰 없는 버전

export async function fetchBidPage(auctionId, token) {
  const { data } = await axios.get(`${API_URL}/auction/${auctionId}/bid`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

// 입찰하기
export async function bid(auctionId, price) {
  return axios.post(`${API_URL}/auction/${auctionId}/bid`, { price });
}

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
  const { data } = await axios.get(`${API_URL}/auction/${auctionId}`);
  return data;
}

// 경매 삭제
export async function deleteAuction(auctionId, token) {
  await axios
    .delete(
      `${API_URL}/auction/${auctionId}`,
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
  const { data } = await axios.get(`${API_URL}/auction/${auctionId}/seller`);
  return data;
}

// 입찰 내역 조회
export async function fetchBidHistory(auctionId) {
  const { data } = await axios.get(
    `${API_URL}/auction/${auctionId}/bidHistory?page=0&size=1`,
  );
  return data;
}
