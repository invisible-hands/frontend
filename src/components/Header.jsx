import React from 'react';
import image from '../assets/darkLogo.png';

function Header() {
  return (
    <header className="max-w-screen-lg mx-auto">
      <nav
        className="relative flex w-full items-center bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap"
        data-te-navbar-ref
      >
        <div className="flex w-full items-center justify-between px-3">
          <img src={image} alt="Logo" className="w-24 h-auto" />

          <div className="relative flex flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-96 flex-auto rounded-l-xl border-2 border-blue3 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out border-r-0 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="고르고 입찰하고 쟁취하세요!"
              aria-label="Search"
              aria-describedby="button-addon1"
            />

            <button
              className="relative z-[2] flex items-center rounded-r-xl pr-4 py-2 text-xs font-medium uppercase leading-tight text-blue1 transition duration-150 ease-in-out border-2 border-blue3 border-l-0 focus:outline-none"
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

          <div className="flex items-center space-x-4">
            <button type="button" className="text-deepblue1 p-2">
              상품 등록
            </button>

            <button type="button" className="text-deepblue1 p-2">
              로그인
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
