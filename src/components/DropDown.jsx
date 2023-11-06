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

        {/* <option value=""> 전체</option>
        <option value="DELIVERY_WAITING">배송 대기</option>
        <option value="PURCHASE_COMPLETE_WAITING">구매 확정 대기</option>
        <option value="PURCHASE_COMPLETED">구매 확정</option>
        <option value="PURCHASE_CANCEL">취소</option> */}
      </select>
    </div>
  );
}

export function AuctionDropdonw() {
  return (
    <div className="relative mb-2 ">
      <select className="mt-1 z-20 text-sm px-8 bg-grayish rounded-lg text-center">
        <option value=""> 전체</option>
        <option value="option1">발송 대기</option>
        <option value="option2">배송중</option>
        <option value="option3">배송 완료</option>
        <option value="option3">거래 완료</option>
        <option value="option3">거래 취소</option>
      </select>
    </div>
  );
}

PurchaseDropdown.propTypes = {
  setStatusFilter: PropTypes.func.isRequired,
  // dealStatusOptions: PropTypes.objectOf(PropTypes.string).isRequired,
};
