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
  order: number;
  id: string;
  name: string;
}

export interface ClientBookmarkCategoryItem {
  order: number;
  id: string;
  name: string;
  isSelected: boolean;
}

interface GETBookmarkCategoryListResponse {
  category_list: ServerBookmarkCategoryItem[];
}

const GETBookmarkCategoryList = {
  API: async () => {
    const { data } = await axios.get<GETBookmarkCategoryListResponse>(
      `${BASE_URL}/bookmarks/category/list`,
    );
    return data;
  },
  Mapper: ({
    category_list,
  }: GETBookmarkCategoryListResponse): ClientBookmarkCategoryItem[] => {
    return category_list.map((category, idx) => ({
      order: category.order,
      id: category.id,
      name: category.name,
      isSelected: idx === 0,
    }));
  },
  MockAPI: async (): Promise<ClientBookmarkCategoryItem[]> => {
    await sleep(1000);
    return GETBookmarkCategoryList.Mapper({
      category_list: [
        {
          order: 1,
          id: uuid(),
          name: '😃 프론트엔드',
        },
        {
          order: 2,
          id: uuid(),
          name: '🧐 백엔드',
        },
        {
          order: 3,
          id: uuid(),
          name: '✅ 라이프 스타일',
        },
        {
          order: 4,
          id: uuid(),
          name: '🥹 퇴근 라이프',
        },
      ],
    });
  },
};

export const GET_BOOKMARK_CATEGORY_LIST = (userId: number) => [
  getKeyofObject(navigatePath, '/'),
  DOMAIN,
  'BOOKMARK_CATEGORY_LIST',
  userId,
];

export const useGETCategoryListQuery = ({
  memberId,
}: GETBookMarkListRequest) => {
  return useQuery(
    GET_BOOKMARK_CATEGORY_LIST(memberId),
    async () => GETBookmarkCategoryList.MockAPI(),
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
