import React, { useEffect } from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import resetCSSBody from '../utils/modalCloseUtils';

export default function BidSuccessModal({ showModal, setShowModal }) {
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      resetCSSBody();
    };
  }, []);

  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <TEModalDialog centered>
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              입찰 성공
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody>입찰을 성공했습니다</TEModalBody>
          <TEModalFooter>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={() => navigate('/profile/shopping/auction')}
              >
                내 입찰 내역 확인하기
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

BidSuccessModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
