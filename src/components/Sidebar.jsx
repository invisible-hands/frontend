import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const goToPage = path => {
    navigate(path);
  };

  return (

    <div className="sticky h-full min-h-screen border-r pt-3 px-3 shadow-md md:pt-6 md:px-6 lg:pt-9 lg:px-9">
      <div className="text-deepblue1 text-lg mb-4 select-none md:text-2xl">
        마이페이지

      </div>
      <ul className="space-y-2">
        <div className="block text-black rounded select-none md:text-xl">
          <li className="mb-2 hover:bg-gray-200">
            <a
              href="/profile"
              onClick={e => {
                e.preventDefault();
                goToPage('/profile');
              }}
            >
              프로필 정보
            </a>
          </li>
          <li className="mb-2 hover:bg-gray-200 rounded select-none md:text-xl">
            <a
              href="/profile/shopping"
              onClick={e => {
                e.preventDefault();
                goToPage('/profile/shopping');
              }}
            >
              쇼핑 정보
            </a>
          </li>
        </div>
        <div className="block text-black text-sm mt-4">
          <li className="mb-2 hover:bg-gray-200 rounded select-none md:text-lg">
            <a
              href="/profile/shopping/purchase"
              onClick={e => {
                e.preventDefault();
                goToPage('/profile/shopping/purchase');
              }}
            >
              구매 목록
            </a>
          </li>
          <li className="mb-2 hover:bg-gray-200 rounded select-none md:text-lg">
            <a
              href="/profile/shopping/auction"
              onClick={e => {
                e.preventDefault();
                goToPage('/profile/shopping/auction');
              }}
            >
              경매 목록
            </a>
          </li>
          <li className="mb-2 hover:bg-gray-200 rounded select-none md:text-lg">
            <a
              href="/profile/shopping/selling"
              onClick={e => {
                e.preventDefault();
                goToPage('/profile/shopping/selling');
              }}
            >
              판매 목록
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
