import React from 'react';

function Sidebar() {
  return (
    <div className="w-40 h-full min-h-screen border-r shadow-md pt-4">
      <div className="text-black font-black text-xl p-4 pl-7">마이 페이지</div>
      <div className="mb-1" />
      <ul className="space-y-2 p-4 pl-5">
        <li className="inline-block text-black font-extrabold text-lg hover:bg-gray-200 p-2 rounded">
          프로필 정보
        </li>
        <li className="inline-block text-black font-extrabold text-lg hover:bg-gray-200 p-2 rounded">
          쇼핑 정보
        </li>
        <div className="ml-4">
          <li className="inline-block text-black font-medium hover:bg-gray-200 p-2 rounded">
            구매 목록
          </li>
          <li className="inline-block text-black font-medium hover:bg-gray-200 p-2 rounded">
            경매 목록
          </li>
          <li className="inline-block text-black font-medium hover:bg-gray-200 p-2 rounded">
            판매 목록
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
