import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchBidHistory } from '../queries/auctionQueries';

export default function BidHistory({ auctionId }) {
  const bidHistory = useQuery({
    queryKey: ['bidHistoryData', auctionId],
    queryFn: async () => fetchBidHistory(auctionId),
    staleTime: 10 * 1000,
  });

  if (bidHistory.data) {
    return (
      <div className="flex flex-row space-x-5 h-96">
        <div className="flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full max-h-screen overflow-y-auto py-2 sm:px-6 lg:px-8">
              <div className="overflow-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        번호
                      </th>
                      <th scope="col" className="px-6 py-4">
                        일자
                      </th>
                      <th scope="col" className="px-6 py-4">
                        입찰자
                      </th>
                      <th scope="col" className="px-6 py-4">
                        입찰금액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidHistory.data.data.bids.length === 0 && (
                      <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                        <td
                          colSpan={4}
                          className="whitespace-nowrap px-6 py-4 font-medium text-center"
                        >
                          입찰 내역이 없습니다.
                        </td>
                      </tr>
                    )}
                    {bidHistory.data.data.bids.map((bid, index) => (
                      <tr
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        key={bid.bidId}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {bid.bidTime}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {bid.bidderNickname.slice(0, 2) + '*'.repeat(4)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {bid.bidPrice.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (bidHistory.error) {
    return <div>{bidHistory.error.message}</div>;
  }
  return <div>로딩중</div>;
}

BidHistory.propTypes = {
  auctionId: PropTypes.string.isRequired,
};
