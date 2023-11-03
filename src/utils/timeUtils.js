import dayjs from 'dayjs';

// 시간 계산해주는 코드 2023-11-01 17:41:10
// 시간 관련된 코드 중에서 필요한 함수를 정리해보자.
// 1. 경매가 종료되었는지 여부를 확인하는 함수 return true/false
// 2. 경매가 생성된 지 5분이 되었는 지 여부를 확인할 수 있는 함수 return true/false
// 3. 경매가 종료되기까지 남은 시간을 계산해주는 함수 return 00:00:00

export function isWithinFiveMinute(birthTime) {
  const now = dayjs();
  const startTime = dayjs(birthTime);
  const difference = now.diff(startTime, 'second');

  console.log(difference);
  if (difference <= 300) {
    return true;
  }
  return false;
}
export function formatTime(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration / 3600) % 60);
  const seconds = Math.floor(duration % 60);

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function isAuctionEnd(endTime) {
  const now = dayjs();
  const end = dayjs(endTime);
  const difference = end.diff(now, 'second');
  if (difference < 0) {
    return true;
  }
  return false;
}

export function calculateRemainTime(startTime, duration) {
  const now = dayjs();
  const end = dayjs(startTime).add(duration, 'hour');
  const difference = end.diff(now, 'second');
  if (difference < 0) {
    return '00:00:00';
  }

  return formatTime(difference);
}
