import React from 'react';
import { SellingContainer } from './ShoppingContainer';
import { SellingItem } from './PurchaseItem';

function SellingRecord() {
  return (
    <div>
      <div className="w-[50%] mx-auto">
        <SellingContainer />
        <div className="p-1 justufy-center min-w-[33.9365rem] max-w-xl mx-auto">
          <div className="p-1 bg-white rounded-xl min-w-[33.9365rem]">
            <SellingItem
              imageUrl="/harokIphone.png"
              productName="최하록이 만든 마법의 아이폰"
              totalPrice="200"
              status="진행중"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellingRecord;
