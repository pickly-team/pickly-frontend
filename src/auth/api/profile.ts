import { useFlow } from '@/common-ui/stackflow';
import client from '@/common/service/client';
import useAuthStore, { UserInfo } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';

interface RequestInterface {
  loginId: number;
  token?: string;
}

const getUserProfile = async ({ loginId, token }: RequestInterface) => {
  const { data } = await client<UserInfo>({
    method: 'get',
    url: '/members/me',
    params: { loginId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GetAPIRequest {
  loginId: number;
}

export const GET_USER_PROFILE = (params: GetAPIRequest) => [
  'GET_USER_PROFILE',
  params.loginId,
];

export const useGETUserProfile = (params: GetAPIRequest) => {
  const { replace } = useFlow();
  const { setUserInfo } = useAuthStore();
  return useQuery(GET_USER_PROFILE(params), () => getUserProfile(params), {
    enabled: params.loginId !== 0,
    onSuccess: (data) => {
      setUserInfo((userInfo) => ({
        ...userInfo,
        ...data,
        profileEmoji: data.profileEmoji ?? '🐶',
      }));
      if (data.nickname === '')
        replace('UserInfoPage', {
          mode: 'CREATE',
        });
    },
    onError: (e) => console.log(e),
    cacheTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
};
