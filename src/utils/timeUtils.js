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

// 포맷을 변경해주는 함수
export function formatTime(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration / 3600) % 60);
  const seconds = Math.floor(duration % 60);

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
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
// 없으면 00:00:00을 반환, 남으면 12:34:56 형식으로 반환
export function calculateRemainTime(startTime, duration) {
  const now = dayjs();
  const end = dayjs(startTime).add(duration, 'hour');
  const difference = end.diff(now, 'second');
  if (difference < 0) {
    return '00:00:00';
  }

  return formatTime(difference);
}
