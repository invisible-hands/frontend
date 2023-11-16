import React from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../stores/loginStore';

export default function DeleteConfirmModal({
  showModal,
  setShowModal,
  auctionName,
  auctionId,
}) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_URL;

  const { accessToken: token } = useLoginStore();

  const deleteAuction = async (id, accessToken) => {
    await axios
      .delete(`${API_URL}/auction/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          alert('삭제 완료');
          navigate('/');
        }
      })
      .catch(err => {
        console.log('삭제 api 요청 중 에러 발생 : ', err.response.data.message);
      });
  };

  const handleDelete = (id, userToken) => {
    console.log('handle', userToken);
    deleteAuction(id, userToken);
  };

  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <TEModalDialog centered>
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              게시물 삭제
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
          <TEModalBody>
            <p className="text-center py-4">
              {`"${auctionName}" 삭제하시겠습니까?`}
            </p>
          </TEModalBody>
          <TEModalFooter className="flex justify-center">
            <TERipple rippleColor="light" rippleCentered>
              <button
                type="button"
                className="inline-block rounded-full bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => handleDelete(auctionId, token)}
              >
                삭제하기
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

DeleteConfirmModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  auctionName: PropTypes.string.isRequired,
  auctionId: PropTypes.number.isRequired,
};
