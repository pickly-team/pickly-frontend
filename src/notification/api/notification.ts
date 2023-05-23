import { useQuery, UseQueryResult } from '@tanstack/react-query';
import resolveAfterDelay from '@/utils/resolveAfterDelay';
import QUERY_KEYS from '@/constants/queryKeys';

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

interface Notification {
  id: string;
  title: string;
  createdAt: string;
  isRead: boolean;
}

const fetchNotifications = async (): Promise<Notification[]> => {
  //TODO: API 호출로 변경
  const mockData: Notification[] = [
    {
      id: '1',
      title:
        'React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.',
      createdAt: '2023-04-23 12:00:00',
      isRead: false,
    },
    {
      id: '2',
      title: 'React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.',
      createdAt: '2023-04-23 12:00:00',
      isRead: true,
    },
    {
      id: '3',
      title:
        'React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.',
      createdAt: '2023-04-23 12:00:00',
      isRead: true,
    },
  ];

  return resolveAfterDelay(mockData, 1000);
};

export const useGetNotifications = (): UseQueryResult<
  Notification[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: fetchNotifications,
    suspense: true,
  });
};
