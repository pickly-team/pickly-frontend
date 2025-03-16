import useToast from '@/shared/ui/Toast/hooks/useToast';

import { navigatePath } from '@/shared/constants/navigatePath';
import useBookmarkStore from '@/shared/store/bookmark';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import qs from 'qs';
import { READ_OPTION, READ_OPTIONS } from '../service/hooks/home/useReadList';
import { GET_LIKE_BOOKMARK_LIST } from './like';
import client from '@/shared/common/service/client';
import { GET_USER_PROFILE } from '@/features/auth/api/profile';

dayjs.locale('ko');

const DOMAIN = 'BOOKMARK';

export type Visibility = 'SCOPE_PUBLIC' | 'SCOPE_PRIVATE' | 'SCOPE_FRIEND';
export type ClientVisibility = '전체 공개' | '나만 보기' | '친구 공개';
export const TEMP_VISIBILITY: Record<ClientVisibility, Visibility> = {
  '전체 공개': 'SCOPE_PUBLIC',
  '나만 보기': 'SCOPE_PRIVATE',
  '친구 공개': 'SCOPE_FRIEND',
};

export const GET_BOOKMARK_LIST = (
  userId: number,
  readByUser: READ_OPTION,
  categoryId: number | null,
) => [
  getKeyofObject(navigatePath, '/'),
  DOMAIN,
  'BOOKMARK_LIST',
  userId,
  readByUser,
  categoryId,
];

///////////////////////////////////
// 북마크 메인 페이지
// 북마크 리스트 조회
/** API call 결과 */
export interface SeverBookMarkItem {
  hasNext: boolean;
  contents: BookmarkItem[];
}

export interface BookmarkItem {
  bookmarkId: number;
  title: string;
  url: string;
  previewImageUrl: string;
  isUserLike: boolean;
  readByUser: boolean;
  commentCnt: number;
  createdDate: string;
  disabled?: boolean;
  categoryName: string;
  categoryEmoji: string;
}

/** mapping 결과 */
export type bookmarkGETBookMarkList = BookmarkItem[];

interface GETBookMarkListRequest {
  memberId: number;
  categoryId: number | null;
  readByUser: READ_OPTION;
  loginId: number;
  pageRequest?: {
    cursorId?: number;
    pageSize?: number;
  };
}

const GETBookMarkList = {
  API: async (params: GETBookMarkListRequest) => {
    const { data } = await client.get<SeverBookMarkItem>(
      `/members/${params.memberId}/bookmarks`,
      {
        params: {
          categoryId: params.categoryId === 0 ? null : params.categoryId,
          readByUser: READ_OPTIONS[params.readByUser],
          loginId: params.loginId,
          cursorId: params.pageRequest?.cursorId,
          pageSize: params.pageRequest?.pageSize,
        },
      },
    );

    return {
      hasNext: data.hasNext,
      contents: GETBookMarkList.Mapper(data.contents),
    };
  },
  Mapper: (bookmarkList: BookmarkItem[]): bookmarkGETBookMarkList => {
    return bookmarkList.map((bookmark) => ({
      bookmarkId: bookmark.bookmarkId,
      title: bookmark.title,
      url: bookmark.url,
      previewImageUrl:
        bookmark.previewImageUrl ?? process.env.VITE_ASSETS_URL + '/main.webp',
      isUserLike: bookmark.isUserLike,
      readByUser: bookmark.readByUser,
      commentCnt: bookmark.commentCnt,
      createdDate: bookmark.createdDate,
      categoryName: bookmark.categoryName,
      categoryEmoji: bookmark.categoryEmoji,
    }));
  },
};

export const useGETBookMarkListQuery = (params: GETBookMarkListRequest) => {
  return useInfiniteQuery(
    GET_BOOKMARK_LIST(params.memberId, params.readByUser, params.categoryId),
    async ({ pageParam = null }) => {
      const { contents, hasNext } = await GETBookMarkList.API({
        ...params,
        pageRequest: {
          cursorId: pageParam,
          pageSize: 10,
        },
      });
      return {
        contents,
        hasNext,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].bookmarkId;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      enabled: params.memberId !== 0,
      suspense: true,
    },
  );
};

// 북마크 삭제
interface DELETEBookMarkListRequest {
  bookmarkIds: number[];
}

const DELETEBookMarkList = {
  API: async (params: DELETEBookMarkListRequest) => {
    const { data } = await client.delete('/bookmarks/list', {
      params: {
        bookmarkId: params.bookmarkIds,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return data;
  },
};

interface DELETEBookMarkListMutation {
  userId: number;
}

export const useDELETEBookMarkMutation = ({
  userId,
}: DELETEBookMarkListMutation) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { selectedCategoryId } = useBookmarkStore();
  return useMutation(DELETEBookMarkList.API, {
    onSuccess: () => {
      refetchAllBookmarkQuery({
        queryClient,
        memberId: userId,
        categoryId: selectedCategoryId ?? null,
      });
      queryClient.refetchQueries(GET_USER_PROFILE({ loginId: userId }));
      queryClient.refetchQueries(
        GET_BOOKMARK_READ_STATUS({ memberId: userId }),
      );
      queryClient.refetchQueries(
        GET_BOOKMARK_CATEGORY_STATUS({ memberId: userId }),
      );
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(userId));

      toast.fireToast({
        message: '삭제 되었습니다',
        mode: 'DELETE',
      });
    },
  });
};

///////////////////////////////////
// 북마크 추가 BS
// 북마크 카테고리 리스트 조회
interface ServerBookmarkCategoryItem {
  orderNum: number;
  categoryId: number;
  name: string;
  emoji: string;
}

export interface ClientBookmarkCategoryItem {
  order: number;
  id: number;
  name: string;
  emoji: string;
  isChecked: boolean;
}

interface GETBookmarkCategoryListRequest {
  memberId: number;
}

const GETBookmarkCategoryList = {
  API: async ({ memberId }: GETBookmarkCategoryListRequest) => {
    const { data } = await client.get<ServerBookmarkCategoryItem[]>(
      `/members/${memberId}/categories`,
    );
    return GETBookmarkCategoryList.Mapper(data);
  },
  Mapper: (
    categoryList: ServerBookmarkCategoryItem[],
  ): ClientBookmarkCategoryItem[] => {
    return categoryList.map((category) => ({
      order: category.orderNum,
      id: category.categoryId,
      emoji: category.emoji,
      name: category.name,
      isChecked: false,
    }));
  },
};

export const GET_BOOKMARK_CATEGORY_LIST = (memberId: number) => [
  getKeyofObject(navigatePath, '/'),
  DOMAIN,
  'BOOKMARK_CATEGORY_LIST',
  memberId,
];

interface GETBookMarkCategoryListRequest {
  memberId: number;
}

export const useGETCategoryListQuery = ({
  memberId,
}: GETBookMarkCategoryListRequest) => {
  return useQuery(
    GET_BOOKMARK_CATEGORY_LIST(memberId),
    async () => GETBookmarkCategoryList.API({ memberId }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: memberId !== 0,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
  );
};

//////////////////////////////////////
// 북마크 제목 조회

export interface OGData {
  title: string;
  thumbnail: string;
}

interface GETOGDataRequest {
  url: string;
  token?: string;
}

const getOGData = async ({ url }: GETOGDataRequest) => {
  const { data } = await client<OGData>({
    method: 'get',
    url: '/members/bookmark/info',
    params: { url },
  });
  return data;
};

const GET_OG_DATA = (url: string) => ['GET_OG_DATA', url];

interface GETOGDataQuery {
  url: string;
  enabled: boolean;
  setOGData: (data: OGData) => void;
}

export const useGETOgDataQuery = ({
  url,
  enabled,
  setOGData,
}: GETOGDataQuery) => {
  const { fireToast } = useToast();
  const { setIsBookmarkError } = useBookmarkStore();
  return useQuery(GET_OG_DATA(url), () => getOGData({ url }), {
    onSuccess: (data) => {
      setOGData && setOGData(data);
      setIsBookmarkError(false);
    },
    onError: () => {
      setIsBookmarkError(true);
      fireToast({
        message: '앗! 제목을 받아올 수 없는 북마크에요',
        mode: 'ERROR',
      });
    },
    enabled: !!url.length && enabled,
    retry: 0,
  });
};

interface POSTBookmarkRequest {
  memberId: number;
  categoryId: number;
  url: string;
  title: string | null;
  thumbnail: string;
  visibility: Visibility;
}

interface POSTBookmarkResponse {
  id: number;
}

const postBookmark = async (params: POSTBookmarkRequest) => {
  const { data } = await client<POSTBookmarkResponse>({
    method: 'post',
    url: '/bookmarks',
    data: params,
  });
  return data;
};

interface POSTBookmarkMutation {
  memberId: number;
  resetAll: {
    resetAllInputs: () => void;
    resetCategory: () => void;
    resetVisibility: () => void;
  };
}

export const usePOSTBookmarkMutation = ({
  memberId,
  resetAll,
}: POSTBookmarkMutation) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  return useMutation(postBookmark, {
    onSuccess: (res) => {
      fireToast({ message: '추가 되었습니다', mode: 'SUCCESS' });
      resetAll.resetAllInputs();
      resetAll.resetCategory();
      resetAll.resetVisibility();
      refetchAllBookmarkQuery({
        queryClient,
        memberId,
        bookmarkId: res.id.toString(),
      });
      queryClient.refetchQueries(GET_USER_PROFILE({ loginId: memberId }));
      queryClient.refetchQueries(GET_BOOKMARK_READ_STATUS({ memberId }));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_STATUS({ memberId }));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));
    },
    onError: () => {
      fireToast({ message: '앗! 추가할 수 없는 북마크에요', mode: 'DELETE' });
    },
  });
};

// 북마크 상세 조회
export interface BookmarkDetail {
  id: number;
  categoryId: number;
  categoryName: string;
  categoryEmoji: string;
  memberId: number;
  url: string;
  title: string;
  previewImageUrl: string;
  isUserLike: boolean;
  readByUser: boolean;
  visibility: ClientVisibility;
  createdAt: string;
}

interface GETBookmarkDetailParams {
  bookmarkId: string;
  memberId: number;
  token?: string;
}

const getBookmarkDetailAPI = async ({
  bookmarkId,
  memberId,
  token,
}: GETBookmarkDetailParams) => {
  const { data } = await client<BookmarkDetail>({
    method: 'get',
    url: `/bookmarks/${bookmarkId}`,
    params: { memberId },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return getBookmarkDetailMapper(data);
};

export interface ClientBookmarkDetail {
  categoryId: number;
  categoryName: string;
  categoryEmoji: string;
  memberId: number;
  url: string;
  title: string;
  previewImageUrl: string;
  isUserLike: boolean;
  readByUser: boolean;
  createdAt: number;
  visibility: Visibility;
}

const getBookmarkDetailMapper = (
  data: BookmarkDetail,
): ClientBookmarkDetail => {
  return {
    categoryId: data.categoryId,
    categoryName: data.categoryName,
    categoryEmoji: data.categoryEmoji,
    memberId: data.memberId,
    url: data.url,
    title: data.title,
    previewImageUrl:
      data.previewImageUrl ?? process.env.VITE_ASSETS_URL + '/main.webp',
    isUserLike: data.isUserLike,
    readByUser: data.readByUser,
    createdAt: dayjs(data.createdAt).unix(),
    visibility: TEMP_VISIBILITY[data.visibility],
  };
};

export interface GetBookmarkDetailRequest {
  bookmarkId: string;
  memberId: number;
  token?: string;
}

export const GET_BOOKMARK_DETAIL_KEY = (params: GetBookmarkDetailRequest) => [
  'GET_BOOKMARK_DETAIL_KEY',
  params.bookmarkId,
];

export const useGETBookmarkDetailQuery = (params: GetBookmarkDetailRequest) => {
  return useQuery(
    GET_BOOKMARK_DETAIL_KEY(params),
    async () => getBookmarkDetailAPI(params),
    {
      suspense: true,
    },
  );
};

// 북마크 댓글 조회
export interface BookmarkCommentItem {
  id: number;
  member: string;
  memberId: number;
  profileEmoji: string;
  bookmark: string;
  category: string;
  isOwnerComment: boolean;
  content: string;
  createdTimestamp: number;
}

interface GETBookmarkCommentRequest {
  bookmarkId: string;
  memberId: number;
  token?: string;
}

const getBookmarkCommentListAPI = async ({
  bookmarkId,
  memberId,
  token,
}: GETBookmarkCommentRequest) => {
  const { data } = await client<BookmarkCommentItem[]>({
    method: 'get',
    url: `/bookmarks/${bookmarkId}/comments`,
    params: { memberId },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GetAPIRequest {
  bookmarkId: string;
  memberId: number;
  token?: string;
  setCommentCount?: (count: number) => void;
}

export const GET_BOOKMARK_COMMENT = (params: GetAPIRequest) => [
  'GET_BOOKMARK_COMMENT',
  params.bookmarkId,
];

export const useGETBookmarkCommentListQuery = (params: GetAPIRequest) => {
  return useQuery(
    GET_BOOKMARK_COMMENT(params),
    async () => getBookmarkCommentListAPI(params),
    {
      suspense: true,
      onSuccess: (data) => {
        params.setCommentCount && params.setCommentCount(data.length);
      },
    },
  );
};

// 북마크 좋아요
interface POSTBookmarkLikeRequest {
  bookmarkId: string;
  token?: string;
}

const postBookmarkLikeAPI = async ({
  bookmarkId,
  token,
}: POSTBookmarkLikeRequest) => {
  const { data } = await client({
    method: 'post',
    url: `/bookmarks/${bookmarkId}/like`,
    params: { bookmarkId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PostAPIRequest {
  bookmarkId: string;
  memberId: number;
  token?: string;
}
export const usePOSTBookmarkLikeQuery = ({
  bookmarkId,
  memberId,
}: PostAPIRequest) => {
  const queryClient = useQueryClient();
  return useMutation(postBookmarkLikeAPI, {
    onSuccess: () => {
      queryClient.setQueryData<ClientBookmarkDetail>(
        GET_BOOKMARK_DETAIL_KEY({ bookmarkId, memberId }),
        (prev) => {
          if (prev) {
            return {
              ...prev,
              isUserLike: true,
            };
          }
          return prev;
        },
      );
      queryClient.refetchQueries(GET_LIKE_BOOKMARK_LIST(memberId));
      refetchAllBookmarkQuery({ queryClient, memberId, bookmarkId });
    },
  });
};

interface DELETEBookmarkLikeRequest {
  bookmarkId: string;
  token?: string;
}

const deleteBookmarkLikeAPI = async ({
  bookmarkId,
  token,
}: DELETEBookmarkLikeRequest) => {
  const { data } = await client({
    method: 'delete',
    url: `/bookmarks/${bookmarkId}/like`,
    params: { bookmarkId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DELETEBookmarkLikeQueryRequest {
  bookmarkId: string;
  memberId: number;
  token?: string;
}
export const useDELETEBookmarkLikeQuery = ({
  bookmarkId,
  memberId,
}: DELETEBookmarkLikeQueryRequest) => {
  const queryClient = useQueryClient();
  return useMutation(deleteBookmarkLikeAPI, {
    onSuccess: () => {
      queryClient.setQueryData<ClientBookmarkDetail>(
        GET_BOOKMARK_DETAIL_KEY({ bookmarkId, memberId }),
        (prev) => {
          if (prev) {
            return {
              ...prev,
              isUserLike: false,
            };
          }
          return prev;
        },
      );
      queryClient.refetchQueries(GET_LIKE_BOOKMARK_LIST(memberId));
      refetchAllBookmarkQuery({ queryClient, memberId, bookmarkId });
    },
  });
};

// 북마크 삭제
export interface DeleteBookmarkResponse {
  isDeleted: boolean;
}

interface DELETEBookmarkRequest {
  bookmarkId: number;
  token?: string;
}

const deleteBookmarkAPI = async ({
  bookmarkId,
  token,
}: DELETEBookmarkRequest) => {
  const { data } = await client<DeleteBookmarkResponse>({
    method: 'delete',
    url: `/bookmarks/${bookmarkId}`,
    params: { bookmarkId },
    data: {},
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface DeleteAPIRequest {
  memberId: number;
  bookmarkId: string;
}
export const useDELETEBookmarkQuery = ({
  memberId,
  bookmarkId,
}: DeleteAPIRequest) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  return useMutation(deleteBookmarkAPI, {
    onSuccess: () => {
      fireToast({ message: '삭제 되었습니다', mode: 'DELETE' });
      refetchAllBookmarkQuery({ queryClient, memberId, bookmarkId });
      refetchAllBookmarkQuery({ queryClient, memberId });
      queryClient.refetchQueries(GET_USER_PROFILE({ loginId: memberId }));
      queryClient.refetchQueries(GET_BOOKMARK_READ_STATUS({ memberId }));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_STATUS({ memberId }));
      queryClient.refetchQueries(GET_BOOKMARK_CATEGORY_LIST(memberId));

      fireToast({
        message: '삭제 되었습니다',
        mode: 'DELETE',
      });
    },
  });
};

interface RefetchAllBookmark {
  queryClient: ReturnType<typeof useQueryClient>;
  memberId: number;
  bookmarkId?: string;
  categoryId?: number | null;
}

export const refetchAllBookmarkQuery = ({
  queryClient,
  memberId,
  bookmarkId,
  categoryId: selectedCategoryId,
}: RefetchAllBookmark) => {
  const bookmark = queryClient.getQueryData<ClientBookmarkDetail>(
    GET_BOOKMARK_DETAIL_KEY({ bookmarkId: bookmarkId ?? '', memberId }),
  );
  const categoryId = bookmark?.categoryId ?? selectedCategoryId ?? null;
  // NOTE : 왜 도대체 뒤로 가기 시에는 refetch가 되지 않는지 모르겠음
  queryClient.invalidateQueries(
    GET_BOOKMARK_LIST(memberId, '💡 모두보기', null),
  );
  queryClient.invalidateQueries(GET_BOOKMARK_LIST(memberId, '👀 읽음', null));
  queryClient.invalidateQueries(
    GET_BOOKMARK_LIST(memberId, '🫣 읽지 않음', null),
  );
  queryClient.invalidateQueries(
    GET_BOOKMARK_LIST(memberId, '💡 모두보기', categoryId),
  );
  queryClient.invalidateQueries(
    GET_BOOKMARK_LIST(memberId, '👀 읽음', categoryId),
  );
  queryClient.invalidateQueries(
    GET_BOOKMARK_LIST(memberId, '🫣 읽지 않음', categoryId),
  );
};

export const toggleBookmarkRead = (
  prev: InfiniteData<SeverBookMarkItem> | undefined,
  bookmarkId: number,
) => {
  if (prev) {
    if (!prev) return undefined;
    return {
      ...prev,
      pages: prev.pages.map((page) => ({
        ...page,
        contents: page.contents.map((bookmark) => {
          if (bookmark.bookmarkId === Number(bookmarkId)) {
            return {
              ...bookmark,
              readByUser: !bookmark.readByUser,
            };
          }
          return bookmark;
        }),
      })),
    };
  }
  return prev;
};

// 북마크 수정

interface PUTBookmarkRequest {
  bookmarkId: string;
  putData: {
    categoryId: string;
    title: string;
    readByUser: boolean;
    visibility: Visibility;
  };

  token?: string;
}

const putBookmarkAPI = async ({
  bookmarkId,
  putData,
  token,
}: PUTBookmarkRequest) => {
  const { data } = await client({
    method: 'put',
    url: `/bookmarks/${bookmarkId}`,
    params: { bookmarkId },
    data: putData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface PUTBookmarkQueryRequest {
  bookmarkId: string;
  memberId: number;
}
export const usePUTBookmarkQuery = ({
  bookmarkId,
  memberId,
}: PUTBookmarkQueryRequest) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  return useMutation(putBookmarkAPI, {
    onSuccess: () => {
      fireToast({ message: '수정 되었습니다', mode: 'SUCCESS' });
      refetchAllBookmarkQuery({ queryClient, memberId, bookmarkId });
      queryClient.refetchQueries(
        GET_BOOKMARK_DETAIL_KEY({ bookmarkId, memberId }),
      );
    },
  });
};

// 북마크 읽음 현황 조회

export interface BookmarkReadStatus {
  total: number;
  readCount: number;
  unreadCount: number;
  readStatusPercentage: number;
}

interface GETBookmarkReadStatusRequest {
  memberId: number;
  token?: string;
}

const getBookmarkReadStatusAPI = async ({
  memberId,
}: GETBookmarkReadStatusRequest) => {
  const { data } = await client<BookmarkReadStatus>({
    method: 'get',
    url: `/members/${memberId}/bookmarks/read-status`,
  });
  return data;
};

export interface GETBookmarkReadStatusQueryRequest {
  memberId: number;
  token?: string;
}

export const GET_BOOKMARK_READ_STATUS = (
  params: GETBookmarkReadStatusQueryRequest,
) => ['GET_BOOKMARK_READ_STATUS', params.memberId];

export const useGETBookmarkReadStatusQuery = (
  params: GETBookmarkReadStatusQueryRequest,
) => {
  return useQuery(GET_BOOKMARK_READ_STATUS(params), async () =>
    getBookmarkReadStatusAPI(params),
  );
};

// 카테고리 별 북마크 읽음 현황 조회
export interface CategoryReadItem {
  categoryId: number;
  categoryName: string;
  categoryEmoji: string;
  readStatus: ReadStatus;
}
export interface ReadStatus {
  total: number;
  readCount: number;
  unreadCount: number;
  readStatusPercentage: number;
}

interface GETBookmarkCategoryReadStatusRequest {
  memberId: number;
  token?: string;
}

const getBookmarkCategoryReadStatusAPI = async ({
  memberId,
  token,
}: GETBookmarkCategoryReadStatusRequest) => {
  const { data } = await client<CategoryReadItem[]>({
    method: 'get',
    url: `/members/${memberId}/categories/bookmarks/read-status`,
  });

  return data;
};

export interface GETBookmarkCategoryReadStatusQueryRequest {
  memberId: number;
  token?: string;
}

export const GET_BOOKMARK_CATEGORY_STATUS = (
  params: GETBookmarkCategoryReadStatusQueryRequest,
) => ['GET_BOOKMARK_CATEGORY_STATUS', params.memberId];

export const useGETBookmarkCategoryStatusQuery = (
  params: GETBookmarkCategoryReadStatusQueryRequest,
) => {
  return useQuery(
    GET_BOOKMARK_CATEGORY_STATUS(params),
    async () => getBookmarkCategoryReadStatusAPI(params),
    {
      suspense: true,
    },
  );
};

export interface SeverBookMarkItem {
  hasNext: boolean;
  contents: BookmarkItem[];
}

export interface BookmarkItem {
  bookmarkId: number;
  title: string;
  url: string;
  previewImageUrl: string;
  isUserLike: boolean;
  readByUser: boolean;
  commentCnt: number;
  createdDate: string;
  disabled?: boolean;
  categoryName: string;
  categoryEmoji: string;
}

/** mapping 결과 */

interface GETBookMarkSearchListRequest {
  memberId: number;
  keyword: string;
  pageRequest?: {
    cursorId?: number;
    pageSize?: number;
  };
}

const GETBookSearchMarkList = {
  API: async (params: GETBookMarkSearchListRequest) => {
    const { data } = await client.get<SeverBookMarkItem>(
      `/members/${params.memberId}/bookmarks/search`,
      {
        params: {
          keyword: params.keyword,
          cursorId: params.pageRequest?.cursorId,
          pageSize: params.pageRequest?.pageSize,
        },
      },
    );

    return {
      hasNext: data.hasNext,
      contents: GETBookMarkList.Mapper(data.contents),
    };
  },
  Mapper: (bookmarkList: BookmarkItem[]): bookmarkGETBookMarkList => {
    return bookmarkList.map((bookmark) => ({
      bookmarkId: bookmark.bookmarkId,
      title: bookmark.title,
      url: bookmark.url,
      previewImageUrl:
        bookmark.previewImageUrl ?? process.env.VITE_ASSETS_URL + '/main.webp',
      isUserLike: bookmark.isUserLike,
      readByUser: bookmark.readByUser,
      commentCnt: bookmark.commentCnt,
      createdDate: bookmark.createdDate,
      categoryName: bookmark.categoryName,
      categoryEmoji: bookmark.categoryEmoji,
    }));
  },
};

const GET_BOOKMARK_SEARCH_LIST = (keyword: string) => [
  'GET_BOOKMARK_SEARCH_LIST',
  keyword,
];

export const useGETBookmarkSearchListQuery = (
  params: GETBookMarkSearchListRequest,
) => {
  return useInfiniteQuery(
    GET_BOOKMARK_SEARCH_LIST(params.keyword),
    async ({ pageParam = null }) => {
      const { contents, hasNext } = await GETBookSearchMarkList.API({
        ...params,
        pageRequest: {
          cursorId: pageParam,
          pageSize: 10,
        },
      });
      return {
        contents,
        hasNext,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].bookmarkId;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      enabled: params.memberId !== 0 && params.keyword.length > 0,
      suspense: true,
    },
  );
};

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
