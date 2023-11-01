import React from 'react';

function Sidebar() {
  return (
    <div className="sticky top-0 w-[20%] min-w-[15.9rem] h-full min-h-screen border-r shadow-md pt-10 pl-10">
      <div className="text-black font-black text-2xl p-4 pl-10">
        마이 페이지
      </div>
      <div className="mb-1" />
      <ul className="space-y-2 p-4 pl-8">
        <li className="block text-black font-extrabold text-2xl hover:bg-gray-200 p-2 rounded">
          프로필 정보
        </li>
        <li className="block text-black font-extrabold text-2xl hover:bg-gray-200 p-2 rounded">
          쇼핑 정보
        </li>
        <div className="ml-4">
          <li className="block text-black font-medium text-xl hover:bg-gray-200 p-2 rounded">
            구매 목록
          </li>
          <li className="block text-black font-medium text-xl hover:bg-gray-200 p-2 rounded">
            경매 목록
          </li>
          <li className="block text-black font-medium text-xl hover:bg-gray-200 p-2 rounded">
            판매 목록
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
