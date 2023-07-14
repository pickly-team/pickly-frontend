import useToast from '@/common-ui/Toast/hooks/useToast';
import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import qs from 'qs';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const DOMAIN = 'BOOKMARK';

export type Visibility = 'SCOPE_PUBLIC' | 'SCOPE_PRIVATE' | 'SCOPE_FRIEND';
export type ClientVisibility = '전체 공개' | '나만 보기' | '친구만 보기';
export const TEMP_VISIBILITY: Record<ClientVisibility, Visibility> = {
  '전체 공개': 'SCOPE_PUBLIC',
  '나만 보기': 'SCOPE_PRIVATE',
  '친구만 보기': 'SCOPE_FRIEND',
};

export const GET_BOOKMARK_LIST = (
  userId: number,
  readByUser: boolean,
  categoryId: number,
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
interface SeverBookMarkItem {
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
}

/** mapping 결과 */
export type bookmarkGETBookMarkList = BookmarkItem[];

interface GETBookMarkListRequest {
  memberId: number;
  categoryId?: number;
  readByUser?: boolean;
  visibility?: Visibility;
  pageRequest: {
    cursorId?: number;
    pageSize: number;
  };
}

const GETBookMarkList = {
  API: async (params: GETBookMarkListRequest) => {
    const { data } = await client.get<SeverBookMarkItem>(
      `/members/${params.memberId}/bookmarks`,
      {
        params: {
          categoryId: params.categoryId,
          readByUser: params.readByUser,
          visibility: params.visibility,
          cursorId: params.pageRequest.cursorId,
          pageSize: params.pageRequest.pageSize,
        },
      },
    );

    return data;
  },
};

export const useGETBookMarkListQuery = (params: GETBookMarkListRequest) => {
  return useInfiniteQuery(
    GET_BOOKMARK_LIST(
      params.memberId,
      params.readByUser ?? false,
      params.categoryId ?? 0,
    ),
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
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
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
  categoryId?: number;
}

export const useDELETEBookMarkMutation = ({
  userId,
  categoryId,
}: DELETEBookMarkListMutation) => {
  const queryClient = useQueryClient();
  return useMutation(DELETEBookMarkList.API, {
    onSuccess: () => {
      queryClient.refetchQueries(
        GET_BOOKMARK_LIST(userId, false, categoryId ?? 0),
      );
      queryClient.refetchQueries(
        GET_BOOKMARK_LIST(userId, true, categoryId ?? 0),
      );
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
  isSelected: boolean;
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
    return categoryList
      .map((category) => ({
        order: category.orderNum,
        id: category.categoryId,
        emoji: category.emoji,
        name: category.name,
        isSelected: false,
      }))
      .sort((a, b) => a.order - b.order);
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
      enabled: !!memberId,
    },
  );
};

//////////////////////////////////////
// 북마크 제목 조회

type GETBookmarkTitleResponse = string;

interface GetBookmarkTitleRequest {
  url: string;
  setTitle?: (title: string) => void;
}

const getBookmarkTitleAPI = async ({ url }: GetBookmarkTitleRequest) => {
  const { data } = await client<GETBookmarkTitleResponse>({
    method: 'get',
    url: '/bookmark/title',
    params: { url },
    data: {},
  });
  return data;
};

const GET_BOOKMARK_TITLE = (url: string) => ['GET_BOOKMARK_TITLE', url];

export const useGETBookmarkTitleQuery = ({
  url,
  setTitle,
}: GetBookmarkTitleRequest) => {
  const { fireToast } = useToast();
  return useQuery(GET_BOOKMARK_TITLE(url), () => getBookmarkTitleAPI({ url }), {
    enabled: !!url,
    retry: 0,
    onSuccess: (data) => {
      setTitle && setTitle(data);
    },
    onError: () => {
      fireToast({ message: '앗! 유효하지 않은 주소에요', mode: 'DELETE' });
    },
  });
};

interface POSTBookmarkRequest {
  memberId: number;
  categoryId: number;
  url: string;
  title: string;
  visibility: Visibility;
}

const postBookmark = async (data: POSTBookmarkRequest) => {
  await client.post('/bookmarks', data);
};

interface POSTBookmarkMutation {
  memberId: number;
  categoryId: number;
  resetAll: {
    resetAllInputs: () => void;
    resetCategory: () => void;
    resetVisibility: () => void;
  };
}

export const usePOSTBookmarkMutation = ({
  memberId,
  categoryId,
  resetAll,
}: POSTBookmarkMutation) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  return useMutation(postBookmark, {
    onSuccess: () => {
      resetAll.resetAllInputs();
      resetAll.resetCategory();
      resetAll.resetVisibility();
      queryClient.refetchQueries(GET_BOOKMARK_LIST(memberId, false, 0));
      queryClient.refetchQueries(
        GET_BOOKMARK_LIST(memberId, false, categoryId),
      );
      queryClient.refetchQueries(GET_BOOKMARK_LIST(memberId, true, categoryId));
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
  memberId: number;
  url: string;
  title: string;
  previewImageUrl: string;
  isUserLike: boolean;
  readByUser: boolean;
  visibility: ClientVisibility;
}

interface GETBookmarkDetailParams {
  bookmarkId: string;
  token?: string;
}

const getBookmarkDetailAPI = async ({
  bookmarkId,
  token,
}: GETBookmarkDetailParams) => {
  const { data } = await client<BookmarkDetail>({
    method: 'get',
    url: `/bookmarks/${bookmarkId}`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return getBookmarkDetailMapper(data);
};

interface ClientBookmarkDetail {
  categoryId: number;
  categoryName: string;
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
    categoryName: '프론트엔드',
    url: data.url,
    title: data.title,
    previewImageUrl: data.previewImageUrl ?? '',
    isUserLike: data.isUserLike,
    readByUser: data.readByUser,
    createdAt: 1689278498,
    visibility: TEMP_VISIBILITY[data.visibility],
  };
};

export interface GetBookmarkDetailRequest {
  bookmarkId: string;
  token?: string;
}

const GET_BOOKMARK_DETAIL = (params: GetBookmarkDetailRequest) => [
  'GET_BOOKMARK_DETAIL',
  params.bookmarkId,
];

export const useGETBookmarkDetailQuery = (params: GetBookmarkDetailRequest) => {
  return useQuery(
    GET_BOOKMARK_DETAIL(params),
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
  bookmark: string;
  category: string;
  isOwnerComment: boolean;
  content: string;
  createdTimestamp: number;
}

interface GETBookmarkCommentRequest {
  memberId: number;
  token?: string;
}

const getBookmarkCommentListAPI = async ({
  memberId,
  token,
}: GETBookmarkCommentRequest) => {
  const { data } = await client<BookmarkCommentItem[]>({
    method: 'get',
    url: `/members/${memberId}/comments`,
    params: { memberId },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
};

export interface GetAPIRequest {
  memberId: number;
  token?: string;
  setCommentCount?: (count: number) => void;
}

export const GET_BOOKMARK_COMMENT = (params: GetAPIRequest) => [
  'GET_BOOKMARK_COMMENT',
  params.memberId,
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
  token?: string;
}
export const usePOSTBookmarkLikeQuery = ({ bookmarkId }: PostAPIRequest) => {
  const queryClient = useQueryClient();
  return useMutation(postBookmarkLikeAPI, {
    onSuccess: () => {
      queryClient.setQueryData<ClientBookmarkDetail>(
        GET_BOOKMARK_DETAIL({ bookmarkId }),
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
  token?: string;
}
export const useDELETEBookmarkLikeQuery = ({
  bookmarkId,
}: DELETEBookmarkLikeQueryRequest) => {
  const queryClient = useQueryClient();
  return useMutation(deleteBookmarkLikeAPI, {
    onSuccess: () => {
      queryClient.setQueryData<ClientBookmarkDetail>(
        GET_BOOKMARK_DETAIL({ bookmarkId }),
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
  return useMutation(deleteBookmarkAPI, {
    onSuccess: () => {
      refetchAllBookmarkQuery({ queryClient, memberId, bookmarkId });
    },
  });
};

interface RefetchAllBookmark {
  queryClient: ReturnType<typeof useQueryClient>;
  memberId: number;
  bookmarkId: string;
}

export const refetchAllBookmarkQuery = ({
  queryClient,
  memberId,
  bookmarkId,
}: RefetchAllBookmark) => {
  const bookmark = queryClient.getQueryData<ClientBookmarkDetail>(
    GET_BOOKMARK_DETAIL({ bookmarkId }),
  );
  const categoryId = bookmark?.categoryId ?? 0;
  // NOTE : 왜 도대체 뒤로 가기 시에는 refetch가 되지 않는지 모르겠음
  queryClient.setQueryData<InfiniteData<SeverBookMarkItem>>(
    GET_BOOKMARK_LIST(memberId, false, 0),
    (prev) => {
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
                  readByUser: true,
                };
              }
              return bookmark;
            }),
          })),
        };
      }
      return prev;
    },
  );
  queryClient.refetchQueries(GET_BOOKMARK_LIST(memberId, true, 0));
  queryClient.refetchQueries(
    GET_BOOKMARK_LIST(memberId, false, categoryId ?? 0),
  );
  queryClient.refetchQueries(
    GET_BOOKMARK_LIST(memberId, true, categoryId ?? 0),
  );
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
  return useMutation(putBookmarkAPI, {
    onSuccess: () => {
      refetchAllBookmarkQuery({ queryClient, memberId, bookmarkId });
      queryClient.refetchQueries(GET_BOOKMARK_DETAIL({ bookmarkId }));
    },
  });
};

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
