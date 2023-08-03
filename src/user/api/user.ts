import { GET_USER_PROFILE } from '@/auth/api/profile';
import { useFlow } from '@/common-ui/stackflow';
import client from '@/common/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const { push } = useFlow();
  const queryClient = useQueryClient();
  return useMutation(putUserInfo, {
    onSuccess: () => {
      if (mode === 'CREATE') push('IntroducePage', {});
      if (mode === 'EDIT') push('ProfilePage', {});
      queryClient.invalidateQueries(GET_USER_PROFILE({ loginId: memberId }));
    },
    onError: (e) => console.log(e),
  });
};
