import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
// import { useMutation } from '@tanstack/react-query';
import { createAuction } from '../../queries/auctionQueries';

export default function AuctionRegisterPage() {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc4LCJlbWFpbCI6Ik1lbGFueUBuYXZlci5jb20iLCJ1c2VybmFtZSI6Ik1lbGFueSIsIm5pY2tuYW1lIjoiTWVsYW55KDEyMykiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMDEyNjE2NiwiZXhwIjoxNzAwMjEyNTY2fQ.hkyLYNV3nRs0qnuO2U1A8EMC_ayWvz60hAU5JSYVeN4';
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

  const handleChange = e => {
    setOtherData({
      ...otherData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilesChange = e => {
    const fileList = e.target.files;
    if (fileList !== null) {
      setFiles(fileList);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const res = createAuction(files, otherData, token);
      if (res.status === 200) {
        alert(res.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        // onSubmit={event => {
        //   event.preventDefault();
        //   addMutation.mutate(files, otherData, tags, token);
        // }}
        onSubmit={handleSubmit}
      >
        <div className="w-full lg:w-[1024px]">
          <div className="flex flex-row ">
            {/* <!-- 상품이미지 --> */}
            <div className="w-72">
              <label>상품 이미지</label>
              <div className="relative w-72 h-72 overflow-hidden">
                <div className="flex w-full h-full justify-center items-center border-solid border-2">
                  파일 추가하기 +
                </div>
                <div
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/picsum/200/300)`,
                  }}
                  className="w-full h-full bg-center bg-cover duration-500 "
                />
              </div>
              <div>
                <label
                  htmlFor="formFileMultiple"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Multiple files input example
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  name="images"
                  accept="image/*"
                  id="formFileMultiple"
                  multiple
                  onChange={handleFilesChange}
                />
              </div>
            </div>

            {/* <!-- 상품정보 --> */}
            <div>
              <label>상품명</label>
              <input
                name="title"
                value={otherData.title}
                onChange={handleChange}
              />
              <label>상품설명</label>
              <input
                name="content"
                value={otherData.content}
                onChange={handleChange}
              />
              <div>
                <label>경매시작가</label>
                <input
                  name="startPrice"
                  value={otherData.startPrice}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>즉시거래가</label>
                <input
                  name="instantPrice"
                  value={otherData.instantPrice}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>경매 시간 선택</span>
                <div className="flex justify-center">
                  <div className="relative mb-3 md:w-96">
                    <select
                      name="duration"
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
              <div>
                <span>상품 상태</span>
                <div className="flex justify-center">
                  {
                    // First radio
                  }
                  <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <label
                      className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="inlineRadio1"
                    >
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
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
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
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
              <div>
                <label htmlFor="tags">태그</label>
                <textarea id="tags" name="tags" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div>
            <h2>약관</h2>
            <p>약관 내용</p>
          </div>
          <div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="checkboxDefault"
              >
                위 주의 사항에 동의하십니까?
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="checkboxDefault"
                />
              </label>
            </div>
          </div>
          <div>
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
                className="inline-block rounded bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-deepblue2 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
