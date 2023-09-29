import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export const millToString = (time: number) => {
  let curSec = time;
  const h = Math.floor(curSec / 3600);
  curSec -= h * 3600;

  const m = Math.floor(curSec / 60);
  curSec -= m * 60;

  const s = Math.floor(curSec);
  const hS = h ? `${h.toString()}:` : '';
  const mS = `${h > 0 ? m.toString().padStart(2, '0') : m}:`;
  const sS = `${s.toString().padStart(2, '0')}`;

  return `${hS}${mS}${sS}`;
};

export const stringToMill = (time: string) => {
  let milliseconds;
  if (time.split(':').length === 2) {
    /* For MM:SS */
    milliseconds =
      Number(time.split(':')[0]) * 60000 + Number(time.split(':')[1]) * 1000;
  } else if (time.split(':').length === 3) {
    /* For HH:MM:SS */
    milliseconds =
      Number(time.split(':')[0]) * 3600000 +
      Number(time.split(':')[1]) * 60000 +
      Number(time.split(':')[2]) * 1000;
  } else if (time.split(':').length === 4) {
    /* For DD:HH:MM:SS */
    milliseconds =
      Number(time.split(':')[0]) * 86400000 +
      Number(time.split(':')[1]) * 3600000 +
      Number(time.split(':')[2]) * 60000 +
      Number(time.split(':')[3]) * 1000;
  }
  return milliseconds;
};

export const timeStampToDate = (timeStamp: number) => {
  // 서버에서 10자리 timestamp 로 내려옴 (second, in GMT == UTC)
  const diff = (Math.ceil(dayjs().unix()) - timeStamp) * 1000;

  // 30

  // 1분 미만
  if (diff < 60 * 1000) return '방금 전';
  // 1시간 미만
  if (diff >= 60 * 1000 && diff < 60 * 60 * 1000)
    return `${Math.floor(diff / (60 * 1000))}분 전`;
  // 24시간 미만
  if (diff >= 60 * 60 * 1000 && diff < 24 * 60 * 60 * 1000)
    return `${Math.floor(diff / (360 * 10000))}시간 전`;
  // 8일 미만
  if (diff >= 24 * 60 * 60 * 1000 && diff < 24 * 60 * 60 * 8 * 1000)
    return `${Math.floor(diff / (86400 * 1000))}일 전`;
  // 30일 미만
  if (diff >= 24 * 60 * 60 * 8 * 1000 && diff < 24 * 60 * 60 * 30 * 1000)
    return `${Math.floor(diff / (86400 * 1000 * 7))}주 전`;
  // 30일 이상
  if (diff >= 24 * 60 * 60 * 30 * 1000)
    return `${Math.floor(diff / (86400 * 1000 * 30))}달 전`;

  return '';
};
