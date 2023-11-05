import React from 'react';
import sampleImg from '../assets/sample.png';

function HotPreview() {
  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-4 gap-4">
        {/* 상품1 */}
        <div className="border p-4 rounded-md relative">
          {/* relative for positioning the timer */}
          <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
            00:59:30
          </div>
          {/* 타이머 */}
          <img
            src={sampleImg}
            alt="상품 이미지1"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <div className="text-xl font-bold mb-2 truncate">상품명1</div>
          <div className="text-md mb-1">
            현재 입찰 <span className="text-lg font-bold">800</span> 원
          </div>
          <div className="text-md font-bold text-deepblue1">
            즉시구매 <span className="text-lg font-bold">1000</span> 원
          </div>
        </div>
        {/* 상품2 */}
        <div className="border p-4 rounded-md relative">
          {/* relative for positioning the timer */}
          <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
            00:45:15
          </div>
          {/* 타이머 */}
          <img
            src={sampleImg}
            alt="상품 이미지2"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <div className="text-xl font-bold mb-2 truncate">상품명2</div>
          <div className="text-md mb-1">
            현재 입찰 <span className="text-lg font-bold">800</span> 원
          </div>
          <div className="text-md font-bold text-deepblue1">
            즉시구매 <span className="text-lg font-bold">1000</span> 원
          </div>
        </div>
        {/* 상품3 */}
        <div className="border p-4 rounded-md relative">
          {/* relative for positioning the timer */}
          <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
            00:45:15
          </div>
          {/* 타이머 */}
          <img
            src={sampleImg}
            alt="상품 이미지3"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <div className="text-xl font-bold mb-2 truncate">상품명3</div>
          <div className="text-md mb-1">
            현재 입찰 <span className="text-lg font-bold">800</span> 원
          </div>
          <div className="text-md font-bold text-deepblue1">
            즉시구매 <span className="text-lg font-bold">1000</span> 원
          </div>
        </div>
        {/* 상품4 */}
        <div className="border p-4 rounded-md relative">
          {/* relative for positioning the timer */}
          <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
            00:45:15
          </div>
          {/* 타이머 */}
          <img
            src={sampleImg}
            alt="상품 이미지4"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <div className="text-xl font-bold mb-2 truncate">상품명4</div>
          <div className="text-md mb-1">
            현재 입찰 <span className="text-lg font-bold">800</span> 원
          </div>
          <div className="text-md font-bold text-deepblue1">
            즉시구매 <span className="text-lg font-bold">1000</span> 원
          </div>
        </div>
        {/* 상품5 */}
        <div className="border p-4 rounded-md relative">
          {/* relative for positioning the timer */}
          <div className="absolute top-1 right-1 bg-deepblue2/20 text-deepblue1 text-md px-2 py-1 rounded">
            00:45:15
          </div>
          {/* 타이머 */}
          <img
            src={sampleImg}
            alt="상품 이미지3"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <div className="text-xl font-bold mb-2 truncate">상품명5</div>
          <div className="text-md mb-1">
            현재 입찰 <span className="text-lg font-bold">800</span> 원
          </div>
          <div className="text-md font-bold text-deepblue1">
            즉시구매 <span className="text-lg font-bold">1000</span> 원
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotPreview;
