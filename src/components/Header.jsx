import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import useModalStore from '../stores/modalStore';
import useLoginStore from '../stores/loginStore';

function Header() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const { loggedIn, nickName, logOut } = useLoginStore();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
  };

  const handleProductRegistration = () => {
    if (loggedIn) {
      navigate('/auction/register');
    } else {
      openModal();
    }
  };

  const handleProfilePage = () => {
    if (loggedIn) {
      navigate('/profile');
    } else {
      openModal();
    }
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <header className="max-w-screen-lg mx-auto w-full">
      <nav
        className="flex w-full items-center bg-white px-3 py-0.5 shadow-lg md:px-7 md:py-2"
        data-te-navbar-ref
      >
        <div className="flex w-full items-center justify-between gap-x-2">
          {/* 로고 */}
          <div
            className="transition-all ease-in-out duration-200 flex w-20 h-16 bg-center bg-no-repeat bg-contain bg-dark-logo cursor-pointer md:w-32 md:h-20"
            role="button"
            aria-label="메인 페이지로 이동"
            onClick={handleLogoClick}
          />

          {/* 검색창 */}
          <div className="relative flex items-stretch transition-all ease-in-out duration-200 w-48 h-8 text-xs md:w-72 md:h-12 md:text-base lg:w-96">
            <input
              type="search"
              className="w-full hidden md:block rounded-full border-2 border-blue3 bg-transparent pl-3 pr-10 text-deepblue1 outline-none transition duration-200 ease-in-out truncate"
              placeholder="고르고 입찰하고 쟁취하세요!"
              aria-label="Search-md"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <input
              type="search"
              className="w-full block md:hidden rounded-full border-2 border-blue3 bg-transparent pl-3 pr-10 text-deepblue1 outline-none transition duration-200 ease-in-out truncate"
              placeholder="상품 검색"
              aria-label="Search"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <button
              className="absolute right-0 top-0 flex items-center justify-center p-2 font-medium text-blue1 focus:outline-none md:top-1 md:right-1"
              type="button"
              onClick={handleSearch}
              id="button-addon1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center transition-all ease-in-out duration-300 text-xs gap-x-1 select-none whitespace-nowrap md:text-base md:gap-x-2">
            {loggedIn ? (
              <>
                <span className="hidden md:inline text-deepblue1">
                  {nickName} 님
                </span>
                <button
                  type="button"
                  className="text-deepblue1"
                  onClick={handleProfilePage}
                >
                  마이페이지
                </button>
                <button
                  type="button"
                  className="text-deepblue1"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-deepblue1"
                  onClick={openModal}
                >
                  로그인
                </button>
                <LoginModal isModalOpen={isModalOpen} onClose={closeModal} />
              </>
            )}
            <button
              type="button"
              className="text-deepblue1"
              onClick={handleProductRegistration}
            >
              상품 등록
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
