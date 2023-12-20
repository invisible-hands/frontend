import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useLoginStore from './stores/loginStore';
import useModalStore from './stores/modalStore';
import LoginModal from './pages/LoginPage/LoginModal';

function ProtectedRoute({ children }) {
  const { loggedIn } = useLoginStore(state => ({
    loggedIn: state.loggedIn,
  }));
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    if (!loggedIn) {
      openModal();
    } else {
      closeModal();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    // 로그인이 안 되어 있을 시 메인 페이지 혹은 이전 페이지로 이동 하는 로직 필요

    return (
      <>
        {children} {/* 현재 컨텐츠는 유지하되 로그인 모달을 보여줌 */}
        <LoginModal />
      </>
    );
  }

  return children; // 인증이 되어 있을 때는 그대로 children을 렌더링
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
