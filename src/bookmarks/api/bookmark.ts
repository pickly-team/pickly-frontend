import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import axios from 'axios';

import { v4 as uuid } from 'uuid';
const BASE_URL = 'http://localhost:8080/api/members';

const DOMAIN = 'BOOKMARK';

export const GET_BOOKMARK_LIST = (userId: number, readByUser: boolean) => [
  getKeyofObject(navigatePath, '/'),
  DOMAIN,
  'BOOKMARK_LIST',
  userId,
  readByUser,
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
  visibility?: 'SCOPE_PUBLIC' | 'SCOPE_PRIVATE';
  pageRequest: {
    cursorId?: number;
    pageSize: number;
  };
}

const GETBookMarkList = {
  API: async (params: GETBookMarkListRequest) => {
    await sleep(1000);
    const { data } = await client.get<SeverBookMarkItem>(
      '/members/1/bookmarks',
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
    GET_BOOKMARK_LIST(params.memberId, params.readByUser ?? false),
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
    const { data } = await axios.put('/v1/bookmarks/list', {
      bookmarkIds: params.bookmarkIds,
    });
    return data;
  },
};

interface DELETEBookMarkMutation {
  userId: number;
}

export const useDELETEBookMarkMutation = ({
  userId,
}: DELETEBookMarkMutation) => {
  const queryClient = useQueryClient();
  return useMutation(DELETEBookMark.API, {
    onSuccess: () => {
      queryClient.refetchQueries(GET_BOOKMARK_LIST(userId, false));
      queryClient.refetchQueries(GET_BOOKMARK_LIST(userId, true));
    },
  });
};

///////////////////////////////////
// 북마크 추가 BS
// 북마크 카테고리 리스트 조회
interface ServerBookmarkCategoryItem {
  orderNum: number;
  categoryId: string;
  name: string;
  emoji: string;
}

export interface ClientBookmarkCategoryItem {
  order: number;
  id: string;
  name: string;
  emoji: string;
  isSelected: boolean;
}

interface GETBookmarkCategoryListRequest {
  memberId: number;
}

const GETBookmarkCategoryList = {
  API: async ({ memberId }: GETBookmarkCategoryListRequest) => {
    const { data } = await axios.get<ServerBookmarkCategoryItem[]>(
      `${BASE_URL}/${memberId}/categories`,
    );
    return GETBookmarkCategoryList.Mapper(data);
  },
  Mapper: (
    categoryList: ServerBookmarkCategoryItem[],
  ): ClientBookmarkCategoryItem[] => {
    return categoryList
      .map((category, idx) => ({
        order: category.orderNum,
        id: category.categoryId,
        emoji: category.emoji,
        name: category.name,
        isSelected: idx === 0,
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

export const useGETCategoryListQuery = ({
  memberId,
}: GETBookMarkListRequest) => {
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

/** 의도적 지연 함수 : 로딩용 */
// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  useGETBookMarkListQuery,
};

// TODO : 추후 테스트 코드 작성
const getKeyofObject = <T extends object>(obj: T, value: unknown) =>
  (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
