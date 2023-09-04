import { GET_USER_PROFILE } from '@/auth/api/profile';
import {
  CustomAxiosError,
  ErrorTypes,
} from '@/common-ui/Error/ApiErrorBoundary';
import useToast from '@/common-ui/Toast/hooks/useToast';
import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    onError: (e: CustomAxiosError) => {
      if (e.response?.data.code === ErrorTypes.DUPLICATED_NICKNAME) {
        fireToast({ mode: 'ERROR', message: '앗! 중복된 닉네임이에요' });
      } else {
        fireToast({ mode: 'ERROR', message: '앗! 에러가 발생했어요' });
      }
    },
  });
};
