import React from 'react';

export function ShoppingContainer() {
  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">구매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[37.25rem] text-center">
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

export function AuctionContainer() {
  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">경매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[37.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div className="text-sm text-gray-600">전체</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-12 pr-8">
              <div className="text-sm text-gray-600">경매 진행</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-8 pr-8">
              <div className="text-sm text-gray-600">경매 종료</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SellingContainer() {
  return (
    <div className="mb-2">
      <div className="mt-10" />
      <div className="pl-4 pb-2 block text-md font-semibold">판매 목록</div>
      <section className="bg-blue3 p-6 rounded-xl whitespace-no-wrap shadow-md min-w-[37.25rem] text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center space-x-12">
            <div className="block pl-10 pr-8">
              <div className="text-sm text-gray-600">전체</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-12 pr-6">
              <div className="text-sm text-gray-600">베송전</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-12 pr-6">
              <div className="text-sm text-gray-600">진행중</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
            <div className="block pl-8 pr-8">
              <div className="text-sm text-gray-600">완료</div>
              <div className="mt-2 text-sm text-white">0</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
