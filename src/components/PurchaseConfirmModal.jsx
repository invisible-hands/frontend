import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ka1425de5708ea.user-app.krampoline.com',
});

function PurchaseConfirmModal({ isModalOpen, setIsModalOpen, dealId }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConfirm = async () => {
    try {
      console.log('dealId2', dealId);
      const accessToken = import.meta.env.VITE_TOKEN;
      // 서버에 구매 확정 요청 보내기

      const response = await axiosInstance.put(
        `/api/deal/${dealId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );

      console.log('responseData', response.data);
      const responseData = response.data;

      // API 요청 성공 시 처리
      if (responseData.status === 'success') {
        setIsSubmitted(true);
      } else {
        // 실패 시 처리
        console.error(responseData.message);
      }
    } catch (error) {
      // API 요청 실패 시 처리
      console.error('API 요청 실패:', error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black opacity-50" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              ref={modalRef}
              className="relative bg-white p-8 rounded-lg shadow-lg w-96 space-x-2/3 flex flex-col items-center"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 m-4"
              >
                X
              </button>

              {isSubmitted ? (
                <div>
                  <h2 className="text-center text-md font-bold mb-6 mt-10 text-deepblue2">
                    구매가 확정 되었습니다!
                  </h2>
                </div>
              ) : (
                <div>
                  <h2 className="text-center text-xl font-bold mb-6 ">
                    구매 확정하기
                  </h2>
                  <p className="text-deepblue2">구매 확정 하시겠습니까?</p>
                  <div className="flex mt-7 justify-center">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="bg-grayish text-xs px-1 rounded"
                    >
                      확인
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-grayish text-xs px-1 rounded ml-6"
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

PurchaseConfirmModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  dealId: PropTypes.number.isRequired,
};

export default PurchaseConfirmModal;

// const handleConfirm = async () => {
//   try {
//     const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

//     if (!accessToken) {
//       alert('로그인이 필요합니다.');
//       window.location.href = '/';
//       return;
//     }

//     // 서버에 구매 확정 요청 보내기
//     const response = await axios.patch(
//       '/api/deal/{dealId}', // 여기에 실제 API 엔드포인트를 넣으세요.
//       {
//         status: 'PURCHASE_COMPLETED', // 변경할 상태
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );

//     const responseData = response.data;

//     // API 요청 성공 시 처리
//     if (responseData.status === 'success') {
//       setIsSubmitted(true);
//     } else {
//       // 실패 시 처리
//       console.error(responseData.message);
//     }
//   } catch (error) {
//     // API 요청 실패 시 처리
//     console.error('API 요청 실패:', error);
//   }
// };
