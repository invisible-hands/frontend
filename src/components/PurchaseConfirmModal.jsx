import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function PurchaseConfirmModal({ isModalOpen, setIsModalOpen }) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-white p-8 rounded-lg shadow-lg w-96 space-x-2/3"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 m-4"
            >
              X
            </button>
            <h2 className="text-center text-2xl font-bold mb-6">Modal Title</h2>
            <p>여기에 모달 내용을 넣어.</p>
          </div>
        </div>
      )}
    </div>
  );
}

PurchaseConfirmModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default PurchaseConfirmModal;
