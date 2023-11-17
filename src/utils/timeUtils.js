import dayjs from 'dayjs';

// 경매 시작한 지 5분 지났는 지 확인하는 함수
export function isWithinFiveMinute(birthTime) {
  const now = dayjs();
  const startTime = dayjs(birthTime);
  const difference = now.diff(startTime, 'second');

  if (difference <= 300) {
    return true;
  }
  return false;
}

// 경매 끝났는 지 확인하는 함수
export function isAuctionEnd(endTime) {
  const now = dayjs();
  const end = dayjs(endTime);
  const difference = end.diff(now, 'second');
  if (difference < 0) {
    return true;
  }
  return false;
}

// 남은 시간을 확인하는 함수
export function calculateRemainTime(endTime) {
  const end = dayjs(endTime);
  const remain = end.diff(dayjs(), 'second');
  if (remain < 0) {
    return '00:00:00';
  }
  const hours = Math.floor(remain / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((remain % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(remain % 60)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
