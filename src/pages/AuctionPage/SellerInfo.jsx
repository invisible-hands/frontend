import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { TERipple } from 'tw-elements-react';
import { fetchSellerInfo } from '../../queries/auctionQueries';
import { calculateRemainTime } from '../../utils/timeUtils';

export default function SellerInfo({ auctionId }) {
  const { status, data, error } = useQuery({
    queryKey: ['sellerInfo', auctionId],
    queryFn: () => fetchSellerInfo(auctionId),
  });

  if (data) {
    return (
      <>
        {/* <!-- 판매자 프로필 --> */}
        <h3 className="text-2xl font-extrabold mb-4 text-deepblue2">
          판매자 정보
        </h3>
        <div className="flex mb-4">
          <div>
            <img
              src={data.data.profileImage}
              className="mx-auto mb-4 w-32 rounded-full"
              alt="판매자프로필"
            />
          </div>
          <div className="flex flex-col justify-center ml-2">
            <p className="mb-2 text-xl font-medium leading-tight">
              {data.data.nickname}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              상품 {data.data.auctionCnt}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex justify-end mt-2">
          <a
            href={`/seller/${auctionId}`}
            className="cursor-pointer text-sm"
          >{`${data.data.nickname}님의 판매 기록보기 >`}</a>
          {/* 판매자 목록을 확인할 수 있는 경로로 이동하기 */}
        </div>
        <div className="flex my-8 space-x-2">
          {data.data.auctionList
            .filter(
              auction =>
                auction.auctionId !== Number(auctionId) &&
                auction.auctionStatus === 'AUCTION_PROGRESS',
            )
            .filter((auction, index) => index < 3)
            .map(auction => {
              return (
                <div
                  className="inline-block rounded-lg bg-whitish shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-blacktish-700"
                  key={auction.auctionId}
                >
                  <TERipple>
                    <div className="relative w-72 h-72 overflow-hidden">
                      <img
                        src={auction.imageUrl}
                        alt="Description"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="w-72 p-6">
                      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {auction.title.length < 14
                          ? auction.title
                          : auction.title.substring(0, 13).concat('...')}
                      </h5>
                      <p className="flex justify-between mb-4 text-xs text-neutral-600 dark:text-neutral-200">
                        <span>{auction.currentPrice} 원</span>
                        <span>
                          남은 경매 시간{' '}
                          {calculateRemainTime(auction.endAuctionTime)}
                        </span>
                      </p>
                      <a href={`/auction/${auction.auctionId}`}>
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
                      </a>
                    </div>
                  </TERipple>
                </div>
              );
            })}
        </div>

        {data.data.auctionList
          .filter(
            auction =>
              auction.auctionId !== Number(auctionId) &&
              auction.auctionStatus === 'AUCTION_PROGRESS',
          )
          .filter((auction, index) => index < 3).length === 0 && (
          <div className="flex justify-center items-center h-32">
            {data.data.nickname}님의 진행중인 다른 경매가 없습니다
          </div>
        )}
      </>
    );
  }
  if (status === 'pending') return <div>{}</div>;
  if (status === 'error') return <div>{error.message}</div>;
}

SellerInfo.propTypes = {
  auctionId: PropTypes.string,
};
