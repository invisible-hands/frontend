import React, { useEffect, useRef, useState } from 'react';
import { TERipple } from 'tw-elements-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import useLoginStore from '../../stores/loginStore';

export default function AuctionRegisterPage() {
  const { accessToken: token } = useLoginStore();
  const API_URL = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [instantPrice, setInstantPrice] = useState('');
  const [duration, setDuration] = useState('QUARTER');
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const startPriceInputRef = useRef(null);
  const instantPriceInputRef = useRef(null);
  const itemConditionInputRef = useRef(null);
  const agreedToTermsInputRef = useRef(null);

  // 이미지 업로드 관련 코드
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 5,
    maxSize: 1024 * 1024 * 2,

    onDrop: acceptedFiles => {
      const totalFiles = files.length + acceptedFiles.length;
      if (totalFiles <= 5) {
        // 총 파일 개수가 5개 이하인 경우에만 파일 추가
        const newFiles = acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
      } else {
        // 여기에 파일 개수 초과에 대한 사용자 피드백을 제공할 수 있습니다.
        alert('최대 5개의 파일만 업로드할 수 있습니다.');
      }
    },
    onDropRejected: () => {
      alert('파일 사이즈는 개당 2MB 이하로 가능합니다.');
    },
  });

  // 이미지 제거 함수
  const removeFile = fileName => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const thumbs = files.map(file => (
    <div
      className="relative inline-flex rounded border border-gray-200 mb-2 mr-2 w-24 h-24 p-1 box-border"
      key={file.name}
    >
      <div
        className="absolute top-0 right-0 bg-white rounded-full cursor-pointer"
        role="button"
        onClick={() => removeFile(file.name)}
      >
        <svg
          className="w-4 h-4 m-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full"
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  // 이미지 업로드 관련 코드 끝

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleStartPriceChange = e => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, '');
    setStartPrice(filteredValue);
  };

  const handleInstantPriceChange = e => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, '');
    setInstantPrice(filteredValue);
  };

  const createAuction = (imageFiles, data, accessToken) => {
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i += 1) {
      formData.append('images', imageFiles[i]);
    }

    formData.append(
      'request',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );
    setLoading(true);

    axios
      .post(`${API_URL}/api/auction`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.status === 200) {
          alert('상품이 등록되었습니다.');
          navigate('/profile/shopping/selling');
        } else {
          alert(`상품 등록에 실패했습니다. 이유: ${res.data.message}`);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (files.length === 0) {
      alert('파일을 첨부해주세요');
      fileInputRef.current.focus();
      return;
    }

    if (title.trim().length === 0) {
      alert('상품명을 입력해주세요');
      titleInputRef.current.focus();
      return;
    }
    if (content.trim().length === 0) {
      alert('상품 설명을 입력해주세요');
      contentInputRef.current.focus();
      return;
    }
    if (itemCondition === '') {
      alert('상품 상태를 선택해주세요');
      itemConditionInputRef.current.focus();
      return;
    }

    if (isAgreed === false) {
      alert('약관에 동의해주세요');
      agreedToTermsInputRef.current.focus();
      return;
    }

    if (parseInt(instantPrice, 10) < parseInt(startPrice, 10) + 1000) {
      alert('즉시거래가는 경매시작가 보다 최소 1000원 이상이어야 합니다.');
      instantPriceInputRef.current.focus();
      return;
    }

    const data = {
      title,
      content,
      itemCondition,
      startPrice,
      instantPrice,
      duration,
      tags: tagList,
    };
    createAuction(files, data, token);
  };
  const handleKeySubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 태그 관련 함수

  const submitTagItem = () => {
    const updatedTagList = [...tagList];
    if (updatedTagList.length >= 5) {
      alert('태그는 최대 5개까지만 가능합니다.');
      setTagItem('');
      return;
    }
    if (updatedTagList.includes(tagItem)) {
      alert('이미 추가된 태그입니다.');
      setTagItem('');
      return;
    }
    if (tagItem.trim().length === 0) {
      alert('빈 태그는 추가할 수 없습니다.');
      setTagItem('');
      return;
    }
    updatedTagList.push(tagItem);
    setTagItem('');
    setTagList(updatedTagList);
  };
  const deleteTagItem = tagToDelete => {
    const filteredTagList = tagList.filter(tag => tag !== tagToDelete);
    setTagList(filteredTagList);
  };
  const onKeyUp = e => {
    if (e.target.value.length !== 0 && e.code === 'Space') {
      e.preventDefault();
      submitTagItem();
    }
  };
  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} onKeyDown={handleKeySubmit}>
        <div className="w-full p-6 lg:w-[1024px]">
          <h1 className="text-4xl font-extrabold mb-4 text-deepblue2">
            상품 등록하기
          </h1>
          <div className="flex flex-row space-x-5">
            {/* <!-- 상품이미지 --> */}
            <div className="w-96">
              <label>{`상품 이미지 ${files.length}/5`}</label>
              {/* 이미지 업로드 */}
              <section className="container">
                <div
                  {...getRootProps({
                    className:
                      'dropzone border-dashed border-2 border-gray-300 p-4 flex justify-center items-center cursor-pointer w-full h-72',
                  })}
                >
                  <input {...getInputProps()} ref={fileInputRef} />
                  <p>+ 이미지 추가하기</p>
                </div>
                <aside className="flex flex-row flex-wrap mt-2">{thumbs}</aside>
              </section>
            </div>

            {/* <!-- 상품정보 --> */}
            <div className="space-y-4">
              <div>
                <label>
                  상품명 <span>{title.length}/20</span>
                </label>
                <br />
                <input
                  name="title"
                  className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded focus:outline-none focus:ring focus:ring-danger"
                  value={title}
                  onChange={handleTitleChange}
                  ref={titleInputRef}
                  maxLength={20}
                />
              </div>
              <div>
                <label>
                  상품설명 <span>{content.length}/150</span>
                </label>
                <br />
                <textarea
                  name="content"
                  className="w-full bg-deepblue1 text-white h-16 mb-2 px-2 py-1 rounded resize-none  overflow-auto focus:outline-none focus:ring focus:ring-danger"
                  value={content}
                  onChange={handleContentChange}
                  maxLength={150}
                  ref={contentInputRef}
                />
              </div>
              <div className="flex flex-row space-x-10">
                <div className="flex-1">
                  <label>경매시작가</label>
                  <br />
                  <input
                    type="text"
                    name="startPrice"
                    className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded focus:outline-none focus:ring focus:ring-danger"
                    value={startPrice}
                    onChange={handleStartPriceChange}
                    ref={startPriceInputRef}
                  />
                </div>
                <div className="flex-1">
                  <label>즉시거래가</label>
                  <br />
                  <input
                    type="text"
                    name="instantPrice"
                    className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded focus:outline-none focus:ring focus:ring-danger"
                    value={instantPrice}
                    onChange={handleInstantPriceChange}
                    ref={instantPriceInputRef}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-10">
                <div className="flex-1">
                  <span>경매 시간 선택(6/12/24)</span>
                  <div className="w-full">
                    <div className="relative mb-3">
                      <select
                        name="duration"
                        className="w-full border-blackish border-2"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                      >
                        <option value="QUARTER">6시간</option>
                        <option value="HALF">12시간</option>
                        <option value="DAY">24시간</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span>상품 상태</span>
                  <div className="flex justify-center text-xs">
                    {
                      // First radio
                    }
                    <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio1"
                      >
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-grayish before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-deepblue2 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-deepblue2 checked:after:bg-deepblue2 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-deepblue2 checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-deepblue2 dark:checked:after:border-deepblue2 dark:checked:after:bg-deepblue2 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-deepblue2 dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="itemCondition"
                          id="inlineRadio1"
                          value="OLD"
                          onChange={e => setItemCondition(e.target.value)}
                          ref={itemConditionInputRef}
                        />
                        중고상품
                      </label>
                    </div>
                    {
                      // Second radio
                    }
                    <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio2"
                      >
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-grayish before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-deepblue2 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-deepblue2 checked:after:bg-deepblue2 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-deepblue2 checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-deepblue2 dark:checked:after:border-deepblue2 dark:checked:after:bg-deepblue2 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-deepblue2 dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="itemCondition"
                          id="inlineRadio2"
                          value="NEW"
                          onChange={e => setItemCondition(e.target.value)}
                        />
                        새상품
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="tags">태그(최대 5개)</label>
                <br />
                <div>
                  <input
                    type="text"
                    className="w-full bg-deepblue1 rounded text-white mb-2 px-2 py-1"
                    placeholder="Press space to add tags"
                    onChange={e => setTagItem(e.target.value)}
                    value={tagItem}
                    onKeyUp={onKeyUp}
                  />
                  <div>
                    {tagList.map(tag => {
                      return (
                        <div
                          className="inline-block m-1 p-1 bg-blue1 rounded text-white text-sm"
                          key={tag}
                        >
                          {' '}
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => deleteTagItem(tag)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="terms-agreement overflow-y-auto h-40 mx-3 my-5 p-2 border border-grayish rounded">
            <p className="text-xs text-left whitespace-normal">
              <strong>약관</strong>
              <br />
              <br />
              상품 정보의 정확성: 판매자는 등록하는 상품의 설명, 사진, 가격 등이
              정확하고 사실에 기반한 것임을 보장합니다. 오류나 부정확한 정보
              제공으로 인한 모든 책임은 판매자에게 있습니다.
              <br />
              상품 등록 절차 준수: 판매자는 본 플랫폼의 상품 등록 절차와 규칙을
              준수할 것을 동의합니다.
              <br />
              지적 재산권 준수: 판매자는 등록하는 모든 상품이 제3자의 지적
              재산권을 침해하지 않음을 보장합니다.
              <br />
              결제 및 배송 조건: 판매자는 상품의 결제가 완료된 후 합의된 시간
              내에 상품을 배송할 책임이 있습니다.
              <br />
              취소 및 반품 정책: 판매자는 본 플랫폼의 취소 및 반품 정책을
              준수합니다. 이는 상품의 결함, 오배송 등의 경우에 적용될 수
              있습니다.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="checkboxDefault"
              >
                위 주의사항에 동의하십니까?
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  id="checkboxDefault"
                  ref={agreedToTermsInputRef}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-5">
            <TERipple rippleColor="white">
              <button
                type="button"
                className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => navigate(-1)}
              >
                등록 취소하기
              </button>
            </TERipple>
            <TERipple rippleColor="white">
              <button
                type="submit"
                className={`inline-block rounded bg-deepblue1 hover:bg-deepblue2
                   px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                disabled={loading}
              >
                상품 등록하기
              </button>
            </TERipple>
          </div>
        </div>
      </form>
    </div>
  );
}
