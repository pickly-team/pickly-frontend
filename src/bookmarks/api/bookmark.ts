import useToast from '@/common-ui/Toast/hooks/useToast';
import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import qs from 'qs';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const DOMAIN = 'BOOKMARK';

export type Visibility = 'SCOPE_PUBLIC' | 'SCOPE_PRIVATE' | 'SCOPE_FRIEND';

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
interface DELETEBookMarkRequest {
  bookmarkIds: number[];
}

const DELETEBookMark = {
  API: async (params: DELETEBookMarkRequest) => {
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

interface DELETEBookMarkMutation {
  userId: number;
  categoryId?: number;
}

export const useDELETEBookMarkMutation = ({
  userId,
  categoryId,
}: DELETEBookMarkMutation) => {
  const queryClient = useQueryClient();
  return useMutation(DELETEBookMark.API, {
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

interface RequestInterface {
  url: string;
  setTitle?: (title: string) => void;
}

const getAPI = async ({ url }: RequestInterface) => {
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
}: RequestInterface) => {
  const { fireToast } = useToast();
  return useQuery(GET_BOOKMARK_TITLE(url), () => getAPI({ url }), {
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

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
