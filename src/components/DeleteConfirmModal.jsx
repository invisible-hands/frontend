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
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteAuction } from '../queries/auctionQueries';

export default function DeleteConfirmModal({
  showModal,
  setShowModal,
  productName,
  productId,
}) {
  // function handledeleteAuction(auctionId) {
  //   axios
  //     .delete(`${API_URL}/auction/${auctionId}`)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }\

  // 토큰을 읽어오는 함수
  const navigate = useNavigate();
  let token =
    'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc4LCJlbWFpbCI6Ik1lbGFueUBuYXZlci5jb20iLCJ1c2VybmFtZSI6Ik1lbGFueSIsIm5pY2tuYW1lIjoiTWVsYW55KDEyMykiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMDExMzc2MywiZXhwIjoxNzAwMjAwMTYzfQ.QNS6gflZEAs29GTp4GL9Fuk7hP-_JjzlKKkoFfAsfpU';
  useEffect(() => {
    // localStorage에서 토큰 읽어오기
    token =
      'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc4LCJlbWFpbCI6Ik1lbGFueUBuYXZlci5jb20iLCJ1c2VybmFtZSI6Ik1lbGFueSIsIm5pY2tuYW1lIjoiTWVsYW55KDEyMykiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMDExMzc2MywiZXhwIjoxNzAwMjAwMTYzfQ.QNS6gflZEAs29GTp4GL9Fuk7hP-_JjzlKKkoFfAsfpU';
  }, [showModal]);

  const handleDelete = (id, userToken) => {
    const res = deleteAuction(id, userToken);
    if (res.status === 200) {
      alert(res);
      navigate('/');
    } else {
      alert(res.message);
    }
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
              {`"${productName}" 삭제하시겠습니까?`}
            </p>
          </TEModalBody>
          <TEModalFooter className="flex justify-center">
            <TERipple rippleColor="light" rippleCentered>
              <button
                type="button"
                className="inline-block rounded-full bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => handleDelete(productId, token)}
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
  productName: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
};
