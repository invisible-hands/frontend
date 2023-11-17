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
import { fetchBidHistory } from '../queries/auctionQueries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// 가로선 - 시간의 흐름을 보여주자

export default function BidHistory({ auctionId }) {
  const { status, error, data } = useQuery({
    queryKey: ['bidHistoryData', auctionId],
    queryFn: async () => fetchBidHistory(auctionId),
  });

  // const [labels, setLabels] = useState([]);
  // const [chartData, setChartData] = useState([]);

  if (status === 'pending') return <div>로딩중</div>;
  if (status === 'error') return <div>{error.message}</div>;
  if (status === 'success') {
    console.log(data);
    // setLabels(data.data.bids.map(bid => bid.))
  }

  const labels = [
    '2023-10-20 13:35:10',
    '2023-10-20 13:36:10',
    '2023-10-20 13:38:10',
    '2023-10-20 13:39:10',
    '2023-10-20 13:40:10',
    '2023-10-20 13:55:10',
    '2023-10-20 13:56:10',
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: '경매가',
        // chartData: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        chartData: [10000, 12000, 13000, 14000, 19000, 21000, 23000],
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

  return (
    <div className="flex flex-row">
      {/* bid chart */}
      <div className="basis-1/2">
        <Line options={options} data={chartData} />
      </div>
      {/* bid table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full max-h-screen overflow-y-auto py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
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
                  <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      1
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Mark</td>
                    <td className="whitespace-nowrap px-6 py-4">Otto</td>
                    <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
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
