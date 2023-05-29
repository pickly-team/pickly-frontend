import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import resolveAfterDelay from '@/utils/resolveAfterDelay';
import client from '@/common/service/client';

const MEMBER_ID = '1';
const FRIEND_ID = '3';
type Friends = {
  id: string;
  name: string;
  profileEmoji?: string;
  isFollowing: boolean;
};

const fetchFollowers = async (): Promise<Friends[]> => {
  //TODO: API 호출로 변경
  const mockData: Friends[] = [
    {
      id: '1',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
      isFollowing: false,
    },
    {
      id: '2',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
      isFollowing: true,
    },
  ];

  return resolveAfterDelay(mockData, 1000);
};

const fetchFollowings = async (): Promise<Friends[]> => {
  //TODO: API 호출로 변경
  const mockData: Friends[] = [
    {
      id: '1',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
      isFollowing: true,
    },
    {
      id: '2',
      name: 'seoyeon',
      profileEmoji: '8J+YgQ==',
      isFollowing: false,
    },
  ];

  return resolveAfterDelay(mockData, 1000);
};
export const useGetFollowers = (): UseQueryResult<Friends[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWERS],
    queryFn: fetchFollowers,
    suspense: true,
  });
};
export const useGetFollowings = (): UseQueryResult<Friends[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWINGS],
    queryFn: fetchFollowings,
    suspense: true,
  });
};

//TODO: 파라미터 하드 코딩 수정
const followFriend = async () => {
  return client.post(`/members/${MEMBER_ID}/following/${FRIEND_ID}`);
};

export const useFollowMutation = (): UseMutationResult => {
  return useMutation(followFriend);
};

//TODO: 파라미터 하드 코딩 수정
const unfollowFriend = async (id: string) => {
  return client.delete(`/members/${MEMBER_ID}/following/${FRIEND_ID}`);
};

export const useUnFollowMutation = (): UseMutationResult => {
  return useMutation(unfollowFriend);
};
