import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useLoginStore from '../stores/loginStore';

function PaySuccessPage() {
  const API_URL = import.meta.env.VITE_APP_URL;
  const token = useLoginStore().accessToken;
  const { result } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pgToken = queryParams.get('pg_token');

  // 5초 후에 원래 페이지로 돌아가기

  useEffect(() => {
    if (!pgToken) {
      setTimeout(() => {
        navigate(-1);
      }, 5 * 1000);
    } else {
      axios
        .get(`${API_URL}/api/payment/success?pg_token=${pgToken}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            navigate(-1);
          }, 5 * 1000);
        });
    }
  }, []);

  if (result === 'cancel') {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex-col">
          <p className="text-3xl font-bold text-center mb-2 text-danger">
            결제 취소
          </p>
          <p className="text-lg">(5초 후 원래 페이지로 돌아갑니다)</p>
        </div>
      </div>
    );
  }

  if (result === 'fail') {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex-col">
          <p className="text-3xl font-bold text-center mb-2 text-danger">
            결제 실패
          </p>
          <p className="text-lg">(5초 후 원래 페이지로 돌아갑니다)</p>
        </div>
      </div>
    );
  }

  if (result === 'success') {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex-col">
          <p className="text-3xl font-bold text-center mb-2 text-deepblue1">
            결제 성공
          </p>
          <p className="text-lg">(5초 후 원래 페이지로 돌아갑니다)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="flex-col">
        <p className="text-3xl font-bold text-center mb-2 text-deepblue1">
          권한이 없습니다.
        </p>
        <p className="text-lg">(5초 후 원래 페이지로 돌아갑니다)</p>
      </div>
    </div>
  );
}

export default PaySuccessPage;
