import client from '@/common/service/client';
import { useMutation } from '@tanstack/react-query';

export type Code = number;

interface PostMemberCode {
  memberId: number;
  token?: string;
}

const postMemberIdAPI = async ({ memberId, token }: PostMemberCode) => {
  const { data } = await client<Code>({
    method: 'post',
    url: `/members/${memberId}/authentication-code`,
    params: {},
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PostAPIRequest {
  memberId: number;
  token?: string;
}
export const usePOSTMemberIdMutation = () => {
  return useMutation(postMemberIdAPI);
};
