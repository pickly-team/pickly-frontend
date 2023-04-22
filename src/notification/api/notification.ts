interface Time {
  hour: number;
  minute: number;
}

export type NotificationSetting = {
  time: Time;
};

export const toReadableTime = (time: Time): string => {
  const isAm = time.hour <= 12;
  const hour = (time.hour % 12).toString().padStart(2, '0');
  const minute = time.minute.toString().padStart(2, '0');

  return `${isAm ? '오전' : '오후'} ${hour}:${minute}`;
};
