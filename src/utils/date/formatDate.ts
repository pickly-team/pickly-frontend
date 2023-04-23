function formatDate(start: Date, end: Date) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const betweenMinutes = getBetweenMinutes(startDate, endDate);
  if (betweenMinutes < 1) return '방금전';
  if (betweenMinutes < 60) {
    return `${betweenMinutes}분전`;
  }

  const betweenHours = getBetweenHours(startDate, endDate);
  if (betweenHours < 24) {
    return `${betweenHours}시간전`;
  }

  const betweenDays = getBetweenDays(startDate, endDate);
  if (betweenDays < 365) {
    return `${betweenDays}일전`;
  }

  const betweenYears = getBetweenYears(startDate, endDate);
  return `${betweenYears}년전`;
}

export default formatDate;

function getBetweenMinutes(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
}

function getBetweenHours(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60);
}

function getBetweenDays(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24);
}

function getBetweenYears(start: Date, end: Date) {
  return Math.floor(
    (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24 / 365,
  );
}
