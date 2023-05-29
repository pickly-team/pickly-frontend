import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import resolveAfterDelay from '@/utils/resolveAfterDelay';
import client from '@/common/service/client';

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

const followFriend = async (memberId: string, followingId: string) => {
  return client.post(`/members/${memberId}/following/${followingId}`);
};

type FollowMutationArgs = {
  variables: {
    memberId: string;
    followingId: string;
  };
  onSuccess: () => void;
};
export const useFollowMutation = ({
  variables: { memberId, followingId },
  onSuccess,
}: FollowMutationArgs): UseMutationResult => {
  return useMutation(() => followFriend(memberId, followingId), {
    onSuccess: onSuccess,
  });
};

const unfollowFriend = async (memberId: string, followingId: string) => {
  return client.delete(`/members/${memberId}/following/${followingId}`);
};

type UnFollowMutationArgs = {
  variables: {
    memberId: string;
    followingId: string;
  };
  onSuccess: () => void;
};
export const useUnFollowMutation = ({
  variables: { memberId, followingId },
  onSuccess,
}: UnFollowMutationArgs): UseMutationResult => {
  return useMutation(() => unfollowFriend(memberId, followingId), {
    onSuccess: onSuccess,
  });
};
