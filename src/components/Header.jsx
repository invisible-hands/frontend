import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useModalStore from '../modalStore';
import LoginModal from './LoginModal';

function Header({ isLoggedIn, nickname }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { openModal } = useModalStore(state => ({
    isModalOpen: state.isModalOpen,
    openModal: state.openModal,
    closeModal: state.closeModal,
  }));

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleSearch = async () => {
    try {
      const pageable = {
        page: 0,
        size: 1,
      };

      alert(`검색어: ${searchKeyword}`);

      const response = await axios.get(
        `https://k77ac60ee78b9a.user-app.krampoline.com/api/auction/search`,
        {
          params: {
            keyword: searchKeyword,
            page: pageable.page,
            size: pageable.size,
          },
        },
      );

      if (response.data.status === 'Success') {
        setSearchResults(response.data.data.items);
      }
    } catch (error) {
      console.error('Error while searching:', error);
    }
  };

  const handleProductRegistration = () => {
    if (loggedIn) {
      navigate('/product/registration');
    } else {
      openLoginModal();
    }
  };

  const handleProfilePage = () => {
    if (loggedIn) {
      navigate('/profile');
    } else {
      openLoginModal();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <header className="max-w-screen-lg mx-auto">
      <nav
        className="flex w-full items-center bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700"
        data-te-navbar-ref
      >
        <div className="flex w-full items-center justify-between px-7">
          <div
            className="flex min-w-28 w-32 h-16 bg-center bg-no-repeat bg-contain bg-dark-logo cursor-pointer"
            role="button"
            aria-label="메인 페이지로 이동"
            onClick={handleLogoClick}
          />
          <div className="flex items-stretch w-72">
            <input
              type="search"
              className="-mr-0.5 w-full rounded-l-xl border-2 border-blue3 bg-transparent px-3 text-base text-neutral-700 outline-none transition duration-200 ease-in-out border-r-0"
              placeholder="고르고 입찰하고 쟁취하세요!"
              aria-label="Search"
              onClick={handleLogoClick}
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <button
              className="z-[2] flex items-center rounded-r-xl pr-4 py-2 text-xs font-medium leading-tight text-blue1 transition duration-150 ease-in-out border-2 border-blue3 border-l-0 focus:outline-none"
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

          <div className="flex items-center text-xs	space-x-2 select-none whitespace-nowrap">
            {isLoggedIn ? (
              <>
                <span className="text-deepblue1 ">{nickname} 님</span>
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
                  onClick={() => openModal}
                >
                  로그인
                </button>
                <LoginModal isModalOpen={openModal} />
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

          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <div>
              <h2>Search Results:</h2>
              <ul>
                {searchResults.map(item => (
                  <li key={item.auctionId}>{item.title}</li>
                ))}
              </ul>
            </div>
          )}

          {showLoginModal && <LoginModal onClose={closeLoginModal} />}
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  nickname: PropTypes.string,
};

Header.defaultProps = {
  isLoggedIn: false,
  nickname: '새벽다섯시',
};

export default Header;
