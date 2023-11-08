import React, { useState, useEffect } from 'react';
import { TERipple } from 'tw-elements-react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import profileImg from '../assets/logo-square.png';

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [virtualMoney, setVirtualMoney] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [nicknameError, setNicknameError] = useState('');
  const [addressDetailError, setAddressDetailError] = useState('');

  const [isUpdatingNickname, setIsUpdatingNickname] = useState(false);

  const validateNickname = value => {
    if (value === '') {
      // 닉네임이 비어있는 경우
      return '닉네임을 비워둘 수 없습니다.';
    }

    const regex = /^[a-zA-Z0-9가-힣]+$/;
    if (!regex.test(value)) {
      // 닉네임이 정규식 조건에 맞지 않는 경우
      return '닉네임은 영어, 숫자, 한글(음절)만 포함할 수 있습니다.';
    }

    // 유효한 닉네임인 경우
    return '';
  };

  useEffect(() => {
    // Mock data
    const mockData = {
      name: '김경매',
      nickname: '!',
      profileImage: 'image_data_placeholder',
      bankAccount: '국민은행 1234-5678-9101',
      roadName: '서울특별시 양천구 목동중앙북로 1길',
      addressName: '서울특별시 양천구 123-4',
      zipcode: 19524,
      detailAddress: '1011호',
      email: 'betting@gmail.com',
      virtualMoney: 20000,
    };

    // 상태 업데이트 함수들을 사용하여 mock data로 상태 설정
    setName(mockData.name);
    setNickname(mockData.nickname);
    setEmail(mockData.email);
    // setProfileImage(mockData.profileImage); // 주의: 실제 이미지 처리 방식에 따라 다를 수 있습니다.
    setAddress(mockData.roadName);
    setAddressDetail(mockData.detailAddress);
    setBankAccount(mockData.bankAccount);
    setVirtualMoney(mockData.virtualMoney);
    setPostcode(mockData.zipcode.toString());

    setNickname(mockData.nickname);
    const errorMessage = validateNickname(mockData.nickname);
    setNicknameError(errorMessage);
  }, []);

  const handleAddressDetailChange = e => {
    const { value } = e.target;
    setAddressDetail(value);

    // 상세 주소가 비어있는 경우 오류 메시지 설정
    if (!value.trim()) {
      setAddressDetailError('상세 주소를 비워둘 수 없습니다.');
    } else {
      // 상세 주소에 입력이 있는 경우 오류 메시지 제거
      setAddressDetailError('');
    }
  };

  const handleNicknameChange = e => {
    const { value } = e.target;
    setNickname(value); // 닉네임 상태 업데이트

    // 유효성 검사를 통해 에러 메시지 업데이트
    const errorMessage = validateNickname(value);
    setNicknameError(errorMessage);
  };

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

  const isFormValid = () => {
    // 모든 필드가 유효한지 검증하고
    return (
      name &&
      validateNickname(nickname) === '' &&
      profileImage &&
      bankAccount &&
      address &&
      addressDetail &&
      postcode &&
      email &&
      agreedToTerms &&
      !addressDetailError // 상세 주소에 오류가 없어야 함
    );
  };

  const updateNickname = async () => {
    if (isUpdatingNickname) return; // Prevent multiple requests
    setIsUpdatingNickname(true);

    try {
      const response = await axios.put(
        'https://ka1425de5708ea.user-app.krampoline.com/api/user/nickname',
        { nickname },
      );
      // Handle response here
      console.log(response.data);
      // Optionally, set some state to show success message
    } catch (error) {
      // Handle error here
      console.error(error);
      // Optionally, set some state to show error message
    } finally {
      setIsUpdatingNickname(false);
    }
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
            onChange={handleNicknameChange}
            placeholder="닉네임"
            className={`mb-2 px-2 py-1 rounded border-2 ${
              nicknameError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            disabled={nicknameError || !nickname || isUpdatingNickname}
            onClick={updateNickname}
            className={`ml-2 ${
              nicknameError || !nickname ? 'bg-grayish' : 'bg-deepblue2'
            } text-white px-2 py-1 rounded`}
          >
            {isUpdatingNickname ? '수정 중...' : '수정'}
          </button>
          {nicknameError && (
            <p className="text-red-500 text-xs">{nicknameError}</p>
          )}
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
        <div className="mb-2">
          <input
            type="text"
            id="addressDetail"
            value={addressDetail}
            onChange={handleAddressDetailChange}
            placeholder="상세 주소 입력"
            className={`truncate mb-2 px-2 py-1 rounded border-2 ${
              addressDetailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {addressDetailError && (
            <p className="text-red-500 text-xs">{addressDetailError}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="bankAccount"
            value={bankAccount}
            onChange={e => setBankAccount(e.target.value)}
            placeholder="계좌번호"
            className="mb-2 px-2 py-1 rounded border-2 border-gray-300"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="virtualMoney"
            value={virtualMoney}
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
        <div className="mb-4">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            프로필 수정
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
