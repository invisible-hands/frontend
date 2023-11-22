import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useLoginStore from '../stores/loginStore';

const axiosInstance = axios.create({
  baseURL: 'https://k77ac60ee78b9a.user-app.krampoline.com',
});

function InvoiceInputModal({ isModalOpen, setIsModalOpen, auctionId }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [deliveryCompany, setDeliveryCompany] = useState('postOffice'); // 초기값 설정
  const { accessToken } = useLoginStore();

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
      const response = await axiosInstance.post(
        '/api/delivery',
        {
          invoice,
          deliveryCompany,
          auctionId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseData = response.data;
      console.log(response.data);

      // API 요청 성공 시 처리
      if (response.status === 200) {
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

  useEffect(() => {
    if (isSubmitted) {
      // isSubmitted가 true로 변경되었을 때 페이지 리프레시 수행
      window.location.reload();
    }
  }, [isSubmitted]);

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
                  <h2 className="text-center text-md font-bold mb-6 mt-10 text-gray-700">
                    송장 번호가 입력되었습니다.
                  </h2>
                </div>
              ) : (
                <div>
                  <h2 className="text-left text-xl font-bold mb-12 text-deepblue2">
                    송장 번호 입력
                  </h2>

                  <div className="flex space-x-4 mb-4 ">
                    <div className="flex-1">
                      <div className="text-sm font-bold mb-2 ml-2">
                        택배사 선택
                      </div>
                      <select
                        name="courier"
                        id="courier"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={deliveryCompany}
                        onChange={e => setDeliveryCompany(e.target.value)}
                      >
                        <option value="postOffice">우체국택배</option>
                        <option value="cj">CJ대한통운</option>
                        <option value="hanjin">한진택배</option>
                        <option value="hyundai">현대택배</option>
                        <option value="hanjin">경동택배</option>
                        <option value="logen">로젠택배</option>
                        <option value="lotte">롯데택배</option>
                        <option value="hansem">한샘택배</option>
                        <option value="fedex">FedEx</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-bold mb-2 ml-2">
                        송장 번호
                      </div>
                      <input
                        type="text"
                        name="trackingNumber"
                        id="trackingNumber"
                        placeholder="송장번호를 입력하세요."
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={invoice}
                        onChange={e => setInvoice(e.target.value)}
                      />
                    </div>
                  </div>
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

InvoiceInputModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  auctionId: PropTypes.number.isRequired,
};

export default InvoiceInputModal;

// const handleConfirm = async () => {
//   try {
//     const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

//     if (!accessToken) {
//       alert('로그인이 필요합니다.');
//       window.location.href = '/';
//       return;
//     }

//     const response = await axios.post(
//       '/api/delivery',
//       {
//         trackingNumber,
//         courier,
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
