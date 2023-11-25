import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import useLoginStore from '../stores/loginStore';
import profileImg from '../assets/bettingground.png';
import Sidebar from '../components/Sidebar';
import PaymentModal from '../components/PaymentModal';

function ProfilePage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_URL;
  const [originalNickname, setOriginalNickname] = useState('');
  const [originalPostcode, setOriginalPostcode] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const [originalAddressDetail, setOriginalAddressDetail] = useState('');
  const [originalBankName, setOriginalBankName] = useState('');
  const [originalBankAccount, setOriginalBankAccount] = useState('');

  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [virtualMoney, setVirtualMoney] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isUserRole, setIsUserRole] = useState(false);

  const [nicknameError, setNicknameError] = useState('');
  const [addressDetailError, setAddressDetailError] = useState('');
  const [bankAccountError, setBankAccountError] = useState('');

  const [isUpdatingNickname, setIsUpdatingNickname] = useState(false);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);

  const [nicknameSaved, setNicknameSaved] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);

  const bankOptions = [
    'KB국민은행',
    'NH농협은행',
    '신한은행',
    '우리은행',
    '하나은행',
    'IBK기업은행',
    'SC제일은행',
    '씨티은행',
    '대구은행',
    '부산은행',
    '광주은행',
    '제주은행',
    '전북은행',
    '경남은행',
  ];
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  // const [chargeAmount, setChargeAmount] = useState('');

  // 모달 열기
  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  // 모달 닫기
  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

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

  const validateBankAccount = value => {
    // 빈 문자열인 경우
    if (value.trim() === '') {
      return '계좌번호를 비워둘 수 없습니다.';
    }

    // 숫자만 포함하는 정규식
    const regex = /^\d+$/;
    if (!regex.test(value)) {
      // 숫자만 포함하지 않는 경우 오류 메시지 반환
      return '계좌번호는 숫자만 포함할 수 있습니다.';
    }

    // 유효한 계좌번호인 경우
    return '';
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { accessToken } = useLoginStore.getState();

        const response = await axios.get(`${API_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = response.data.data;
        console.log(userData);

        setOriginalNickname(userData.nickname);
        setOriginalPostcode(userData.zipcode);
        setOriginalAddress(userData.roadName);
        setOriginalAddressDetail(userData.detailAddress);
        setOriginalBankName(userData.bankName);
        setOriginalBankAccount(userData.bankAccount);

        setProfileImage(userData.profileImage);
        setNickname(userData.nickname);
        setEmail(userData.email);
        setPostcode(userData.zipcode);
        setAddress(userData.roadName);
        setAddressDetail(userData.detailAddress);
        setBankName(userData.bankName);
        setBankAccount(userData.bankAccount);
        setVirtualMoney(userData.money);
        setAgreedToTerms(userData.role === 'USER');
        setIsUserRole(userData.role === 'USER');

        const errorMessage = validateNickname(userData.nickname);
        setNicknameError(errorMessage);

        if (!errorMessage) {
          setNicknameSaved(true);
        }
      } catch (error) {
        console.error('Error while fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleNicknameChange = value => {
    setNickname(value);
    setNicknameSaved(value === originalNickname);

    const errorMessage = validateNickname(value);
    setNicknameError(errorMessage);
  };

  const handleAddressChange = (field, value) => {
    if (field === 'postcode') {
      setPostcode(value);
    } else if (field === 'address') {
      setAddress(value);
    } else if (field === 'addressDetail') {
      setAddressDetail(value);
      // 상세 주소가 비어있는 경우 오류 메시지 설정
      if (!value.trim()) {
        setAddressDetailError('상세 주소를 비워둘 수 없습니다.');
      } else {
        // 상세 주소에 입력이 있는 경우 오류 메시지 제거
        setAddressDetailError('');
      }
    }

    // postcode, address 또는 addressDetail이 변경되면 저장된 상태를 false로 설정
    setAddressSaved(
      postcode === originalPostcode &&
        address === originalAddress &&
        addressDetail === originalAddressDetail,
    );
  };

  const handleBankAccountChange = (field, value) => {
    if (field === 'bankAccount') {
      setBankAccount(value); // 계좌번호 상태 업데이트
      const errorMessage = validateBankAccount(value);
      setBankAccountError(errorMessage); // 에러 메시지 상태 업데이트
    } else if (field === 'bankName') {
      setBankName(value); // 은행명 상태 업데이트
    }

    // 은행명이나 계좌번호가 변경되었을 때 저장된 상태를 false로 설정
    setAccountSaved(
      bankName === originalBankName && bankAccount === originalBankAccount,
    );
  };

  const handleSelectAddress = data => {
    setAddress(data.address);
    setPostcode(data.zonecode);

    setAddressSaved(false);
    closeAddressModal();
  };

  const toggleTermsAgreement = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const updateNickname = async () => {
    if (isUpdatingNickname) return;
    setIsUpdatingNickname(true);

    try {
      const { accessToken } = useLoginStore.getState();

      const response = await axios.put(
        `${API_URL}/api/user/nickname`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      setNicknameSaved(true);
      setOriginalNickname(nickname);
      useLoginStore.getState().updateNickname(nickname);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === '이미 존재하는 닉네임입니다.') {
          setNicknameError(error.response.data.message);
        } else {
          setNicknameError(error.response.data.message);
        }
      } else {
        console.error(error);
        setNicknameError('닉네임 변경 중 오류가 발생했습니다.');
      }
    } finally {
      setIsUpdatingNickname(false);
    }
  };

  const updateAddress = async () => {
    if (isUpdatingAddress || !postcode || !address || !addressDetail) return; // 요청을 방지하는 조건들
    setIsUpdatingAddress(true);

    const addressData = {
      roadName: address,
      addressName: address,
      zipcode: postcode,
      detailAddress: addressDetail,
    };

    try {
      const { accessToken } = useLoginStore.getState();

      const response = await axios.put(
        `${API_URL}/api/user/address`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      setAddressSaved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingAddress(false);
    }
  };

  const updateAccountInfo = async () => {
    if (!bankName || !bankAccount || isUpdatingAccount) return;
    setIsUpdatingAccount(true);

    try {
      const { accessToken } = useLoginStore.getState();

      const response = await axios.put(
        `${API_URL}/api/user/account`,
        { bankName, bankAccount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      setAccountSaved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  const openChargeModal = () => {
    setIsChargeModalOpen(true);
  };

  // // 가상 머니 충전 모달 닫기
  // const closeChargeModal = () => {
  //   setIsChargeModalOpen(false);
  //   setChargeAmount(''); // 모달 닫을 때 입력값 초기화
  // };

  // 가상 머니 충전 처리 함수 (실제 API 요청 로직은 구현 필요)
  // const handleCharge = async () => {
  //   // API 요청 로직으로 가상 머니 충전 처리
  //   console.log(`충전 금액: ${chargeAmount}`);
  //   closeChargeModal();
  // };

  const canActivateAccount = () => {
    const formIsValid =
      validateNickname(nickname) === '' &&
      bankAccount &&
      address &&
      addressDetail &&
      postcode &&
      email &&
      !addressDetailError;

    return (
      formIsValid &&
      validateNickname(nickname) === '' &&
      validateBankAccount(bankAccount) === '' &&
      addressDetailError === '' &&
      nicknameSaved &&
      addressSaved &&
      accountSaved &&
      agreedToTerms
    );
  };

  // 계정 활성화 함수
  const activateAccount = async () => {
    if (!canActivateAccount()) return;

    const { accessToken: currentAccessToken } = useLoginStore.getState();
    console.log(`이전 토큰: ${currentAccessToken}`);

    try {
      const { accessToken } = useLoginStore.getState();

      const response = await axios.put(
        `${API_URL}/api/user/role`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);

      useLoginStore.getState().updateRole(response.data.data.role);
      useLoginStore
        .getState()
        .logIn(
          response.data.data.nickname,
          response.data.data.accessToken,
          response.data.data.userId,
        );

      const newAccessToken = useLoginStore.getState().accessToken;
      console.log(`바뀐 토큰: ${newAccessToken}`);

      alert('축하합니다! 이제 경매를 등록하고, 입찰할 수 있어요.');
      navigate('/');
    } catch (error) {
      console.error(error);
      // 활성화 실패에 대한 처리
    }
  };

  return (
    <div className="whitespace-nowrap max-w-screen-lg mx-auto">
      {/* 모달 */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal max-w-md bg-white p-4 rounded shadow-lg flex flex-col">
            <button
              type="button"
              className="text-deepblue1 self-end m-3"
              onClick={closeAddressModal}
            >
              <FaTimes size={20} />
            </button>
            {/* Daum Postcode 컴포넌트 */}
            <DaumPostcode autoClose={false} onComplete={handleSelectAddress} />
          </div>
        </div>
      )}
      {/* 프로필 정보 수정 섹션 */}
      <div className="w-full flex">
        <Sidebar />
        <div className="flex-1 text-xs justify-center mx-auto md:text-lg md:mx-12">
          <div>
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="w-32 h-32 rounded-full mx-auto my-4"
              />
            ) : (
              <img
                src={profileImg}
                alt="프로필 이미지"
                className="w-32 h-32 rounded-full mx-auto my-4 border-solid border-2 border-blue2"
              />
            )}
          </div>
          <div>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={e => handleNicknameChange(e.target.value)}
              placeholder="닉네임"
              className={`ml-3 mb-2 px-2 py-1 rounded border ${
                nicknameError ? 'border-red-500' : 'border-deepblue1'
              }`}
              data-te-input-showcounter="true"
              maxLength="12"
            />
            <button
              type="button"
              disabled={
                nickname === originalNickname ||
                nicknameError ||
                isUpdatingNickname
              }
              onClick={updateNickname}
              className={`ml-2 ${
                nickname === originalNickname ||
                nicknameError ||
                isUpdatingNickname
                  ? 'bg-gray-300'
                  : 'bg-deepblue2'
              } text-white px-2 py-1 rounded`}
            >
              {isUpdatingNickname ? '저장 중...' : '저장'}
            </button>
            {nicknameError && (
              <p className="text-red-500 text-xs">{nicknameError}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              placeholder="이메일"
              disabled
              className="ml-3 mb-2 px-2 py-1 rounded border border-deepblue1 bg-grayish"
            />
          </div>
          <div>
            <input
              type="text"
              id="postcode"
              value={postcode}
              readOnly
              onChange={e => handleAddressChange('postcode', e.target.value)}
              placeholder="우편번호"
              disabled
              className="ml-3 mb-2 px-2 py-1 rounded border border-deepblue1"
            />
          </div>
          <div>
            <input
              type="text"
              id="address"
              value={address}
              onChange={e => handleAddressChange('address', e.target.value)}
              readOnly
              placeholder="배송지"
              disabled
              className="ml-3 mb-2 px-2 py-1 rounded border border-deepblue1"
            />
            <button
              type="button"
              className="bg-deepblue2 text-white px-2 py-1 rounded ml-2"
              onClick={openAddressModal}
            >
              검색
            </button>
          </div>
          {/* 상세 주소 입력란 */}
          <div>
            <input
              type="text"
              id="addressDetail"
              value={addressDetail}
              onChange={e =>
                handleAddressChange('addressDetail', e.target.value)
              }
              placeholder="상세 주소 입력"
              className={`truncate flex-1 ml-3 mb-2 px-2 py-1 rounded border ${
                addressDetailError ? 'border-red-500' : 'border-deepblue1'
              }`}
            />
            <button
              type="button"
              disabled={
                !postcode ||
                !address ||
                !addressDetail ||
                (postcode === originalPostcode &&
                  address === originalAddress &&
                  addressDetail === originalAddressDetail) ||
                isUpdatingAddress
              }
              onClick={updateAddress}
              className={`ml-2 ${
                !postcode ||
                !address ||
                !addressDetail ||
                (postcode === originalPostcode &&
                  address === originalAddress &&
                  addressDetail === originalAddressDetail) ||
                isUpdatingAddress
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-deepblue2'
              } text-white px-2 py-1 rounded`}
            >
              {isUpdatingAddress ? '저장 중...' : '저장'}
            </button>
            {addressDetailError && (
              <p className="text-red-500 text-xs">{addressDetailError}</p>
            )}
          </div>
          {/* 계좌번호 및 은행 선택 드롭다운 */}
          <div>
            <select
              value={bankName}
              onChange={e =>
                handleBankAccountChange('bankName', e.target.value)
              }
              className="bg-grayish text-deepblue2 ml-3 px-2 py-1 rounded mr-2 mb-2 max-h-36 overflow-y-auto"
            >
              <option value="">은행 선택</option>
              {bankOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              id="bankAccount"
              value={bankAccount}
              onChange={e =>
                handleBankAccountChange('bankAccount', e.target.value)
              }
              placeholder="계좌번호"
              className={`flex-1 ml-3 px-2 py-1 rounded border mb-2 ${
                bankAccountError ? 'border-red-500' : 'border-deepblue1'
              }`}
            />
            <button
              type="button"
              onClick={updateAccountInfo}
              disabled={
                !bankAccount ||
                !bankName ||
                (bankAccount === originalBankAccount &&
                  bankName === originalBankName) ||
                isUpdatingAccount
              }
              className={`ml-2 ${
                !bankAccount ||
                !bankName ||
                (bankAccount === originalBankAccount &&
                  bankName === originalBankName) ||
                isUpdatingAccount
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-deepblue2'
              } text-white px-2 py-1 rounded`}
            >
              {isUpdatingAccount ? '저장 중...' : '저장'}
            </button>
            {bankAccountError && (
              <p className="text-red-500 text-xs mb-2 py-1">
                {bankAccountError}
              </p> // 에러 메시지 출력
            )}
          </div>
          {/* 가상 머니 충전 모달 */}
          {isChargeModalOpen && (
            <PaymentModal
              showModal={isChargeModalOpen}
              setShowModal={setIsChargeModalOpen}
              point={parseInt(virtualMoney, 10)}
              price={0}
            />
          )}

          {/* (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="modal max-w-md bg-white p-4 rounded shadow-lg flex flex-col">
                <button
                  type="button"
                  className="text-deepblue1 self-end m-3"
                  onClick={closeChargeModal}
                >
                  <FaTimes size={20} />
                </button>
                <input
                  type="number"
                  value={chargeAmount}
                  onChange={e => setChargeAmount(e.target.value)}
                  placeholder="충전 금액 입력"
                  className="mb-4 px-2 py-1 bg-grayish rounded border border-deepblue1 w-full"
                />
                <button
                  type="button"
                  onClick={handleCharge}
                  className="bg-deepblue2 text-white px-4 py-2 rounded w-full"
                >
                  충전하기
                </button>
              </div>
            </div>
          )} */}
          <div>
            <input
              type="text"
              id="virtualMoney"
              value={virtualMoney}
              readOnly
              className="border border-deepblue1 text-gray-500 px-2 py-1 ml-3 mb-2 rounded"
            />
            <button
              type="button"
              onClick={openChargeModal}
              className="bg-deepblue2 text-white px-2 py-1 ml-2 rounded"
            >
              충전
            </button>
          </div>
          <div className="mb-4">
            <div className="terms-agreement overflow-y-auto h-40 mx-3 p-2 border border-grayish rounded">
              <p className="text-xs text-left whitespace-normal">
                <strong>약관 동의서</strong>
                <br />
                <br />
                본 쇼핑몰의 이용자는 아래의 약관 내용에 동의한 것으로
                간주합니다.
                <br />
                모든 제품의 주문과 환불은 쇼핑몰의 정책에 따라 진행됩니다.
                <br />
                개인정보는 보안을 위해 최선을 다해 보호됩니다. 단, 경매 낙찰 시
                판매자는 상품 배송을 위해 구매자의 주소 정보를 제공받게 됩니다.
                <br />
                본 약관에 동의하고 계정을 활성화하면, 경매 입찰 및 상품 등록
                기능을 이용할 수 있습니다.
                <br />
                본 약관은 사전 통보 없이 변경될 수 있으며, 변경된 약관은 쇼핑몰
                사이트에 공지됩니다.
                <br />
                문제 발생 시, 본 약관 및 관련 법률에 따라 처리됩니다.
              </p>
            </div>
            <label
              htmlFor="termsCheckbox"
              className="block text-left mt-2 mx-4"
            >
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={agreedToTerms}
                onChange={toggleTermsAgreement}
                disabled={isUserRole}
                className="mr-2"
              />
              약관에 동의합니다
            </label>
          </div>
          <div className="mb-4">
            <TERipple rippleColor="light" rippleCentered>
              <button
                type="submit"
                disabled={!canActivateAccount() || isUserRole}
                onClick={activateAccount}
                className={`bg-deepblue2 text-white px-4 py-2 ml-3 rounded ${
                  !canActivateAccount() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUserRole ? '약관 동의 완료' : '계정 활성화'}
              </button>
            </TERipple>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
