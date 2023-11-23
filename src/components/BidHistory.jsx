import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import {
  fetchBidHistory,
  fetchBidsTime,
  fetchBidsPrice,
} from '../queries/auctionQueries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// export const useBidsQuery = (auctionId, select) => {
//   useQuery({
//     queryKey: ['bidHistoryData', auctionId],
//     queryFn: fetchBidHistory(auctionId),
//     select,
//   });
// };

// export const useBidsPrice = auctionId =>
//   useBidsQuery(auctionId, data => data.data.bids.map(bid => bid.bidPrice));

// export const useBidsTime = auctionId =>
//   useBidsQuery(auctionId, data => data.data.bids.map(bid => bid.bidTime));

export default function BidHistory({ auctionId }) {
  const { status, error, data } = useQuery({
    queryKey: ['bidHistoryData', auctionId],
    queryFn: async () => fetchBidHistory(auctionId),
  });

  const bidLabels = useQuery({
    queryKey: ['bidTimeData', auctionId],
    queryFn: async () => fetchBidsTime(auctionId),
  });

  const bidPrices = useQuery({
    queryKey: ['bidPriceData', auctionId],
    queryFn: async () => fetchBidsPrice(auctionId),
  });

  if (status === 'success') {
    console.log(data.data.bids);
  }

  // const labels = [
  //   '2023-10-20 13:35:10',
  //   '2023-10-20 13:36:10',
  //   '2023-10-20 13:38:10',
  //   '2023-10-20 13:39:10',
  //   '2023-10-20 13:40:10',
  //   '2023-10-20 13:55:10',
  //   '2023-10-20 13:56:10',
  // ];

  const chartData = {
    lables: bidLabels.data,
    datasets: [
      {
        label: '경매가',
        chartData: bidPrices.data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };
  if (status === 'pending') return <div>로딩중</div>;
  if (status === 'error') return <div>{error.message}</div>;

  return (
    <div className="flex flex-row space-x-5 h-96">
      {/* bid chart */}
      <div className="flex-1">
        <Line options={options} data={chartData} />
      </div>
      {/* bid table */}
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
                  {data.data.bids.map((bid, index) => (
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
                        {bid.bidPrice}
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

BidHistory.propTypes = {
  auctionId: PropTypes.string.isRequired,
};
