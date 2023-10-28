import React from 'react';
import PropTypes from 'prop-types';
import darkLogo from '../assets/darkLogo.png';

function Header({ isLoggedIn, nickname }) {
  return (
    <header className="max-w-screen-lg w-clamp-header mx-auto">
      <nav
        className="flex w-full items-center bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700"
        data-te-navbar-ref
      >
        <div className="flex w-full items-center justify-between px-3">
          <div className="flex w-72">
            <img src={darkLogo} alt="Logo" className="flex w-clamp-input" />
          </div>
          <div className="flex items-stretch">
            <input
              type="search"
              className="m-0 -mr-0.5 rounded-l-xl border-2 border-blue3 bg-transparent px-3 py-[0.25rem] text-neutral-700 outline-none transition duration-200 ease-in-out border-r-0"
              placeholder="고르고 입찰하고 쟁취하세요!"
              aria-label="Search"
            />

            <button
              className="z-[2] flex items-center rounded-r-xl pr-4 py-2 text-xs font-medium leading-tight text-blue1 transition duration-150 ease-in-out border-2 border-blue3 border-l-0 focus:outline-none"
              type="button"
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
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-clamp-p-text">
            {isLoggedIn ? (
              <>
                <span className="text-deepblue1">{nickname} 님</span>
                <button type="button" className="text-deepblue1">
                  마이페이지
                </button>
                <button type="button" className="text-deepblue1">
                  로그아웃
                </button>
              </>
            ) : (
              <button type="button" className="text-deepblue1">
                로그인
              </button>
            )}

            <button type="button" className="text-deepblue1">
              상품 등록
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  nickname: PropTypes.string,
};

// defaultProps 설정
Header.defaultProps = {
  isLoggedIn: true,
  nickname: '새벽다섯시',
};

export default Header;
