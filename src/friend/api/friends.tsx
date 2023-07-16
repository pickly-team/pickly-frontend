import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import client from '@/common/service/client';
import useToast from '@/common-ui/Toast/hooks/useToast';
import useSearchStore from '@/store/search';
import { GET_FRIEND_PROFILE } from '@/members/api/member';

// 팔로우 리스트 API
export interface GETFollowingListResponse {
  hasNext: boolean;
  contents: FollowingInfo[];
}
export interface FollowingInfo {
  memberId: number;
  loginId: string;
}

interface ClientFollowingInfo {
  memberId: number;
  loginId: string;
  profileEmoji: string;
}

interface GETFollowingListRequest {
  memberId: number;
  cursorId?: string;
  pageSize?: number;
  token?: string;
}

const followingMapper = (following: FollowingInfo): ClientFollowingInfo => {
  return {
    ...following,
    profileEmoji: '😃',
  };
};

const getFollowingListAPI = async ({
  memberId,
  cursorId,
  pageSize,
  token,
}: GETFollowingListRequest) => {
  const { data } = await client<GETFollowingListResponse>({
    method: 'get',
    url: `/members/${memberId}/followings`,
    params: { cursorId, pageSize },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return {
    ...data,
    contents: data.contents.map(followingMapper),
  };
};

export interface GETFollowingListQueryRequest {
  memberId: number;
  cursorId?: string;
  pageSize?: number;
  token?: string;
}

const GET_FOLLOWING_LIST_KEY = (params: GETFollowingListQueryRequest) => [
  'GET_FOLLOWING_LIST',
  params.memberId,
  params.cursorId,
  params.pageSize,
];

export const useGETFollowingListQuery = (
  params: GETFollowingListQueryRequest,
) => {
  return useInfiniteQuery(
    GET_FOLLOWING_LIST_KEY(params),
    async () => getFollowingListAPI(params),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].memberId;
        }
        return undefined;
      },
    },
  );
};

// 팔로워 리스트 API
interface FollowerInfo {
  memberId: number;
  loginId: string;
  isFollowing: boolean;
}

interface ClientFollowerInfo {
  memberId: number;
  loginId: string;
  isFollowing: boolean;
  profileEmoji: string;
}

export interface GETFollowerListResponse {
  hasNext: boolean;
  contents: FollowerInfo[];
}

interface GETFollowerListRequest {
  memberId: number;
  cursorId?: string;
  pageSize?: number;
  token?: string;
}

const followerMapper = (follower: FollowerInfo): ClientFollowerInfo => {
  return {
    ...follower,
    profileEmoji: '😃',
  };
};

const getFollowerListAPI = async ({
  memberId,
  cursorId,
  pageSize,
  token,
}: GETFollowerListRequest) => {
  const { data } = await client<GETFollowerListResponse>({
    method: 'get',
    url: `/members/${memberId}/followers`,
    params: { cursorId, pageSize },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return {
    ...data,
    contents: data.contents.map(followerMapper),
  };
};

export interface GETFollowerListQueryRequest {
  memberId: number;
  cursorId?: string;
  pageSize?: number;
  token?: string;
}

const GET_FOLLOWER_LIST_KEY = (params: GETFollowerListQueryRequest) => [
  'GET_FOLLOWER_LIST',
  params.memberId,
  params.cursorId,
  params.pageSize,
];

export const useGETFollowerListQuery = (
  params: GETFollowerListQueryRequest,
) => {
  return useInfiniteQuery(
    GET_FOLLOWER_LIST_KEY(params),
    async () => getFollowerListAPI(params),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].memberId;
        }
        return undefined;
      },
    },
  );
};

interface POSTFollowRequest {
  followerId: number;
  memberId: number;
  token?: string;
}

const postFollowUserAPI = async ({
  followerId,
  memberId,
  token,
}: POSTFollowRequest) => {
  const { data } = await client({
    method: 'post',
    url: `/members/${followerId}/following/${memberId}`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface POSTFollowQueryRequest {
  memberId: number;
}
export const usePOSTFollowUserQuery = ({
  memberId,
}: POSTFollowQueryRequest) => {
  const { fireToast } = useToast();
  const queryClient = useQueryClient();
  const { keyword, selectedMemberId } = useSearchStore();
  return useMutation(postFollowUserAPI, {
    onSuccess: () => {
      fireToast({
        message: '팔로잉 중인 친구의 알림만 받을 수 있습니다',
        mode: 'SUCCESS',
      });
      queryClient.invalidateQueries(GET_FOLLOWER_LIST_KEY({ memberId }));
      queryClient.invalidateQueries(GET_FOLLOWING_LIST_KEY({ memberId }));
      queryClient.setQueryData<FollowingCount>(
        GET_FOLLOWING_COUNT_KEY({ memberId }),
        (followingCount) => {
          if (followingCount) return followingCount + 1;
          return 1;
        },
      );
      queryClient.invalidateQueries(
        GET_FRIEND_PROFILE({
          loginId: memberId,
          memberId: selectedMemberId,
        }),
      );
      if (keyword && selectedMemberId) {
        queryClient.setQueryData<InfiniteSearchList>(
          GET_SEARCH_LIST_KEY({ memberId, keyword }),
          (searchList) => {
            if (searchList) {
              return {
                ...searchList,
                pages: searchList.pages.map((page) => ({
                  ...page,
                  contents: page.contents.map((content) => {
                    if (content.memberId === selectedMemberId) {
                      return {
                        ...content,
                        isFollowing: true,
                      };
                    }
                    return content;
                  }),
                })),
              };
            }
            return searchList;
          },
        );
      }
    },
  });
};

// 언팔로우 API
interface DELETEUnFollowRequest {
  followerId: number;
  memberId: number;
  token?: string;
}

const deleteUnFollowAPI = async ({
  followerId,
  memberId,
  token,
}: DELETEUnFollowRequest) => {
  const { data } = await client({
    method: 'delete',
    url: `/members/${followerId}/following/${memberId}`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DELETEUnFollowQueryRequest {
  memberId: number;
}
export const useDELETEUnFollowQuery = ({
  memberId,
}: DELETEUnFollowQueryRequest) => {
  const { fireToast } = useToast();
  const queryClient = useQueryClient();
  const { keyword, selectedMemberId } = useSearchStore();
  return useMutation(deleteUnFollowAPI, {
    onSuccess: () => {
      fireToast({
        message: '팔로잉 중인 친구의 알림만 받을 수 있습니다',
        mode: 'SUCCESS',
      });
      queryClient.invalidateQueries(GET_FOLLOWER_LIST_KEY({ memberId }));
      queryClient.invalidateQueries(GET_FOLLOWING_LIST_KEY({ memberId }));
      queryClient.invalidateQueries(
        GET_FRIEND_PROFILE({
          loginId: memberId,
          memberId: selectedMemberId,
        }),
      );
      queryClient.setQueryData<FollowingCount>(
        GET_FOLLOWING_COUNT_KEY({ memberId }),
        (followingCount) => {
          if (followingCount) return followingCount - 1;
          return 0;
        },
      );
      if (keyword && selectedMemberId) {
        queryClient.setQueryData<InfiniteSearchList>(
          GET_SEARCH_LIST_KEY({ memberId, keyword }),
          (searchList) => {
            if (searchList) {
              return {
                ...searchList,
                pages: searchList.pages.map((page) => ({
                  ...page,
                  contents: page.contents.map((content) => {
                    if (content.memberId === selectedMemberId) {
                      return {
                        ...content,
                        isFollowing: false,
                      };
                    }
                    return content;
                  }),
                })),
              };
            }
            return searchList;
          },
        );
      }
    },
  });
};

export type FollowingCount = number;

// 팔로잉 카운트 API
interface GETFollowingCountRequest {
  memberId: number;
  token?: string;
}

const getFollowingCountAPI = async ({
  memberId,
  token,
}: GETFollowingCountRequest) => {
  const { data } = await client<FollowingCount>({
    method: 'get',
    url: `/members/${memberId}/followees/count`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GETFollowingCountQueryRequest {
  memberId: number;
  token?: string;
}

const GET_FOLLOWING_COUNT_KEY = (params: GETFollowingCountQueryRequest) => [
  'GET_FOLLOWING_COUNT',
  params.memberId,
];

export const useGETFollowingCountQuery = (
  params: GETFollowingCountQueryRequest,
) => {
  return useQuery(GET_FOLLOWING_COUNT_KEY(params), async () =>
    getFollowingCountAPI(params),
  );
};

// 팔로워 카운트 API
export type FollowerCount = number;

interface RequestInterface {
  memberId: number;
  token?: string;
}

const getFollowerCountAPI = async ({ memberId, token }: RequestInterface) => {
  const { data } = await client<FollowerCount>({
    method: 'get',
    url: `/members/${memberId}/followers/count`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GETFollowerCountQueryRequest {
  memberId: number;
  token?: string;
}

const GET_FOLLOWER_COUNT_KEY = (params: GETFollowerCountQueryRequest) => [
  'GET_FOLLOWER_COUNT',
  params.memberId,
];

export const useGETFollowerCountQuery = (
  params: GETFollowerCountQueryRequest,
) => {
  return useQuery(GET_FOLLOWER_COUNT_KEY(params), async () =>
    getFollowerCountAPI(params),
  );
};

// 유저 검색 API
export interface GETSearchListResponse {
  hasNext: boolean;
  contents: SearchList[];
}

type InfiniteSearchList =
  | InfiniteData<{
      contents: SearchList[];
      hasNext: boolean;
    }>
  | undefined;

export interface SearchList {
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
