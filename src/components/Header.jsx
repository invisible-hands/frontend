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
      navigate('/product/registration');
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
          <div className="flex items-stretch transition-all ease-in-out duration-200 w-48 h-8 text-xs md:w-72 md:h-12 md:text-base">
            <input
              type="search"
              className="hidden md:block -mr-0.5 w-full rounded-l-xl border-2 border-blue3 bg-transparent pl-3 text-deepblue1 outline-none transition duration-200 ease-in-out border-r-0 truncate"
              placeholder="고르고 입찰하고 쟁취하세요!"
              aria-label="Search-md"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <input
              type="search"
              className="block md:hidden -mr-0.5 w-full rounded-l-xl border-2 border-blue3 bg-transparent pl-3 text-deepblue1 outline-none transition duration-200 ease-in-out border-r-0 truncate"
              placeholder="상품 검색"
              aria-label="Search"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <button
              className="transition-all ease-in-out duration-300 z-10 flex items-center rounded-r-xl p-2 font-medium leading-tight text-blue1 border-2 border-blue3 border-l-0 focus:outline-none"
              type="button"
              onClick={handleSearch}
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
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
