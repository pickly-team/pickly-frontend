import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '@/common/service/client';
import useToast from '@/common-ui/Toast/hooks/useToast';
import qs from 'qs';
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

export type ClientNotificationItem = {
  isSelected: boolean;
} & NotificationItem;

interface GETNotificationQuery {
  memberId: number;
  token?: string;
}

const getNotificationListAPI = async ({
  memberId,
  token,
}: GETNotificationQuery): Promise<ClientNotificationItem[]> => {
  const { data } = await client<NotificationItem[]>({
    method: 'get',
    url: `/members/${memberId}/notifications`,
    params: { memberId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data.map((item) => ({
    ...item,
    isSelected: false,
    createdAt: dayjs(item.createdAt).unix() * 1000,
  }));
};

export interface GetAPIRequest {
  memberId: number;
  token?: string;
}

export const GET_NOTIFICATION_LIST_KEY = (params: GetAPIRequest) => [
  'GET_NOTIFICATION_LIST',
  params.memberId,
];

export const useGETNotificationListQuery = (params: GetAPIRequest) => {
  return useQuery(
    GET_NOTIFICATION_LIST_KEY(params),
    async () => getNotificationListAPI(params),
    {
      enabled: params.memberId !== 0,
      cacheTime: 10 * 60 * 1000,
      staleTime: 10 * 60 * 1000,
    },
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
  notificationIds: string[];
  memberId: number;
}

const deleteNotificationAPI = async ({
  memberId,
  notificationIds,
}: DELETENotificationRequest) => {
  const { data } = await client({
    method: 'delete',
    url: `/members/${memberId}/notifications/selected`,
    params: { notificationIds },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return data;
};

export interface DELETENotificationQueryRequest {
  memberId: number;
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

interface PatchNotificationAllReadRequest {
  memberId: number;
  token?: string;
}

const patchNotificationAllReadAPI = async ({
  memberId,
  token,
}: PatchNotificationAllReadRequest) => {
  const { data } = await client({
    method: 'patch',
    url: `/members/${memberId}/notifications`,
    params: {},
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PatchNotificationAllReadMutationRequest {
  memberId: number;
  token?: string;
}
export const usePATCHNotificationAllReadQuery = ({
  memberId,
}: PatchNotificationAllReadMutationRequest) => {
  const queryClient = useQueryClient();
  return useMutation(patchNotificationAllReadAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(GET_NOTIFICATION_LIST_KEY({ memberId }));
    },
  });
};

interface DELETEAllNotificationRequest {
  memberId: number;
  token?: string;
}

const deleteAllNotificationAPI = async ({
  memberId,
}: DELETEAllNotificationRequest) => {
  const { data } = await client({
    method: 'delete',
    url: `/members/${memberId}/notifications`,
    data: {},
  });
  return data;
};

export interface DELETENotificationQueryRequest {
  memberId: number;
  token?: string;
}
export const useDELETEAllNotificationQuery = ({
  memberId,
}: DELETENotificationQueryRequest) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(deleteAllNotificationAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(GET_NOTIFICATION_LIST_KEY({ memberId }));
      toast.fireToast({
        message: '삭제 되었습니다',
        mode: 'DELETE',
      });
    },
  });
};
