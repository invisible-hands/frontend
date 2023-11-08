import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function PurchaseDropdown({ setStatusFilter }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const dealStatusOptions = {
    '': '전체',
    DELIVERY_WAITING: '배송 대기중',
    PURCHASE_COMPLETE_WAITING: '구매 확정 대기',
    PURCHASE_COMPLETED: '구매 확정',
    PURCHASE_CANCEL: '취소',
  };

  const handleChange = event => {
    const { value } = event.target;
    setSelectedStatus(value);
    setStatusFilter(value); // 부모 컴포넌트로 선택된 상태 업데이트
  };

  const options = Object.entries(dealStatusOptions).map(([key, label]) => (
    <option key={key} value={key}>
      {label}
    </option>
  ));

  return (
    <div className="relative mb-2 ">
      <select
        className="mt-1 z-20 text-sm px-8 bg-grayish rounded-lg text-center"
        value={selectedStatus}
        onChange={handleChange}
      >
        {options}
      </select>
    </div>
  );
}

export function AuctionDropdown({ setStatusFilter }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const auctionStatusOptions = {
    '': '전체',
    AUCTION_PROGRESS: '경매 진행중',
    AUCTION_SUCCESS: '낙찰 성공',
    AUCTION_FAIL: '낙찰 실패',
  };

  const handleChange = event => {
    const { value } = event.target;
    setSelectedStatus(value);
    setStatusFilter(value); // 부모 컴포넌트로 선택된 상태 업데이트
  };

  const options = Object.entries(auctionStatusOptions).map(([key, label]) => (
    <option key={key} value={key}>
      {label}
    </option>
  ));

  return (
    <div className="relative mb-2 ">
      <select
        className="mt-1 z-20 text-sm px-8 bg-grayish rounded-lg text-center"
        value={selectedStatus}
        onChange={handleChange}
      >
        {options}
      </select>
    </div>
  );
}

export function SellingDropdown({ setStatusFilter }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const dealStatusOptions = {
    '': '전체',
    DELIVERY_WAITING: '배송 대기중',
    PURCHASE_COMPLETE_WAITING: '구매 확정 대기',
    PURCHASE_COMPLETED: '구매 확정',
    PURCHASE_CANCEL: '취소',
  };

  const handleChange = event => {
    const { value } = event.target;
    setSelectedStatus(value);
    setStatusFilter(value); // 부모 컴포넌트로 선택된 상태 업데이트
  };

  const options = Object.entries(dealStatusOptions).map(([key, label]) => (
    <option key={key} value={key}>
      {label}
    </option>
  ));

  return (
    <div className="relative mb-2 ">
      <select
        className="mt-1 z-20 text-sm px-8 bg-grayish rounded-lg text-center"
        value={selectedStatus}
        onChange={handleChange}
      >
        {options}
      </select>
    </div>
  );
}

PurchaseDropdown.propTypes = {
  setStatusFilter: PropTypes.func.isRequired,
  // dealStatusOptions: PropTypes.objectOf(PropTypes.string).isRequired,
};

AuctionDropdown.propTypes = {
  setStatusFilter: PropTypes.func.isRequired,
  // dealStatusOptions: PropTypes.objectOf(PropTypes.string).isRequired,
};

SellingDropdown.propTypes = {
  setStatusFilter: PropTypes.func.isRequired,
  // dealStatusOptions: PropTypes.objectOf(PropTypes.string).isRequired,
};
// {
//   /* <option value=""> 전체</option>
//         <option value="DELIVERY_WAITING">배송 대기</option>
//         <option value="PURCHASE_COMPLETE_WAITING">구매 확정 대기</option>
//         <option value="PURCHASE_COMPLETED">구매 확정</option>
//         <option value="PURCHASE_CANCEL">취소</option> */
// }
