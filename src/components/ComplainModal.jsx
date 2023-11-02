import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ComplainModal({ isModalOpen, setIsModalOpen }) {
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
                    신고 사항이 접수 되었습니다. <br />
                    불편을 드려 죄송합니다.
                  </h2>
                </div>
              ) : (
                <div>
                  <h2 className="text-center text-2xl font-bold mb-6 ">
                    신고하기
                  </h2>
                  <p className="text-danger">정말 신고하시겠습니까?</p>
                  <div className="flex mt-7 justify-center">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(true)}
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

ComplainModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default ComplainModal;
