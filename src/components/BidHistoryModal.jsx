import React from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';
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

export default function BidHistoryModal({
  showModal,
  setShowModal,
  auctionId,
}) {
  console.log(auctionId);
  const labels = [
    '2023-10-20 13:35:10',
    '2023-10-20 13:36:10',
    '2023-10-20 13:38:10',
    '2023-10-20 13:39:10',
    '2023-10-20 13:40:10',
    '2023-10-20 13:55:10',
    '2023-10-20 13:56:10',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '경매가',
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: [10000, 12000, 13000, 14000, 19000, 21000, 23000],
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
    <TEModal show={showModal} setShow={setShowModal} scrollable>
      <TEModalDialog centered size="lg">
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              입찰내역
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody>
            <div className="flex flex-row">
              <div className="basis-1/2">
                <Line options={options} data={data} />
              </div>

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
                            <td className="whitespace-nowrap px-6 py-4">
                              Mark
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Otto
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @mdo
                            </td>
                          </tr>
                          <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Jacob
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Thornton
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @fat
                            </td>
                          </tr>
                          <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Jacob
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Thornton
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @fat
                            </td>
                          </tr>
                          <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Jacob
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Thornton
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @fat
                            </td>
                          </tr>
                          <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Jacob
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Thornton
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @fat
                            </td>
                          </tr>
                          <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Jacob
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Thornton
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @fat
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TEModalBody>
          <TEModalFooter className="flex justify-center">
            <TERipple rippleColor="light" rippleCentered>
              <button
                type="button"
                className="inline-block rounded-full bg-deepblue1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                입찰하기
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

BidHistoryModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  auctionId: PropTypes.string.isRequired,
};
