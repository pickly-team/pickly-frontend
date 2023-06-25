import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { api } from '@/common/service/client';

type Friends = {
  memberId: string;
  loginId: string;
  profileEmoji?: string;
  isFollowing: boolean;
};

type GetFollowersArgs = {
  memberId: string;
  cursorId?: string;
  pageSize?: number;
};

type GetFollowersResult = {
  hasNext: boolean;
  contents: Friends[];
};
export const useGetFollowers = ({
  memberId,
  pageSize,
  cursorId,
}: GetFollowersArgs): UseQueryResult<GetFollowersResult, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWERS],
    queryFn: async () => {
      const { data } = await api.getFollowers(memberId, cursorId, pageSize);
      return data;
    },
    suspense: true,
  });
};

type GetFollowingsArgs = {
  memberId: string;
  cursorId?: string;
  pageSize?: number;
};
type GetFollowingsResult = {
  hasNext: boolean;
  contents: Friends[];
};
export const useGetFollowings = ({
  memberId,
  pageSize,
  cursorId,
}: GetFollowingsArgs): UseQueryResult<GetFollowingsResult, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWINGS],
    queryFn: async () => {
      const { data } = await api.getFollowings(memberId, cursorId, pageSize);
      return data;
    },
    suspense: true,
  });
};

type FollowMutationArgs = {
  onSuccess: () => void;
};
export const useFollowMutation = ({
  onSuccess,
}: FollowMutationArgs): UseMutationResult => {
  return useMutation({
    mutationFn: ({
      memberId,
      followingId,
    }: {
      memberId: string;
      followingId: string;
    }) => {
      return api.postFollowFriend(memberId, followingId);
    },
    onSuccess: onSuccess,
  });
};

export const useUnFollowMutation = ({
  onSuccess,
}: {
  onSuccess: () => void;
}): UseMutationResult => {
  return useMutation({
    mutationFn: ({
      memberId,
      followingId,
    }: {
      memberId: string;
      followingId: string;
    }) => {
      return api.deleteUnfollowFriend(memberId, followingId);
    },
    onSuccess: onSuccess,
  });
};
