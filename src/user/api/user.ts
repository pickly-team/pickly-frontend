import { GET_USER_PROFILE } from '@/auth/api/profile';
import useToast from '@/common-ui/Toast/hooks/useToast';
import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface RequestInterface {
  memberId: number;
  putData: {
    name: string;
    nickname: string;
    profileEmoji: string;
  };
  token?: string;
}

const putUserInfo = async ({ memberId, putData, token }: RequestInterface) => {
  const { data } = await client({
    method: 'put',
    url: '/members/me',
    params: { memberId },
    data: putData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PutAPIRequest {
  mode: Mode;
  memberId: number;
}
export const usePutUserInfoQuery = ({ mode, memberId }: PutAPIRequest) => {
  const router = useNavigate();
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  return useMutation(putUserInfo, {
    onSuccess: () => {
      if (mode === 'CREATE') router(navigatePath.INTRODUCE);
      if (mode === 'EDIT') router(navigatePath.PROFILE);
      queryClient.invalidateQueries(GET_USER_PROFILE({ loginId: memberId }));
    },
    onError: (e: AxiosError) => {
      if (e.response?.status === 500) {
        // TODO : 이후 에러 세분화 처리 필요
        fireToast({ mode: 'ERROR', message: '앗! 중복된 닉네임이에요' });
      }
    },
  });
};
