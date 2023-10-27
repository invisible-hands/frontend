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
          {/* Logo */}
          <img src={image} alt="Logo" className="w-24 h-auto" />

          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <input
              type="text"
              placeholder="고르고 입찰하고 쟁취하세요!"
              className="border p-2 rounded-md w-72"
            />
            {/* Search Button */}
            <button
              type="button"
              className="bg-gray-500 text-white rounded-md p-2"
            >
              검색
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Product Register Button */}
            <button
              type="button"
              className="bg-green-500 text-white rounded-md p-2"
            >
              상품 등록
            </button>

            {/* Login Button */}
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
