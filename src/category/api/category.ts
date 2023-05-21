import client from '@/common/service/client';
import { navigatePath } from '@/constants/navigatePath';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
const DOMAIN = 'CATEGORY';

export const GET_CATEGORY_LIST = (memberId: number) => [
  navigatePath.CATEGORY_LIST,
  DOMAIN,
  'CATEGORY_LIST',
  memberId,
];

export const GET_CATEGORY = (memberId: number, categoryId: string) => [
  navigatePath.CATEGORY_EDIT,
  DOMAIN,
  'CATEGORY',
  memberId,
  categoryId,
];

// 단일 카테고리 조회
interface CategoryItem {
  categoryId: number;
  name: string;
  emoji: string;
  orderNum: number;
}

const getCategoryAPI = async (categoryId: string) => {
  const { data } = await client.get<CategoryItem>(`/categories/${categoryId}`);
  return data;
};

interface GETCategoryRequest {
  categoryId: string;
  memberId: number;
  mode: 'ADD' | 'EDIT';
}

export const useGETCategoryAPI = ({
  categoryId,
  memberId,
  mode,
}: GETCategoryRequest) => {
  return useQuery(
    GET_CATEGORY(memberId, categoryId),
    () => getCategoryAPI(categoryId),
    {
      staleTime: 1000,
      cacheTime: 1000 * 60 * 5,
      enabled: mode === 'EDIT',
    },
  );
};

// 카테고리 리스트 조회

interface SeverCategoryList {
  hasNext: boolean;
  contents: ServerCategoryItem[];
}

interface ServerCategoryItem {
  categoryId: string;
  name: string;
  orderNum: number;
  emoji: string;
}

export interface ClientCategoryList {
  hasNext: boolean;
  contents: ClientCategoryItem[];
}

export type ClientCategoryItem = ServerCategoryItem & {
  isChecked: boolean;
};

interface GETCategoryListRequest {
  memberId: number;
  pageRequest: {
    cursorId?: number;
    pageSize: number;
  };
}

const GETCategoryList = {
  API: async (params: GETCategoryListRequest) => {
    const { data } = await client.get<SeverCategoryList>('/categories', {
      params: {
        memberId: params.memberId,
        ...params.pageRequest,
      },
    });
    await sleep(1000);
    return GETCategoryList.Mapper(data);
  },
  Mapper: (categoryList: SeverCategoryList): ClientCategoryList => {
    return {
      hasNext: categoryList.hasNext,
      contents: categoryList.contents
        .map((category) => ({
          categoryId: category.categoryId,
          name: category.name,
          orderNum: category.orderNum,
          emoji: category.emoji,
          isChecked: false,
        }))
        .sort((a, b) => a.orderNum - b.orderNum),
    };
  },
};

interface GETCategoryListRequest {
  memberId: number;
}

export const useGETCategoryListQuery = (params: GETCategoryListRequest) => {
  return useInfiniteQuery(
    GET_CATEGORY_LIST(params.memberId),
    async ({ pageParam = null }) => {
      const { contents, hasNext } = await GETCategoryList.API({
        ...params,
        pageRequest: {
          cursorId: pageParam,
          pageSize: params.pageRequest.pageSize,
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
          return lastPage.contents[lastPage.contents.length - 1].categoryId;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      suspense: true,
    },
  );
};

/** 의도적 지연 함수 : 로딩용 */
// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
