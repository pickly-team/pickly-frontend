import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import { UserInfo } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
  'get',
  params.loginId,
];

export const useGETUserProfile = (
  params: GetAPIRequest,
  setUserInfo: (userInfo: UserInfo) => void,
) => {
  const router = useNavigate();
  return useQuery(GET_USER_PROFILE(params), () => getUserProfile(params), {
    enabled: !!params.loginId,
    onSuccess: (data) => {
      setUserInfo(data);
      if (data.nickname === '') router(navigatePath.USER);
    },
    onError: (e) => console.log(e),
  });
};
