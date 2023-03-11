interface Time {
  hour: number;
  minute: number;
}

export type NotificationSetting =
  | WeeklyNotificationSetting
  | DailyNotificationSetting;

export interface WeeklyNotificationSetting {
  type: 'weekly';
  dayOfWeek: DayOfWeek;
  time: Time;
}

export interface DailyNotificationSetting {
  type: 'daily';
  time: Time;
}

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

const READABLE_DAY_OF_WEEK_MAP: Record<DayOfWeek, string> = {
  SUN: 'Sunday',
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
};

export const toReadableDayOfWeek = (dayOfWeek: DayOfWeek): string =>
  READABLE_DAY_OF_WEEK_MAP[dayOfWeek];

const READABLE_NOTIFICATION_SETTING_TYPE_MAP: Record<
  NotificationSetting['type'],
  string
> = {
  weekly: '매주',
  daily: '매일',
};

export const toReadableNotificationSettingType = (
  notificationSetting: NotificationSetting,
): string => READABLE_NOTIFICATION_SETTING_TYPE_MAP[notificationSetting.type];

export const toReadableTime = (time: Time): string => {
  const timeString = [
    `${time.hour}시`,
    time.minute > 0 ? `${time.minute}분` : undefined,
  ].join(' ');
  return `${time.hour < 12 ? '오전' : '오후'} ${timeString}`;
};
