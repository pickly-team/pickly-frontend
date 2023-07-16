import {
  useInfiniteQuery,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import client, { api } from '@/common/service/client';
import { AxiosResponse } from 'axios';

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
}: FollowMutationArgs): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  { memberId: string; followingId: string },
  unknown
> => {
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
}): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  { memberId: string; followingId: string },
  unknown
> => {
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

export interface GETSearchListResponse {
  hasNext: boolean;
  contents: Contents[];
}
export interface Contents {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
}

interface GETSearchListRequest {
  memberId: number;
  keyword: string;
  cursorId?: number;
  pageSize?: number;
  token?: string;
}

const getSearchUserAPI = async ({
  memberId,
  keyword,
  cursorId,
  pageSize,
  token,
}: GETSearchListRequest) => {
  const { data } = await client<GETSearchListResponse>({
    method: 'get',
    url: `/members/${memberId}/search/${keyword}`,
    params: { cursorId, pageSize },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GETSearchListQueryRequest {
  memberId: number;
  keyword: string;
  cursorId?: number;
  pageSize?: number;
  token?: string;
}

export const GET_SEARCH_LIST_KEY = (params: GETSearchListQueryRequest) => [
  'GET_SEARCH_LIST',
  params.memberId,
  params.keyword,
  params.cursorId,
  params.pageSize,
];

export const useGETSearchListQuery = (params: GETSearchListQueryRequest) => {
  return useInfiniteQuery(
    GET_SEARCH_LIST_KEY(params),
    async ({ pageParam = null }) => {
      const { contents, hasNext } = await getSearchUserAPI({
        ...params,
        cursorId: pageParam,
      });
      return { contents, hasNext };
    },
    {
      enabled: !!params.keyword,
      suspense: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].memberId;
        }
        return undefined;
      },
    },
  );
};
