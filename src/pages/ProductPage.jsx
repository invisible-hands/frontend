import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
import PaymentConfirmModal from '../components/PaymentConfirmModal';
import PaymentModal from '../components/PaymentModal';

export default function ProductPage() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const testPoint = {
    currentPoint: 2000,
    pricePoint: 20000,
  };
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => setShowConfirmModal(true)}
        >
          즉시결제
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <PaymentConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        setShowPayModal={setShowPayModal}
        point={testPoint}
        productName="PS4랑 CD개"
      />
      <PaymentModal showModal={showPayModal} setShowModal={setShowPayModal} />
    </div>
  );
}
