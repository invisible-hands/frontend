import React from 'react';

function ShoppingContainer() {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-bold ">쇼핑 정보</h1>
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">구매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[32.1875rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div className="text-sm text-gray-600">항목</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-12 pr-8">
              <div className="text-sm text-gray-600">전체수량</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-8 pr-8">
              <div className="text-sm text-gray-600">가격 합계</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingContainer;
