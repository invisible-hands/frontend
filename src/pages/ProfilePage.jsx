import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
import DaumPostcode from 'react-daum-postcode';
import { FaTimes } from 'react-icons/fa';
import profileImg from '../assets/logo-square.png';

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [name] = useState('');
  const [nickname, setNickname] = useState('');
  const [email] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectAddress = data => {
    setAddress(data.address);
    setPostcode(data.zonecode);
    closeModal();
  };

  const toggleTermsAgreement = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal max-w-md bg-white p-4 rounded shadow-lg flex flex-col">
            <button
              type="button"
              className="text-deepblue1 self-end m-3"
              onClick={closeModal}
            >
              <FaTimes size={20} />
            </button>
            {/* Daum Postcode 컴포넌트 */}
            <DaumPostcode autoClose={false} onComplete={handleSelectAddress} />
          </div>
        </div>
      )}

      {/* 프로필 정보 수정 섹션 */}
      <div className="w-full">
        <div className="mb-2">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="프로필 이미지"
              className="w-32 h-32 rounded-full my-2"
            />
          ) : (
            <img
              src={profileImg}
              alt="프로필 이미지"
              className="w-32 h-32 rounded-full my-2 bg-deepblue1 border-solid border-2 border-blue2"
            />
          )}
          <input
            type="file"
            id="profileImage"
            onChange={e => setProfileImage(e.target.files[0])}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="name"
            value={name}
            readOnly
            placeholder="이름"
            disabled
            className="mb-2 px-2 py-1 rounded border-2 border-gray-300"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="닉네임"
            className="mb-2 px-2 py-1 rounded border-2 border-gray-300"
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            placeholder="이메일"
            disabled
            className="mb-2 px-2 py-1 rounded border-2 border-gray-300"
          />
        </div>
        <input
          type="text"
          id="postcode"
          value={postcode}
          readOnly
          placeholder="우편번호"
          disabled
          className="mb-2 px-2 py-1 rounded border-2 border-gray-300"
        />
        <div className="mb-2">
          <input
            type="text"
            id="address"
            value={address}
            readOnly
            placeholder="배송지"
            disabled
            className="px-2 py-1 rounded border-2 border-gray-300"
          />
          <TERipple rippleColor="light" rippleCentered>
            <button
              type="button"
              className="bg-deepblue2 text-white px-2 py-1 rounded ml-2"
              onClick={openModal}
            >
              검색
            </button>
          </TERipple>
        </div>
        <input
          type="text"
          id="addressDetail"
          value={addressDetail}
          onChange={e => setAddressDetail(e.target.value)}
          placeholder="상세 주소 입력"
          className="mb-2 px-2 py-1 rounded border-2 border-gray-300"
        />
        <div className="mb-2">
          <input
            type="text"
            id="bankAccount"
            value={bankAccount}
            onChange={e => setBankAccount(e.target.value)}
            placeholder="계좌번호"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="virtualMoney"
            value="10000"
            readOnly
            className="bg-gray-100 text-gray-500 px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <p className="text-sm text-left">
            <strong>약관 동의서:</strong>
            <br />
            본 쇼핑몰의 이용자는 아래의 약관 내용에 동의한 것으로 간주합니다.
            <br />
            모든 제품의 주문과 환불은 쇼핑몰의 정책에 따라 진행됩니다.
            <br />
            개인정보는 보안을 위해 최선을 다해 보호하며, 제3자에게 제공되지
            않습니다.
            <br />
            본 약관은 사전 통보 없이 변경될 수 있으며, 변경된 약관은 쇼핑몰
            사이트에 공지됩니다.
            <br />
            문제 발생 시, 본 약관 및 관련 법률에 따라 처리됩니다.
          </p>
          <label htmlFor="termsCheckbox" className="block text-left mt-2">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={agreedToTerms}
              onChange={toggleTermsAgreement}
              className="mr-2"
            />
            약관에 동의합니다
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
