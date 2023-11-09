import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const goToPage = path => {
    navigate(path);
  };

  return (
    <div className="sticky top-0 w-[20%] min-w-[15.9rem] h-full min-h-screen border-r shadow-md pt-10 pl-10">
      <div className="text-black font-black text-2xl p-4 pl-10">
        마이 페이지
      </div>
      <div className="mb-1" />
      <ul className="space-y-2 p-4 pl-8">
        <li className="block text-black font-extrabold text-2xl hover:bg-gray-200 p-2 rounded">
          <a
            href="/mypage"
            onClick={e => {
              e.preventDefault();
              goToPage('/mypage');
            }}
          >
            프로필 정보
          </a>
        </li>
        <li className="block text-black font-extrabold text-2xl hover:bg-gray-200 p-2 rounded">
          <a
            href="/mypage/shopping"
            onClick={e => {
              e.preventDefault();
              goToPage('/mypage/shopping');
            }}
          >
            쇼핑 정보
          </a>
        </li>
        <div className="ml-4">
          <li className="block text-black font-medium text-xl hover:bg-gray-200 p-2 rounded">
            <a
              href="/mypage/shopping/purchase"
              onClick={e => {
                e.preventDefault();
                goToPage('/mypage/shopping/purchase');
              }}
            >
              구매 목록
            </a>
          </li>
          <li className="block text-black font-medium text-xl hover:bg-gray-200 p-2 rounded">
            <a
              href="/mypage/shopping/auction"
              onClick={e => {
                e.preventDefault();
                goToPage('/mypage/shopping/auction');
              }}
            >
              경매 목록
            </a>
          </li>
          <li className="block text-black font-medium text-xl hover:bg-gray-200 p-2 rounded">
            <a
              href="/mypage/shopping/selling"
              onClick={e => {
                e.preventDefault();
                goToPage('/mypage/shopping/selling');
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