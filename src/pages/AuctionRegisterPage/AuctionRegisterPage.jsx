import React, { useEffect, useRef, useState } from 'react';
import { TERipple } from 'tw-elements-react';
// import { useMutation } from '@tanstack/react-query';
// import { createAuction } from '../../queries/auctionQueries';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/loginStore';

export default function AuctionRegisterPage() {
  const { accessToken: token } = useLoginStore();
  const API_URL = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [otherData, setOtherData] = useState({
    title: '',
    content: '',
    itemCondition: '',
    startPrice: '',
    instantPrice: '',
    duration: 'QUARTER',
    tags: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = e => {
    setOtherData({
      ...otherData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtherElementClick = () => {
    fileInputRef.current.click();
  };

  const handleFilesChange = e => {
    const fileList = e.target.files;
    if (fileList !== null) {
      setFiles(fileList);
    }
  };

  const createAuction = (imageFiles, data, accessToken) => {
    const dataSet = { ...data, tags: data.tags.trim().split(' ') };

    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i += 1) {
      formData.append('images', imageFiles[i]);
    }

    formData.append(
      'request',
      new Blob([JSON.stringify(dataSet)], { type: 'application/json' }),
    );

    axios
      .post(`${API_URL}/auction`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.status, res.data);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    createAuction(files, otherData, token);
  };

  useEffect(() => {
    const { title, content, itemCondition, startPrice, instantPrice } =
      otherData;
    const isAnyFieldEmpty =
      !title || !content || !itemCondition || !startPrice || !instantPrice;

    // 버튼을 활성화 또는 비활성화합니다.
    setIsButtonDisabled(isAnyFieldEmpty || !isAgreed);
  }, [otherData]);

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-full p-6 lg:w-[1024px]">
          <h1 className="text-4xl font-extrabold mb-4 text-deepblue2">
            상품 등록하기
          </h1>
          <div className="flex flex-row space-x-5">
            {/* <!-- 상품이미지 --> */}
            <div className="w-96">
              <label>상품 이미지</label>
              <div className="relative w-96 h-96 overflow-hidden">
                <button
                  type="button"
                  className="flex w-full h-full justify-center items-center border-solid border-2"
                  onClick={handleOtherElementClick}
                >
                  파일 추가하기 +
                </button>
                <div
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/picsum/200/300)`,
                  }}
                  className="w-full h-full bg-center bg-cover duration-500 "
                />
              </div>
              <div>
                {/* <label
                  htmlFor="formFileMultiple"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Multiple files input example
                </label> */}
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  name="images"
                  accept="image/*"
                  id="formFileMultiple"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFilesChange}
                />
              </div>
            </div>

            {/* <!-- 상품정보 --> */}
            <div className="space-y-5">
              <div>
                <label>
                  상품명 <span>{otherData.title.length}/20</span>
                </label>
                <br />
                <input
                  name="title"
                  className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded"
                  value={otherData.title}
                  onChange={handleChange}
                  maxLength={20}
                />
              </div>
              <div>
                <label>
                  상품설명 <span>{otherData.content.length}/150</span>
                </label>
                <br />
                <textarea
                  name="content"
                  className="w-full bg-deepblue1 text-white h-16 mb-2 px-2 py-1 rounded resize-none  overflow-auto"
                  value={otherData.content}
                  onChange={handleChange}
                  maxLength={150}
                />
              </div>
              <div className="flex flex-row space-x-10">
                <div className="flex-1">
                  <label>경매시작가</label>
                  <br />
                  <input
                    name="startPrice"
                    className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded"
                    value={otherData.startPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label>즉시거래가</label>
                  <br />
                  <input
                    name="instantPrice"
                    className="w-full bg-deepblue1 text-white mb-2 px-2 py-1 rounded"
                    value={otherData.instantPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-10">
                <div className="flex-1">
                  <span>경매 시간 선택</span>
                  <div className="w-full">
                    <div className="relative mb-3">
                      <select
                        name="duration"
                        className="w-full"
                        value={otherData.duration}
                        onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                        새상품
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="tags">태그</label>
                <br />
                <textarea
                  id="tags"
                  name="tags"
                  className="w-full bg-deepblue1 rounded text-white mb-2 px-2 py-1 resize-none"
                  onChange={handleChange}
                />
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
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-5">
            <TERipple rippleColor="white">
              <button
                type="button"
                className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                입찰 안하기
              </button>
            </TERipple>
            <TERipple rippleColor="white">
              <button
                type="submit"
                className={`inline-block rounded ${
                  isButtonDisabled
                    ? `bg-danger hover-bg-danger-300`
                    : `bg-deepblue1 hover:bg-deepblue2`
                } px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                disabled={isButtonDisabled}
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
