import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '@/common/service/client';
import useToast from '@/common-ui/Toast/hooks/useToast';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

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

// 알림 내역 조회
export interface NotificationItem {
  id: number;
  title: string;
  content: string;
  bookmarkId: number;
  isChecked: boolean;
  createdAt: number;
}

interface GETNotificationQuery {
  memberId: number;
  token?: string;
}

const getNotificationListAPI = async ({
  memberId,
  token,
}: GETNotificationQuery) => {
  const { data } = await client<NotificationItem[]>({
    method: 'get',
    url: `/members/${memberId}/notifications`,
    params: { memberId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data.map((item) => ({
    ...item,
    createdAt: dayjs(item.createdAt).unix() * 1000,
  }));
};

export interface GetAPIRequest {
  memberId: number;
  token?: string;
}

const GET_NOTIFICATION_LIST_KEY = (params: GetAPIRequest) => [
  'GET_NOTIFICATION_LIST',
  params.memberId,
];

export const useGETNotificationListQuery = (params: GetAPIRequest) => {
  return useQuery(GET_NOTIFICATION_LIST_KEY(params), async () =>
    getNotificationListAPI(params),
  );
};

interface PATCHNotificationReadRequest {
  notificationId: number;
  token?: string;
}

const patchNotificationReadAPI = async ({
  notificationId,
  token,
}: PATCHNotificationReadRequest) => {
  const { data } = await client({
    method: 'patch',
    url: `/notifications/${notificationId}`,
    params: { notificationId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PATCHNotificationReadQueryRequest {
  memberId: number;
}
export const usePATCHNotificationReadQuery = ({
  memberId,
}: PATCHNotificationReadQueryRequest) => {
  const queryClient = useQueryClient();
  return useMutation(patchNotificationReadAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(GET_NOTIFICATION_LIST_KEY({ memberId }));
    },
  });
};

interface DELETENotificationRequest {
  notificationId: number;
  token?: string;
}

const deleteNotificationAPI = async ({
  notificationId,
  token,
}: DELETENotificationRequest) => {
  const { data } = await client({
    method: 'delete',
    url: `/notifications/${notificationId}`,
    params: { notificationId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DELETENotificationQueryRequest {
  memberId: number;
  token?: string;
}
export const useDELETENotificationQuery = ({
  memberId,
}: DELETENotificationQueryRequest) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(deleteNotificationAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(GET_NOTIFICATION_LIST_KEY({ memberId }));
      toast.fireToast({
        message: '삭제 되었습니다',
        mode: 'DELETE',
      });
    },
  });
};
