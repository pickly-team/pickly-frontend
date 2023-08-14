import { GET_USER_PROFILE } from '@/auth/api/profile';
import useToast from '@/common-ui/Toast/hooks/useToast';
import client from '@/common/service/client';
import { GET_SEARCH_LIST_KEY, SearchList } from '@/friend/api/friends';
import useFriendStore from '@/store/friend';
import useSearchStore from '@/store/search';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type Count = number;

// 좋아요 개수 조회
interface GetLikeCnt {
  memberId: number;
  token?: string;
}

const getLikeCountAPI = async ({
  memberId,
  token,
}: GetLikeCnt): Promise<Count> => {
  const { data } = await client<Count>({
    method: 'get',
    url: `/members/${memberId}/bookmarks/likes/count`,
    params: { memberId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GetLikeCount {
  memberId: number;
  token?: string;
}

export const GetLikeCountAPIKey = (params: GetLikeCount) => [
  'LIKE_COUNT',
  params.memberId,
];

export const useGETLikeCountQuery = (params: GetLikeCount) => {
  return useQuery(
    GetLikeCountAPIKey(params),
    async () => getLikeCountAPI(params),
    {
      enabled: !!params.memberId,
    },
  );
};

// 카테고리 개수 조회
interface GetCategoryCntParams {
  memberId: number;
  token?: string;
}

const getCategoryCntAPI = async ({ memberId, token }: GetCategoryCntParams) => {
  const { data } = await client<Count>({
    method: 'get',
    url: '/categories/cnt',
    params: { memberId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GETBookmarkCategoryCntQueryParams {
  memberId: number;
  token?: string;
}

export const GetCategoryCntKey = (
  params: GETBookmarkCategoryCntQueryParams,
) => ['GET_CATEGORY_CNT', params.memberId];

export const useGetCategoryCntQuery = (
  params: GETBookmarkCategoryCntQueryParams,
) => {
  return useQuery(
    GetCategoryCntKey(params),
    async () => getCategoryCntAPI(params),
    {
      enabled: !!params.memberId,
    },
  );
};

// 댓글 개수 조회
interface GetCommentCntParams {
  memberId: number;
  token?: string;
}

const getCommentCntAPI = async ({ memberId, token }: GetCommentCntParams) => {
  const { data } = await client<Count>({
    method: 'get',
    url: `/members/${memberId}/comments/count`,
    params: { memberId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GetCommentCnt {
  memberId: number;
  token?: string;
}

export const GetCommentCntKey = (params: GetCommentCnt) => [
  'GET_COMMENT_CNT',
  params.memberId,
];

export const useGETCommentCntQuery = (params: GetCommentCnt) => {
  return useQuery(
    GetCommentCntKey(params),
    async () => getCommentCntAPI(params),
    {
      enabled: !!params.memberId,
    },
  );
};

// 알림 기준 시간 변경 API
interface PutNotificationStandards {
  loginId: number;
  putData: {
    isActive: boolean;
    notifyDailyAt: string;
  };
  token?: string;
}

const putNotificationStandards = async ({
  loginId,
  putData,
  token,
}: PutNotificationStandards) => {
  const { data } = await client({
    method: 'put',
    url: '/notification-standards/me',
    params: { loginId },
    data: putData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PutAPIRequest {
  loginId: number;
  token?: string;
}

interface PutNotificationStandardsQuery {
  loginId: number;
}

export const usePUTNotificationStandardsQuery = ({
  loginId,
}: PutNotificationStandardsQuery) => {
  const queryClient = useQueryClient();
  return useMutation(putNotificationStandards, {
    onSuccess: () => {
      queryClient.invalidateQueries(GetNotificationStandardsKey({ loginId }));
    },
  });
};

// 알림 기준 시간 조회 API
export interface NotificationStandards {
  isActive: boolean;
  notifyDailyAt: string;
}

interface GetNotificationStandards {
  loginId: number;
  token?: string;
}

const getNotificationStandardAPI = async ({
  loginId,
  token,
}: GetNotificationStandards) => {
  const { data } = await client<NotificationStandards>({
    method: 'get',
    url: '/notification-standards/me',
    params: { loginId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GetNotificationStandardsQuery {
  loginId: number;
  token?: string;
}

export const GetNotificationStandardsKey = (
  params: GetNotificationStandardsQuery,
) => ['GET_NOTIFICATION_STANDARDS', params.loginId];

export const useGETNotificationStandardsQuery = (
  params: GetNotificationStandardsQuery,
) => {
  return useQuery(
    GetNotificationStandardsKey(params),
    async () => getNotificationStandardAPI(params),
    {
      enabled: !!params.loginId,
    },
  );
};

// 알림 기준일 조회 API
export type NotificationSettingDay = number;

interface GETNotificationSettingParams {
  loginId: number;
  token?: string;
}

const getNotificationSettingDayAPI = async ({
  loginId,
  token,
}: GETNotificationSettingParams) => {
  const { data } = await client<NotificationSettingDay>({
    method: 'get',
    url: '/notification-standards/unread-bookmark/me',
    params: { loginId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GETNotificationSettingQueryParams {
  loginId: number;
  token?: string;
}

export const GET_NOTIFICATION_SETTING_DAY_KEY = (
  params: GETNotificationSettingQueryParams,
) => ['GET_NOTIFICATION_SETTING_DAY', params.loginId];

export const useGETNotificationSettingDayQuery = (
  params: GETNotificationSettingQueryParams,
) => {
  return useQuery(
    GET_NOTIFICATION_SETTING_DAY_KEY(params),
    async () => getNotificationSettingDayAPI(params),
    {
      enabled: !!params.loginId,
      onError: (e) => console.log(e),
    },
  );
};

// 알림 기준일 변경 API
interface patchNotificationDayParams {
  loginId: number;
  patchData: {
    notifyStandardDay: number;
  };
  token?: string;
}

const patchNotificationDayAPI = async ({
  loginId,
  patchData,
  token,
}: patchNotificationDayParams) => {
  const { data } = await client({
    method: 'patch',
    url: '/notification-standards/unread-bookmark/me',
    params: { loginId },
    data: patchData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PatchNotificationDayQueryParams {
  loginId: number;
  token?: string;
}
export const usePATCHNotificationDayQuery = ({
  loginId,
}: PatchNotificationDayQueryParams) => {
  const queryClient = useQueryClient();
  return useMutation(patchNotificationDayAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        GET_NOTIFICATION_SETTING_DAY_KEY({ loginId }),
      );
    },
  });
};

// 특정 유저 차단 API
interface PostBlockMemberParams {
  blockerId: number;
  blockeeId: number;
  token?: string;
}

const postBlockMemberAPI = async ({
  blockerId,
  blockeeId,
  token,
}: PostBlockMemberParams) => {
  const { data } = await client({
    method: 'post',
    url: `/member/${blockerId}/block/${blockeeId}`,
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

interface POSTBlockMemberQueryParams {
  memberId: number;
}

type InfiniteSearchList =
  | InfiniteData<{
      contents: SearchList[];
      hasNext: boolean;
    }>
  | undefined;

export const usePOSTBlockMemberQuery = ({
  memberId,
}: POSTBlockMemberQueryParams) => {
  const router = useNavigate();
  const { fireToast } = useToast();
  const queryClient = useQueryClient();
  const { keyword, selectedMemberId } = useSearchStore();
  return useMutation(postBlockMemberAPI, {
    onSuccess: () => {
      fireToast({ message: '차단 되었습니다' });
      router(-1);
      queryClient.refetchQueries(GET_BLOCK_MEMBER_LIST_KEY({ memberId }));
      queryClient.refetchQueries(GET_USER_PROFILE({ loginId: memberId }));
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
                        isBlocked: true,
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

// 친구 프로필 조회 API
export interface MemberProfile {
  id: number;
  name: string;
  nickname: string;
  profileEmoji: string;
  isFollowing: boolean;
  isBlocked: boolean;
}

interface GETMemberProfileParams {
  memberId: number;
  loginId: number;
  token?: string;
}

const getFriendProfileAPI = async ({
  memberId,
  loginId,
  token,
}: GETMemberProfileParams) => {
  const { data } = await client<MemberProfile>({
    method: 'get',
    url: `/members/${memberId}`,
    params: { memberId, loginId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GETFriendProfileQueryParams {
  memberId: number;
  loginId: number;
  token?: string;
}

export const GET_FRIEND_PROFILE = (params: GETFriendProfileQueryParams) => [
  'GET_FRIEND_PROFILE',
  params.memberId,
  params.loginId,
];

export const useGETFriendProfileQuery = (
  params: GETFriendProfileQueryParams,
) => {
  return useQuery(GET_FRIEND_PROFILE(params), async () =>
    getFriendProfileAPI(params),
  );
};

interface MemberItem {
  hasNext: boolean;
  contents: Member[];
}

interface Member {
  id: number;
  nickname: string;
  profileEmoji: string;
}

interface GetBlockMemberListParams {
  memberId: number;
  cursorId?: number;
  pageSize?: number;
}

const GETBlockMemberList = {
  API: async (params: GetBlockMemberListParams) => {
    const { data } = await client<MemberItem>({
      method: 'get',
      url: `/member/blocks/${params.memberId}`,
      params: {
        cursorId: params.cursorId,
        pageSize: params.pageSize,
      },
    });
    return data;
  },
};

const GET_BLOCK_MEMBER_LIST_KEY = (params: GetBlockMemberListParams) => [
  'GET_BLOCK_MEMBER_LIST',
  params.memberId,
];

export const useGETBlockMemberListQuery = (
  params: GetBlockMemberListParams,
) => {
  return useInfiniteQuery(
    GET_BLOCK_MEMBER_LIST_KEY(params),
    () => GETBlockMemberList.API(params),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.contents.length : undefined;
      },
      enabled: !!params.memberId,
      suspense: true,
    },
  );
};

// 차단 해제 API
interface DELETEBlockMemberParams {
  blockerId: number;
  blockeeId: number;
  token?: string;
}

const unblockUserAPI = async ({
  blockerId,
  blockeeId,
  token,
}: DELETEBlockMemberParams) => {
  const { data } = await client({
    method: 'delete',
    url: `/member/${blockerId}/block/${blockeeId}`,
    params: { blockerId, blockeeId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DELETEBlockMemberQueryParams {
  memberId: number;
}
export const useUnblockUserQuery = ({
  memberId,
}: DELETEBlockMemberQueryParams) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  const { friendId } = useFriendStore();
  const { keyword, selectedMemberId } = useSearchStore();
  return useMutation(unblockUserAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_BLOCK_MEMBER_LIST_KEY({ memberId }));
      queryClient.refetchQueries(
        GET_FRIEND_PROFILE({ memberId: friendId, loginId: memberId }),
      );
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
                      isBlocked: false,
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
      fireToast({ message: '차단이 해제 되었습니다' });
    },
  });
};

interface DELETEUserInfoRequest {
  loginId: number;
  token?: string;
}

const deleteUserInfoAPI = async ({ loginId, token }: DELETEUserInfoRequest) => {
  const { data } = await client({
    method: 'delete',
    url: '/members/me',
    params: { loginId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DeleteAPIRequest {
  loginId: number;
  token?: string;
}
export const useDELETEUserInfoQuery = () => {
  return useMutation(deleteUserInfoAPI);
};
